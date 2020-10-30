import React, { FunctionComponent } from "react";
import Styled from "styled-components/macro";
import {
  Heading,
  Label,
  LabelVariants
} from "foundations/components/presentation";

interface WithNameAndUrl {
  name: string;
  url: string;
}

interface LinkMessageProps {
  /** Name and URL of the link provider */
  provider: WithNameAndUrl;
  /** URL to point to from the title */
  url: string;
  /** Text for the Title line */
  title?: string;
  /** Text for the Description block */
  description?: string;
  /** URL of the thumbnail to show */
  image?: string;
  /** URL of the favicon to show */
  icon?: string;
  /** Name and URL of the link author */
  author?: WithNameAndUrl;
}

const Wrapper = Styled.div`
  display: flex;
  flex-direction: column-reverse;
  background: ${p => p.theme.backgrounds.message};
  border-radius: ${p => p.theme.radii.strong};
  border-top-left-radius: ${p => p.theme.radii.square};
  box-shadow: ${p => p.theme.shadows[0]};
  padding: ${p => `${p.theme.space[5]} ${p.theme.space[6]}`};
  width: fit-content;

  ${p => p.theme.mediaQueries.large} {
    flex-direction: row;
    padding: 0px;
  }
`;

const Media = Styled.div`
  height: 120px;
  margin-top: ${p => p.theme.space[1]};
  width: 210px;

  ${p => p.theme.mediaQueries.large} {
    margin-top: 0px;
  }
`;

const Info = Styled.div`
  display: flex;
  flex-direction: column;
  max-width: 600px;
  padding: 0px;

  ${p => p.theme.mediaQueries.large} {
    padding: ${p => `${p.theme.space[5]} ${p.theme.space[6]}`};
  }
`;

const Image = Styled.img`
  height: 100%;
  object-fit: cover;
  object-position: center center;
  width: 100%;

  ${p => p.theme.mediaQueries.large} {
    border-bottom-left-radius: ${p => p.theme.radii.strong};
  }
`;

const Headline = Styled.div`
  align-items: baseline;
  display: flex;
  margin-bottom: 2px;

  & > * {
    margin-right: ${p => p.theme.space[1]};
  }
`;

const Icon = Styled.img`
  align-self: center;
  max-height: ${p => p.theme.space[4]};
  max-width: ${p => p.theme.space[5]};
`;

const Title = Styled(Label).attrs(p => ({
  variant: LabelVariants.ACTIVE
}))`
  font-weight: ${p => p.theme.fontWeights.medium};
`;

const Description = Styled(Label)`
  margin-top: 2px;
  line-height: 1.5;
`;

export const LinkMessage: FunctionComponent<LinkMessageProps> = ({
  url,
  title,
  image,
  icon,
  description,
  provider,
  author,
  ...rest
}) => {
  const linkAttrs = { target: "_blank", rel: "noopener noreferrer" };
  return (
    <Wrapper>
      {image && (
        <Media>
          <Image alt={`${url} preview`} src={image} />
        </Media>
      )}
      <Info>
        <Headline>
          {icon && <Icon alt="favicon" src={icon} />}
          <a href={provider.url} {...linkAttrs}>
            <Heading>{provider.name}</Heading>
          </a>
          {author && (
            <a href={author.url} {...linkAttrs}>
              <Label variant={LabelVariants.DARK}>{author.name}</Label>
            </a>
          )}
        </Headline>
        <Title>
          <a href={url} {...linkAttrs}>
            {title}
          </a>
        </Title>
        <Description>{description}</Description>
      </Info>
    </Wrapper>
  );
};
