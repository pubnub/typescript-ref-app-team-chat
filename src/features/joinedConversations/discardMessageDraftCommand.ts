import { ThunkAction } from "main/storeTypes";
import { MESSAGE_DRAFT_DISCARDED } from "./DraftsModel";

/**
 * Remove a message draft from the store for a specific conversation
 */
export const discardMessageDraft = (conversationId: string): ThunkAction => {
  return dispatch => {
    return dispatch({
      type: MESSAGE_DRAFT_DISCARDED,
      payload: {
        conversationId
      }
    });
  };
};
