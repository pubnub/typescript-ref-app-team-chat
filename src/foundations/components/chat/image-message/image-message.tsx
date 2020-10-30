import React, { FunctionComponent } from "react";
import Styled from "styled-components/macro";

interface ImageMessageProps {
  /** Specify URL of the image to display */
  image: string;
}

const Image = Styled.img`
  border-radius: ${p => p.theme.radii.strong};
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center center;
`;

export const ImageMessage: FunctionComponent<ImageMessageProps> = ({
  image,
  ...rest
}) => {
  return <Image alt={`media from ${image}`} src={image} {...rest} />;
};
