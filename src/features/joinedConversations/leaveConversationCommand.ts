import { ThunkAction } from "main/storeTypes";
import { leaveSpaces } from "pubnub-redux";
import {
  focusOnConversation,
  DEFAULT_CONVERSATION
} from "features/currentConversation/currentConversationModel";

/**
 * Leave the current conversation and select the default conversation
 * as the current conversation.  (The application expects that some
 * conversation will always be current.)
 */
export const leaveConversation = (
  userId: string,
  conversationId: string
): ThunkAction<Promise<void>> => {
  return (dispatch, getState, context) => {
    if (conversationId === DEFAULT_CONVERSATION) {
      return Promise.resolve();
    }
    return dispatch(
      leaveSpaces({
        userId: userId,
        spaces: [{ id: conversationId }]
      })
    ).then(() => {
      context.pubnub.api.unsubscribe({
        channels: [conversationId]
      });
      dispatch(focusOnConversation(DEFAULT_CONVERSATION));
    });
  };
};
