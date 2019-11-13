import { ThunkAction } from "main/storeTypes";
import { joinSpaces } from "pubnub-redux";
import { focusOnConversation } from "features/currentConversation/currentConversationStore";

export const joinConversation = (
  userId: string,
  conversationId: string
): ThunkAction<Promise<void>> => {
  return (dispatch, getState, context) => {
    return dispatch(
      joinSpaces({
        userId: userId,
        spaces: [{ id: conversationId }]
      })
    ).then(() => {
      context.pubnub.api.subscribe({
        channels: [conversationId],
        withPresence: true
      });
      dispatch(focusOnConversation(conversationId));
    });
  };
};
