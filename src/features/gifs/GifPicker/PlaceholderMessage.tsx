import React from "react";
import { ImageAllTypes } from "@giphy/js-types";
import { GifDisplay } from "../Gif/Gif";
import { FlexColumn, StyledBox } from "foundations/components/layout";

interface PlaceholderMessageObject {
  text: string;
  image: ImageAllTypes;
}

// pre selected gifs and messages for when there are no results
export const placeholderMessages: {
  [name: string]: PlaceholderMessageObject;
} = {
  notFound: {
    text: "No Gifs Found",
    image: {
      height: 168,
      mp4:
        "https://media3.giphy.com/media/9J7tdYltWyXIY/200w.mp4?cid=d375303d93d6fe4ede336d9eb0a9a8fc2738c9a516275300&rid=200w.mp4",
      mp4_size: "60460",
      size: "237606",
      url:
        "https://media3.giphy.com/media/9J7tdYltWyXIY/200w.gif?cid=d375303d93d6fe4ede336d9eb0a9a8fc2738c9a516275300&rid=200w.gif",
      webp:
        "https://media3.giphy.com/media/9J7tdYltWyXIY/200w.webp?cid=d375303d93d6fe4ede336d9eb0a9a8fc2738c9a516275300&rid=200w.webp",
      webp_size: "109816",
      width: 200
    }
  },
  empty: {
    text: "Search for Gifs",
    image: {
      height: 150,
      mp4:
        "https://media2.giphy.com/media/xGdvlOVSWaDvi/200w.mp4?cid=d375303dfd9714d816164906efde8a2b5d928c7cf3f1cecc&rid=200w.mp4",
      mp4_size: "31905",
      size: "140489",
      url:
        "https://media2.giphy.com/media/xGdvlOVSWaDvi/200w.gif?cid=d375303dfd9714d816164906efde8a2b5d928c7cf3f1cecc&rid=200w.gif",
      webp:
        "https://media2.giphy.com/media/xGdvlOVSWaDvi/200w.webp?cid=d375303dfd9714d816164906efde8a2b5d928c7cf3f1cecc&rid=200w.webp",
      webp_size: "55966",
      width: 200
    }
  }
};

export const PlaceholderMessage = ({
  message: { text, image }
}: {
  message: PlaceholderMessageObject;
}) => {
  return (
    <FlexColumn alignItems="center" justifyContent="center" height="100%">
      <StyledBox
        display="flex"
        borderRadius="light"
        overflow="hidden"
        marginBottom="1"
      >
        <GifDisplay source={image} title={text + " gif"} />
      </StyledBox>
      {text}
    </FlexColumn>
  );
};
