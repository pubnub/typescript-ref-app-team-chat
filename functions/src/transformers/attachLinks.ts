import { fetch } from "xhr";
import { Transformer } from "./types";
import {
  BaseMessage,
  TextMessage,
  MessageType,
  LinkAttachment,
  AttachmentType,
  Attachment,
  ImageAttachment,
  VideoAttachment,
} from "sharedTypes/messageModel";
import { unfurl, Preview } from "features/unfurl";
import { isSafe } from "features/moderation/images";

const createLinkAttachment = (preview: Preview): LinkAttachment => {
  return {
    type: AttachmentType.Link,
    url: preview.url,
    title: preview.title,
    description: preview.description,
    provider: {
      name: preview.site,
      url: preview.domain,
    },
    author: preview.author && {
      name: preview.author,
      url: preview.authorUrl || preview.url,
    },
    icon: {
      source: preview.icon,
    },
    image: {
      source: preview.image,
    },
    video: {
      source: preview.video,
    },
  };
};

const createImageAttachment = (source: string): ImageAttachment => ({
  type: AttachmentType.Image,
  image: {
    source,
  },
});

const createVideoAttachment = (source: string): VideoAttachment => ({
  type: AttachmentType.Video,
  video: {
    source,
  },
});

// https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
const extensions = {
  apng: "image/apng",
  bmp: "image/bmp",
  gif: "image/gif",
  ico: "image/x-icon",
  cur: "image/x-icon",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  jfif: "image/jpeg",
  pjpeg: "image/jpeg",
  pjp: "image/jpeg",
  png: "image/png",
  svg: "image/svg",
  tiff: "image/tiff",
  tif: "image/tiff",
  webp: "image/webp",
  avi: "video/x-msvideo",
  mpeg: "video/mpeg",
  mp4: "video/mp4",
  ogv: "video/ogg",
  ts: "video/mp2t",
  webm: "video/webm",
  "3gp": "video/3gpp",
  "3g2": "video/3gpp2",
};

// get a link or media attachment based on the mime type of the response
const getAttachment = async (url: string): Promise<Attachment | null> => {
  let mimeType: string;
  // because images and videos are often too large to load, attempt to guess based on url
  const extension = url.split(".").slice(-1)[0].split("?")[0];
  if (extensions.hasOwnProperty(extension)) {
    mimeType = extensions[extension];
  } else {
    try {
      // fetch the contents of the url
      const response = await fetch(url);
      // unfortunately image/video links will be slower to process because they entire file has to be loaded
      if (response.ok) {
        mimeType = response.headers["content-type"];
        if (mimeType.startsWith("text/html")) {
          const unfurled = await unfurl(response.body, response.url);
          const allow = unfurled.image
            ? await isSafe(unfurled.image, 0.1)
            : true;
          return unfurled && allow ? createLinkAttachment(unfurled) : null;
        }
      } else {
        // failed to fetch
        return null;
      }
    } catch (e) {
      // error fetching
      console.log(e);
      return null;
    }
  }
  if (mimeType.startsWith("image/")) {
    // check if the image passes moderation before attaching
    const allow = await isSafe(url, 0.1);
    return allow ? createImageAttachment(url) : null;
  } else if (mimeType.startsWith("video/")) {
    return createVideoAttachment(url);
  } else {
    // unsupported mime type
    return null;
  }
};

const isTextMessage = (message: BaseMessage): message is TextMessage =>
  message.type === MessageType.Text;

const getUrls = (text: string): string[] => {
  return (
    text.match(
      /https?:\/\/(?:www\.)?[-a-zA-Z0-9]+\.[a-z-]+[-a-zA-Z0-9@:%_+.~#?&//=]*/g
    ) || []
  );
};

const transformer: Transformer<BaseMessage> = async (message) => {
  if (isTextMessage(message)) {
    const urls = getUrls(message.text);
    message.attachments = (await Promise.all(urls.map(getAttachment))).filter(
      (preview) => preview !== null
    );
  }
  return message;
};

export default transformer;
