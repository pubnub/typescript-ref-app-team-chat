import { fetch } from "xhr";
import { stringify } from "codec/query_string";

interface SightEngineResponse {
  status: string;
  request: {
    id: string;
    timestampt: number;
    operations: number;
  };
  media: {
    id: string;
    url: string;
  };
  nudity: {
    raw: number;
    partial: number;
    safe: number;
  };
  weapon: number;
  alcohol: number;
  drugs: number;
  offensive: {
    prob: number;
  };
}

const max = (numbers: number[]): number => {
  return numbers.reduce((running, current) =>
    current > running ? current : running
  );
};

export const isSafe = async (
  url: string,
  threshold: number
): Promise<boolean> => {
  const secret = process.env.FUNCTIONS_SIGHTENGINE_API_SECRET;
  const user = process.env.FUNCTIONS_SIGHTENGINE_API_USER;
  // don't moderate if keys are not provided
  if (!(secret && user)) {
    return true;
  }
  const options = {
    models: ["nudity", "wad", "offensive"].join(","),
    // eslint-disable-next-line @typescript-eslint/camelcase
    api_user: user,
    // eslint-disable-next-line @typescript-eslint/camelcase
    api_secret: secret,
    url: url,
  };
  try {
    const response = await fetch(
      `https://api.sightengine.com/1.0/check.json?${stringify(options)}`
    );
    if (response.ok) {
      const {
        nudity: { safe: noNudity },
        offensive: { prob: offensive },
        weapon,
        alcohol,
        drugs,
      } = JSON.parse(response.body) as SightEngineResponse;
      return (
        max([1 - noNudity, offensive, weapon, alcohol, drugs]) <= threshold
      );
    } else {
      return false;
    }
  } catch (e) {
    // err on the side of caution
    return false;
  }
};
