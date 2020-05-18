import React from "react";
import {
  getTypingIndicatorsById,
  TypingIndicator,
  TypingIndicatorEnvelope,
  TYPING_INDICATOR_DURATION_SECONDS
} from "../typingIndicatorModel";
import { getCurrentConversationId } from "features/currentConversation/currentConversationModel";
import { getUsersById } from "features/users/userModel";
import { getLoggedInUserId } from "features/authentication/authenticationModel";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { Wrapper } from "./TypingIndicatorDisplay.style";

export interface TypingIndicatorFragment {
  sender: {
    id: string;
    name: string;
  };
  timetoken: string;
  message: TypingIndicator;
}

export const getCurrentConversationTypingIndicators = createSelector(
  [
    getTypingIndicatorsById,
    getCurrentConversationId,
    getUsersById,
    getLoggedInUserId
  ],
  (
    typingIndicators,
    conversationId,
    users,
    loggedInUserId
  ): TypingIndicatorFragment[] => {
    return typingIndicators[conversationId]
      ? Object.values(
          Object.values(typingIndicators[conversationId] || [])
            .filter(
              typingIndicator =>
                typingIndicator.channel === conversationId &&
                typingIndicator.publisher !== loggedInUserId
            )
            .reduce(
              (
                grouped: { [key: string]: TypingIndicatorEnvelope },
                typingIndicator
              ) => {
                grouped[typingIndicator.publisher] = typingIndicator;
                return grouped;
              },
              {}
            )
        )
          .filter(
            typingIndicator =>
              Date.now() - typingIndicator.timetoken / 10000 <
              TYPING_INDICATOR_DURATION_SECONDS * 1000
          )
          .map(typingIndicator => {
            return {
              ...typingIndicator,
              timetoken: String(typingIndicator.timetoken),
              sender:
                users[typingIndicator.publisher || ""] ||
                (typingIndicator.publisher
                  ? {
                      id: typingIndicator.publisher,
                      name: typingIndicator.publisher
                    }
                  : {
                      id: "unknown",
                      name: "unknown"
                    })
            };
          })
      : [];
  }
);

/**
 * Display a Message based on its type
 */
export const TypingIndicatorDisplay = () => {
  const typingIndicators: TypingIndicatorFragment[] = useSelector(
    getCurrentConversationTypingIndicators
  );

  if (typingIndicators.length === 0) {
    return <Wrapper>&nbsp;</Wrapper>;
  } else if (typingIndicators.length === 1) {
    return <Wrapper>{typingIndicators[0].sender.name} is typing ...</Wrapper>;
  } else {
    return <Wrapper>Multiple users typing ...</Wrapper>;
  }
};
