import { stringify } from "codec/query_string";
import { oembed } from "./oembed";
import {
  parseHtml,
  getTag,
  getText,
  attributes,
  decodeHtml,
  getTags,
} from "./parser";
import { Tag } from "htmlparser";

/* preview generation is based off the approaches used by
 * - Apple: https://developer.apple.com/library/archive/technotes/tn2444/_index.html#//apple_ref/doc/uid/DTS40017677-CH1-ENABLING_LINK_PREVIEWS
 * - Slack: https://medium.com/slack-developer-blog/everything-you-ever-wanted-to-know-about-unfurling-but-were-afraid-to-ask-or-how-to-make-your-e64b4bb9254
 *
 * When available, oEmbed is used for as much data as possible.
 * The HTML content of oembeds is not used directly to prevent potentially loading slow third party scripts.
 * In some cases, the HTML can be used to produce an embed (e.g. Twitter) when meta tags are known to be poor.
 * If oEmbed is not avilable, meta tags are used giving priority to open graph, then twitter, then plain tags.
 * In some cases (favicon and title) non-meta tags are read to fill in gaps.
 */

export interface Preview {
  // fallbacks generated from url, always exist
  url: string;
  site: string;
  domain: string;
  // generated from page content, may or may not exist
  title?: string;
  image?: string;
  video?: string;
  description?: string;
  author?: string;
  authorUrl?: string;
  icon?: string;
}

// priority of fields
const priority: { result: keyof Preview; fields: string[] }[] = [
  {
    result: "title",
    fields: ["oembed:title", "og:title", "twitter:title", "title"],
  },
  { result: "url", fields: ["oembed:url", "og:url", "canonical", "url"] },
  {
    result: "image",
    fields: [
      "oembed:image",
      "og:image:secure_url",
      "og:image",
      "twitter:image:src",
      "twitter:image",
    ],
  },
  {
    result: "video",
    fields: ["og:video:secure_url", "og:video", "twitter:player"],
  },
  {
    result: "description",
    fields: [
      "oembed:description",
      "og:description",
      "twitter:description",
      "description",
    ],
  },
  { result: "site", fields: ["oembed:site", "og:site_name", "site"] },
  { result: "domain", fields: ["oembed:domain", "domain"] },
  { result: "author", fields: ["oembed:author", "author"] },
  { result: "authorUrl", fields: ["oembed:authorUrl", "article:author"] },
  { result: "icon", fields: ["icon", "itemprop:image"] },
];

// known oembed providers
// necessary if a site doesn't include meta tags without js but supports oembed
const oembedProviders = [
  {
    match: /https:\/\/(?:.+\.)?twitter.com\/.*\/status\/.*/,
    url: (url: string): string =>
      `https://publish.twitter.com/oembed?${stringify({
        url,
        // eslint-disable-next-line @typescript-eslint/camelcase
        omit_script: 1,
      })}`,
  },
];

// get the oembed url for the matching provider
const getProvider = (url: string): string => {
  return oembedProviders
    .filter((provider) => url.match(provider.match))[0]
    ?.url(url);
};

// choose meta properties to use based on priorty and perform final formatting
const resolveFields = (meta: { [field: string]: string }): Preview => {
  return priority.reduce((final, { fields, result }) => {
    let value = fields.reduce(
      // decode html entities in meta values
      (value, field) => value || (meta[field] && decodeHtml(meta[field])),
      undefined
    );
    // resolve relative paths
    if (value && (result === "image" || result === "icon")) {
      if (value.startsWith("//")) {
        value = "https:" + value;
      } else if (value.startsWith("/")) {
        value = meta.domain + value;
      } else if (
        !(value.startsWith("http://") || value.startsWith("https://"))
      ) {
        value = meta.url + value;
      }
    }
    final[result] = value;
    return final;
  }, {} as Preview);
};

// get meta from meta tags and other important tags
const getMeta = (root: Tag): { [field: string]: string } => {
  // turn the meta tags into a single object
  const meta = getTags(root, "meta")
    .map(attributes)
    .reduce((complete, tag) => {
      complete[tag.name || tag.property || `itemprop:${tag.itemprop}`] =
        tag.content;
      return complete;
    }, {});

  // title can only be found in the title tag
  meta.title = getText(getTag(root, "title"));

  // link tags are used for favicon, oembed, and canonical url
  const links = getTags(root, "link").map(attributes);
  // favicon is used as the site icon
  meta.icon = links.filter(
    (attributes) =>
      attributes.rel === "shortcut icon" || attributes.rel === "icon"
  )[0]?.href;
  // a canonical url is prefered to the url when available
  meta.canonical = links.filter(
    (attributes) => attributes.rel === "canonical"
  )[0]?.href;
  // automatic oembed discovery
  meta.oembedUrl = links.filter(
    (attributes) =>
      attributes.rel === "alternate" &&
      attributes.type === "application/json+oembed"
  )[0]?.href;

  return meta;
};

// generate a preview from the HTML contents of a page
export const unfurl = async (
  document: string,
  url: string
): Promise<Preview | null> => {
  try {
    // parse the url for basic information
    const [domain, site] = url.match(
      /https?:\/\/(?:www\.)?([-a-zA-Z0-9.]{3,253})/
    );
    const urlData = {
      domain,
      site,
      url,
    };

    const ast = await parseHtml(document);
    // get the head element of the page, fallback to html tag if head does not exist
    const html = getTag(ast, "html");
    const head = getTag(html, "head") || html;
    // get data from the parsed document
    const meta = getMeta(head);

    // oembed discovery with known providers as a fallback
    const oembedUrl = meta.oembedUrl || getProvider(url);
    // if the site specifies the oembed, it will be used as it is the highest priority information source
    const oembedData = oembedUrl ? oembed(oembedUrl) : {};

    // join data and resolve fields based on priorty
    const unfurled = resolveFields({ ...urlData, ...meta, ...oembedData });
    return unfurled;
  } catch (e) {
    // if there's an error parsing fail gracefully
    console.log(e);
    return null;
  }
};
