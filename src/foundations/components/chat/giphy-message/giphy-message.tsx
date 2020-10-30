import React, { FunctionComponent } from "react";
import Styled from "styled-components/macro";
import attribution from "./attribution.png";

type GiphyMessageItemProps = {
  /** URL to link to from the Title */
  url: string;
  /** Title of the displayed Gif */
  title: string;
  /** Author of the Gif upload */
  author?: string;
};

const Wrapper = Styled.div`
  background: ${p => p.theme.backgrounds.message};
  border-radius: ${p => p.theme.radii.strong};
  box-shadow: ${p => p.theme.shadows[1]};
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const ByLine = Styled.div`
  align-items: center;
  display: flex;
  font-size: ${p => p.theme.fontSizes.medium};
  font-weight: ${p => p.theme.fontWeights.light};
  height: ${p => p.theme.sizes[1]};
  justify-content: space-between;
  padding: 0px ${p => p.theme.space[4]};
`;

const Source = Styled.a`
  color: ${p => p.theme.colors.active};
  font-weight: ${p => p.theme.fontWeights.medium};
  text-decoration: none;
`;

const Attribution = Styled.img`
  height: ${p => p.theme.space[4]};
`;

export const GiphyMessage: FunctionComponent<GiphyMessageItemProps> = ({
  url,
  author,
  title,
  children
}) => {
  return (
    <Wrapper>
      {children}
      <ByLine>
        <div>
          <Source href={url} target="_blank" rel="noopener noreferrer">
            {title}
          </Source>
          {author && ` by @${author}`}
        </div>
        <Attribution alt="powered by GIPHY" src={attribution} />
      </ByLine>
    </Wrapper>
  );
};
