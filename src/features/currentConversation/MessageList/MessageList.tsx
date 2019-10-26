import React, { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { Message, MessageFragment } from "../Message";
import { getCurrentConversationId } from "../currentConversationStore";
import { getUsersById } from "features/users/userStore";
import { getMessagesById } from "features/messages/messageStore";

import { Wrapper } from "./MessageList.style";

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
    if (!messages) {
      throw new Error(`rats!`);
    }
    if (!conversationId) {
      throw new Error(`rats!`);
    }
    if (!users) {
      throw new Error(`rats!`);
    }

    return messages[conversationId]
      ? Object.values(messages[conversationId])
          .filter(message => message.channel === conversationId)
          .map(message => {
            return {
              ...message,
              sender: users[message.message.sender]
            };
          })
      : [];
  }
);

const MessageList: React.FC = props => {
  const messages: MessageFragment[] = useSelector(
    getCurrentConversationMessages
  );
  const bottom = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottom.current &&
      typeof bottom.current.scrollIntoView === "function" &&
      bottom.current.scrollIntoView();
  }, [messages.length]);

  return (
    <Wrapper>
      {messages.map(message => (
        <Message message={message} key={message.timetoken} />
      ))}
      <span ref={bottom} />
    </Wrapper>
  );
};

export { MessageList };
