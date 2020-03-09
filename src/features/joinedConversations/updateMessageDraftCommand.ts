import { ThunkAction } from "main/storeTypes";
import { MESSAGE_DRAFT_UPDATED } from "./DraftsModel";
import { DraftMessage } from "features/messages/draft";

/**
 * Indicate that a draft message has been updated
 */
export const updateMessageDraft = (
  conversationId: string,
  newDraft: DraftMessage
): ThunkAction => {
  return dispatch => {
    return dispatch({
      type: MESSAGE_DRAFT_UPDATED,
      payload: {
        conversationId,
        value: newDraft
      }
    });
  };
};
