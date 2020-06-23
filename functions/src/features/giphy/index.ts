import { fetch } from "xhr";
import { IGif } from "@giphy/js-types";
import { stringify } from "codec/query_string";

export enum Rating {
  G = "G",
  PG = "PG",
  PG13 = "PG-13",
  R = "R",
}

interface TranslateParameters {
  s: string;
  rating: Rating;
  lang: string;
  api_key: string;
}

export const translate = async (
  parameters: TranslateParameters
): Promise<IGif | null> => {
  try {
    const response = await fetch(
      `https://api.giphy.com/v1/gifs/translate?${stringify(parameters)}`
    );
    if (response.ok) {
      const json = JSON.parse(response.body);
      return json.data;
    } else {
      // fail silently
      return null;
    }
  } catch (e) {
    // fail silently
    return null;
  }
};
