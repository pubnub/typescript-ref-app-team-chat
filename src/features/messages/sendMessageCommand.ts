import { ThunkAction } from "main/storeTypes";
import { getCurrentConversationId } from "features/currentConversation/currentConversationStore";
import { MessageContent } from "./messageStore";
import { sendMessage } from "pubnub-redux";
import { getLoggedInUserId } from "features/authentication/authenticationStore";

export const sendMessageAction = (message: MessageContent): ThunkAction => {
  return (dispatch, getState) => {
    const state = getState();
    return dispatch(
      sendMessage({
        channel: getCurrentConversationId(state),
        message: {
          content: message,
          sender: getLoggedInUserId(state)
        }
      })
    );
  };
};
