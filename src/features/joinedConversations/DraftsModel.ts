import { AppState } from "main/storeTypes";
import { AppActions } from "main/AppActions";
import { createSelector } from "reselect";
import { DraftMessage } from "features/messages/draft";

export const MESSAGE_DRAFT_UPDATED = "MESSAGE_DRAFT_UPDATED";
export const MESSAGE_DRAFT_DISCARDED = "MESSAGE_DRAFT_DISCARDED";

export interface MessageDraftUpdatedAction {
  type: typeof MESSAGE_DRAFT_UPDATED;
  payload: {
    conversationId: string;
    value: DraftMessage;
  };
}

export interface MessageDraftDiscardedAction {
  type: typeof MESSAGE_DRAFT_DISCARDED;
  payload: {
    conversationId: string;
  };
}

/**
 * Describes a way to lookup a user from a userId
 */
export type DraftsIndex = { [id: string]: DraftMessage };

export interface ConversationDraftState {
  messageDraftById: DraftsIndex;
}

const initialState: ConversationDraftState = {
  messageDraftById: {}
};

export const ConversationDraftStateReducer = (
  state: ConversationDraftState = initialState,
  action: AppActions
): ConversationDraftState => {
  switch (action.type) {
    case MESSAGE_DRAFT_UPDATED: {
      const messageDraftById = {
        ...state.messageDraftById,
        [action.payload.conversationId]: action.payload.value
      };
      return {
        ...state,
        messageDraftById
      };
    }
    case MESSAGE_DRAFT_DISCARDED: {
      const {
        [action.payload.conversationId]: discard,
        ...messageDraftById
      } = state.messageDraftById;
      return {
        ...state,
        messageDraftById
      };
    }
  }
  return state;
};

const getDraftSlice = (state: AppState) => state.drafts;

/**
 * Returns an index which can be used to find user objects
 */
export const getMessageDrafts = createSelector(
  [getDraftSlice],
  (drafts): DraftsIndex => {
    return drafts.messageDraftById;
  }
);
