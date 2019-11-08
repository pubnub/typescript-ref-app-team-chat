import { ThunkAction } from "main/storeTypes";
import { joinSpaces } from "pubnub-redux";
import { focusOnConversation } from "features/currentConversation/currentConversationStore";

export const joinConversation = (
  userId: string,
  conversationId: string
): ThunkAction<Promise<void>> => {
  return (dispatch, getState, context) => {
    const done = dispatch(
      joinSpaces({
        userId: userId,
        spaces: [{ id: conversationId }]
      })
    ).then(() => {
      context.pubnub.api.subscribe({
        channels: [conversationId]
      });
      dispatch(focusOnConversation(conversationId));
    });

    return done;
  };
};
