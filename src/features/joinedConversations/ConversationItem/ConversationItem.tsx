import React from "react";
import {
  Wrapper,
  Body,
  ConversationIcon,
  Name,
  MessageCount,
  IconWrapper
} from "./ConversationItem.style";
import { Leave } from "foundations/components/icons/Leave";
import useHover from "foundations/hooks/useHover";
import { DEFAULT_CONVERSATION } from "features/currentConversation/currentConversationStore";

interface ConversationItemProps {
  selected: boolean;
  name: string;
  unreadMessageCount: number;
  onClick: () => void;
  onLeave: () => void;
}

const ConversationItem = ({
  selected,
  name,
  onClick,
  onLeave,
  unreadMessageCount
}: ConversationItemProps) => {
  const [isHovering, hoverProps] = useHover({ mouseEnterDelayMS: 0 });
  const canLeave: boolean = name !== DEFAULT_CONVERSATION;
  return (
    <Wrapper
      {...hoverProps}
      selected={selected}
      emphasized={unreadMessageCount > 0}
      onClick={onClick}
    >
      <Body>
        <ConversationIcon selected={selected}>#</ConversationIcon>
        <Name>{name}</Name>
      </Body>
      {isHovering && canLeave ? (
        <IconWrapper onClick={onLeave}>
          <Leave fill={selected ? "white" : "#979797"} />
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
