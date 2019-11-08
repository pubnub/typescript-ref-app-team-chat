import { ThunkAction } from "main/storeTypes";
import { getCurrentConversationId } from "features/currentConversation/currentConversationStore";
import { MessageContent } from "./messageStore";
import { sendMessage } from "pubnub-redux";
import { getLoggedInUserId } from "features/authentication/authenticationStore";

// the promise should be a PubNub response to the publish
export const sendMessageAction = (message: MessageContent): ThunkAction => {
  return (dispatch, getState) => {
    return new Promise(() => {
      const state = getState();
      dispatch(
        sendMessage({
          channel: getCurrentConversationId(state),
          message: {
            content: message,
            sender: getLoggedInUserId(state)
          }
        })
      );
    });
  };
};
