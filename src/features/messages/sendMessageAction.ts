import { ActionThunk } from "app/store";
import { getCurrentConversationId } from "features/currentConversation/currentConversationStore";
import { MessageContent } from "./messageStore";
import { sendMessage } from "pubnub-redux";
import Pubnub from "pubnub";
import { getLoggedInUserId } from "features/authentication/authenticationStore";

// the promise should be a PubNub response to the publish
export const sendMessageAction = (
  pubnub: Pubnub,
  message: MessageContent
): ActionThunk => {
  return (dispatch, getState) => {
    return new Promise(() => {
      const state = getState();
      dispatch(
        sendMessage(pubnub, {
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
