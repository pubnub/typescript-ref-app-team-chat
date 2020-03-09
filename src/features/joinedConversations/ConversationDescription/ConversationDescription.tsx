import React from "react";
import {
  Wrapper,
  Body,
  ConversationIcon,
  Name,
  Description,
  Content
} from "./ConversationDescription.style";

/**
 * This describes the data that this component needs to display a
 * description of a conversation
 */
export interface ConversationDescriptionFragment {
  id: string;
  name: string;
  description: string;
}

/**
 * Define the properties required to produce a conversation description
 */
interface ConversationDescriptionProps {
  conversation: ConversationDescriptionFragment;
  onClick: () => void;
}

/**
 * Display a short desscription of a conversation as it would appear in
 * a list of conversations.  Notify the parent component if a click is
 * detected on the description.
 *
 * Similiar to ConversationItem but with different style and less functionality
 */
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
