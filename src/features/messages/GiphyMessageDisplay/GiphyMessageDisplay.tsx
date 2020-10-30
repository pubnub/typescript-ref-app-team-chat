import React from "react";
import { GiphyMessage } from "foundations/components/chat";
import { GiphyMessage as GiphyMessageModel } from "../messageModel";
import { Gif, GifSize } from "features/gifs/Gif";
import { StyledBox } from "foundations/components/layout";

type GiphyMessageProps = {
  message: GiphyMessageModel;
};

/**
 * Display a GiphyMessage such as it would appear in a list of messages
 */
export const GiphyMessageDisplay = ({ message }: GiphyMessageProps) => {
  const gif = message.gif;
  const title = message.query;
  return (
    <StyledBox maxWidth={`${gif.images.original.width}px`}>
      <GiphyMessage title={title} url={gif.url} author={gif.user?.username}>
        <Gif gif={gif} size={GifSize.Full} />
      </GiphyMessage>
    </StyledBox>
  );
};
