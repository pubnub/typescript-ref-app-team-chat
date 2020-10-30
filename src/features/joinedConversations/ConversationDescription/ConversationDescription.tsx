import React, { useContext } from "react";
import { ThemeContext } from "styled-components";
import { getUniqueColor } from "foundations/utilities";
import {
  Label,
  LabelVariants,
  Button
} from "foundations/components/presentation";
import { Avatar } from "foundations/components/chat";
import { FlexRow, FlexColumn } from "foundations/components/layout";

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
    <Button hoverBg={theme.backgrounds.contentHover}>
      <FlexRow onClick={onClick} px="1" py="6" borderY="medium">
        <Avatar bg={color}>#</Avatar>
        <FlexColumn marginLeft="5" minHeight="1">
          <Label variant={LabelVariants.DARK}>{conversation.name}</Label>
          <Label>{conversation.description}</Label>
        </FlexColumn>
      </FlexRow>
    </Button>
  );
};

export { ConversationDescription };
