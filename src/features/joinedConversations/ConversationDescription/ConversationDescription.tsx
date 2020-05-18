import React, { useContext } from "react";
import {
  Wrapper,
  Body,
  ConversationIcon,
  Name,
  Description,
  Content
} from "./ConversationDescription.style";
import { ThemeContext } from "styled-components";
import getUniqueColor from "foundations/utilities/getUniqueColor";

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
  const theme = useContext(ThemeContext);
  const color = getUniqueColor(
    conversation.name,
    (theme.colors.avatars as unknown) as string[]
  );
  return (
    <Wrapper onClick={onClick}>
      <Body>
        <ConversationIcon color={color}>#</ConversationIcon>
        <Content>
          <Name>{conversation.name}</Name>
          <Description>{conversation.description}</Description>
        </Content>
      </Body>
    </Wrapper>
  );
};

export { ConversationDescription };
