import React from "react";
import {
  Wrapper,
  Body,
  ConversationIcon,
  Name,
  Description,
  Content
} from "./ConversationDescription.style";

export interface ConversationDescriptionFragment {
  name: string;
  description: string;
}

interface ConversationDescriptionProps {
  conversation: ConversationDescriptionFragment;
  onClick: () => void;
}

const ConversationDescription = ({
  conversation,
  onClick
}: ConversationDescriptionProps) => {
  return (
    <Wrapper onClick={onClick}>
      <Body>
        <ConversationIcon>#</ConversationIcon>
        <Content>
          <Name>{conversation.name}</Name>
          <Description>{conversation.description}</Description>
        </Content>
      </Body>
    </Wrapper>
  );
};

export { ConversationDescription };
