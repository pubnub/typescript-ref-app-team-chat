import React, { useContext } from "react";
import {
  Wrapper,
  Body,
  ConversationIcon,
  Name,
  MessageCount,
  IconWrapper
} from "./ConversationItem.style";
import { LeaveIcon } from "foundations/components/icons/LeaveIcon";
import useHover from "foundations/hooks/useHover";
import { DEFAULT_CONVERSATION } from "features/currentConversation/currentConversationModel";
import { ThemeContext } from "styled-components";
import getUniqueColor from "foundations/utilities/getUniqueColor";
import { useMediaQuery } from "foundations/hooks/useMediaQuery";

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
    <Wrapper
      {...hoverProps}
      selected={selected}
      emphasized={unreadMessageCount > 0}
      onClick={onClick}
    >
      <Body>
        <ConversationIcon color={color}>#</ConversationIcon>
        <Name>{name}</Name>
      </Body>
      {(isHovering || isTouch) && canLeave ? (
        <IconWrapper
          onClick={e => {
            e.stopPropagation();
            onLeave();
          }}
        >
          <LeaveIcon title="Leave Conversation" selected={selected} />
        </IconWrapper>
      ) : (
        unreadMessageCount > 0 && (
          <MessageCount>{unreadMessageCount}</MessageCount>
        )
      )}
    </Wrapper>
  );
};

export { ConversationItem };
