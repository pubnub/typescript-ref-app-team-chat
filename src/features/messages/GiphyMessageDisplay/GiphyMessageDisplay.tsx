import React from "react";
import {
  Wrapper,
  ByLine,
  Source,
  Attribution,
} from "./GiphyMessageDisplay.style";
import { Gif, GifSize } from "features/gifs/Gif";
import { GiphyMessage } from "../messageModel";
import attribution from "./attribution.png";

type GiphyMessageProps = {
  message: GiphyMessage;
};

/**
 * Display a GiphyMessage such as it would appear in a list of messages
 */
export const GiphyMessageDisplay = ({ message }: GiphyMessageProps) => {
  const gif = message.gif;
  return (
    <Wrapper>
      <Gif gif={gif} size={GifSize.Full} />
      <ByLine>
        <div>
          <Source href={gif.url} target="_blank" rel="noopener noreferrer">
            {message.query}
          </Source>
          {gif.user && ` by @${gif.user.username}`}
        </div>
        <Attribution alt="powered by GIPHY" src={attribution} />
      </ByLine>
    </Wrapper>
  );
};
