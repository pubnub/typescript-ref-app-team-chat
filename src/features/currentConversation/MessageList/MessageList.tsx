import React, { useRef, useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { MessageListItem, MessageFragment } from "../MessageListItem";
import { getCurrentConversationId } from "../currentConversationModel";
import { getUsersById } from "features/users/userModel";
import { getMessagesById } from "features/messages/messageModel";
import { Wrapper } from "./MessageList.style";
import WelcomeMessage from "./WelcomeMessage";
import { UserInitialsAvatar } from "foundations/components/UserInitialsAvatar";

/**
 * Create a selector that that returns the list of messages in the currentConversation joined
 * to the user that sent that message
 *
 * TODO:
 * This implementation will cause the dependant component to re-render if any user data has changed
 * if the current conversation has changed or if any message has changed or if any user has changed.
 * This needs to be reduced in scope
 *
 * TODO: This needs to sort by time token; object keys are not guarenteed to retain order in js.
 */
export const getCurrentConversationMessages = createSelector(
  [getMessagesById, getCurrentConversationId, getUsersById],
  (messages, conversationId, users): MessageFragment[] => {
    return messages[conversationId]
      ? Object.values(messages[conversationId])
          .filter(message => message.channel === conversationId)
          .map(
            (message): MessageFragment => {
              return {
                ...message,
                timetoken: String(message.timetoken),
                sender:
                  users[message.message.senderId] ||
                  (message.message.senderId
                    ? {
                        id: message.message.senderId,
                        name: message.message.senderId
                      }
                    : {
                        id: "unknown",
                        name: "unknown"
                      })
              };
            }
          )
      : [];
  }
);

const MessageList = () => {
  type ConversationScrollPositionsType = { [conversationId: string]: number };
  const conversationId: string = useSelector(getCurrentConversationId);
  const [
    conversationsScrollPositions,
    setConversationsScrollPositions
  ] = useState<ConversationScrollPositionsType>({});

  const updateCurrentConversationScrollPosition = (scrollPosition: number) => {
    setConversationsScrollPositions({
      ...conversationsScrollPositions,
      [conversationId]: scrollPosition
    });
  };

  const handleScroll = (e: any) => {
    const scrollPosition = e.target.scrollTop;
    if (scrollPosition !== 0) {
      updateCurrentConversationScrollPosition(scrollPosition);
    }
  };

  const restoreConversationScrollPosition = (conversationId: string) => {
    const conversationScrollPosition: number =
      conversationsScrollPositions[conversationId];
    if (conversationScrollPosition) {
      wrapper.current.scrollTo(0, conversationScrollPosition);
    }
  };

  const memoizedRestoreConversationScrollPositionCallback = useCallback(
    restoreConversationScrollPosition,
    [conversationId]
  );

  const messages: MessageFragment[] = useSelector(
    getCurrentConversationMessages
  );
  const wrapper = useRef<HTMLDivElement>(document.createElement("div"));
  const el = wrapper.current;

  const scrollToBottom = useCallback(() => {
    return (el.scrollTop = el.scrollHeight - el.clientHeight);
  }, [el]);

  const hasReachedBottom = el.scrollHeight - el.clientHeight === el.scrollTop;

  useEffect(() => {
    if (hasReachedBottom) {
      scrollToBottom();
    }
  }, [messages.length, hasReachedBottom, scrollToBottom]);

  useEffect(() => {
    memoizedRestoreConversationScrollPositionCallback(conversationId);
  }, [memoizedRestoreConversationScrollPositionCallback, conversationId]);

  return (
    <Wrapper ref={wrapper} onScroll={handleScroll}>
      <WelcomeMessage />
      {messages.map(message => (
        <MessageListItem
          messageFragment={message}
          key={message.timetoken}
          avatar={
            <UserInitialsAvatar
              size={36}
              name={message.sender.name}
              userId={message.sender.id}
            />
          }
        />
      ))}
    </Wrapper>
  );
};

export { MessageList };
