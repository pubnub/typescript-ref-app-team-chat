import React from "react";
import {
  Wrapper,
  SiteIcon,
  Title,
  Description,
  Provider,
  Media,
  Preview,
  About,
  Author,
  Source,
} from "./LinkAttachmentDisplay.style";
import { LinkAttachment } from "sharedTypes/messageModel";

type LinkAttachmentProps = {
  attachment: LinkAttachment;
};

/**
 * Display a LinkAttachment such as it would appear in a list of attachments
 */
export const LinkAttachmentDisplay = ({ attachment }: LinkAttachmentProps) => {
  return (
    <Wrapper>
      {attachment.image?.source && (
        <Media>
          <Preview
            alt={`${attachment.url} preview`}
            src={attachment.image.source}
          />
        </Media>
      )}
      <About>
        <Source>
          {attachment.icon && <SiteIcon src={attachment.icon.source} />}
          <Provider
            href={attachment.provider.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {attachment.provider.name}
          </Provider>
          {attachment.author && (
            <Author
              href={attachment.author.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {attachment.author.name}
            </Author>
          )}
        </Source>
        <Title href={attachment.url} target="_blank" rel="noopener noreferrer">
          {attachment.title}
        </Title>
        <Description>{attachment.description}</Description>
      </About>
    </Wrapper>
  );
};
