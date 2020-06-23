import { fetch } from "xhr";

// retrive data from oembed and map to "oembed:" properties
export const oembed = async (
  url: string
): Promise<{ [property: string]: string }> => {
  const response = await fetch(url);
  if (response.ok) {
    const content = JSON.parse(response.body);
    return {
      "oembed:title": content.title,
      "oembed:description": content.description,
      "oembed:url": content.url,
      "oembed:image":
        (content.type === "photo" && content.url) || content.thumbnail_url,
      "oembed:author": content.author_name,
      "oembed:authorUrl": content.author_url,
      "oembed:site": content.provider_name,
      "oembed:domain": content.provider_url,
    };
  } else {
    // don't contribute anything
    return {};
  }
};
