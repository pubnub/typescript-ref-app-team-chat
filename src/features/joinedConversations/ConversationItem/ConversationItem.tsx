import React, { useContext } from "react";
import useHover from "foundations/hooks/useHover";
import { DEFAULT_CONVERSATION } from "features/currentConversation/currentConversationModel";
import { ThemeContext } from "styled-components";
import { useMediaQuery } from "foundations/hooks/useMediaQuery";
import {
  LabelVariants,
  Icon,
  Icons,
  Title
} from "foundations/components/presentation";
import { Avatar } from "foundations/components/chat";
import { ListItem } from "foundations/components/layout";
import { getUniqueColor } from "foundations/utilities";

interface ConversationItemProps {
  selected: boolean;
  id: string;
  name: string;
  unreadMessageCount: number;
  onClick: () => void;
  onLeave: () => void;
}

/**
 * Show a single joined conversation
 *
 * Similiar to ConversationDescription but with different style and more functionality
 */
const ConversationItem = ({
  selected,
  id,
  name,
  onClick,
  onLeave,
  unreadMessageCount
}: ConversationItemProps) => {
  const [isHovering, hoverProps] = useHover({ mouseEnterDelayMS: 0 });
  const canLeave: boolean = id !== DEFAULT_CONVERSATION;
  const theme = useContext(ThemeContext);
  const isTouch = useMediaQuery(theme.mediaQueries.touch);
  const color = getUniqueColor(
    name,
    (theme.colors.avatars as unknown) as string[]
  );

  return (
    <ListItem
      onClick={onClick}
      bg={
        selected
          ? theme.backgrounds.primaryActive
          : isHovering
          ? theme.backgrounds.primaryHover
          : "transparent"
      }
      {...hoverProps}
      clickable
    >
      <Avatar bg={color} color={theme.colors.selectedText}>
        #
      </Avatar>
      <Title
        label={name}
        labelProps={{ variant: LabelVariants.INVERSE }}
      ></Title>

      {(isHovering || isTouch) && canLeave && (
        <Icon
          icon={Icons.Leave}
          color="onPrimary"
          title="Leave Conversation"
          onClick={e => {
            e.stopPropagation();
            onLeave();
          }}
        />
      )}
    </ListItem>
  );
};

export { ConversationItem };
