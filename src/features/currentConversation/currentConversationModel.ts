import { AppState } from "main/storeTypes";
import { AppActions } from "main/AppActions";
import { createSelector } from "reselect";
import DefaultConversation from "config/defaultConversation.json";

export const FOCUS_ON_CONVERSATION = "FOCUS_ON_CONVERSATION";

export const DEFAULT_CONVERSATION = DefaultConversation.conversationId;

export interface focusOnConversationAction {
  type: typeof FOCUS_ON_CONVERSATION;
  payload: string;
}

export const focusOnConversation = (
  target: string
): focusOnConversationAction => {
  return {
    type: FOCUS_ON_CONVERSATION,
    payload: target
  };
};

export interface CurrentConversationState {
  currentConversationId: string;
}

const initialState: CurrentConversationState = {
  currentConversationId: DEFAULT_CONVERSATION
};

const currentConversationStateReducer = (
  state: CurrentConversationState = initialState,
  action: AppActions
): CurrentConversationState => {
  switch (action.type) {
    case FOCUS_ON_CONVERSATION:
      return { ...state, currentConversationId: action.payload };
    default:
      return state;
  }
};

export { currentConversationStateReducer };

const getCurrentConversationSlice = (state: AppState) =>
  state.currentConversation;

export const getCurrentConversationId = createSelector(
  [getCurrentConversationSlice],
  (currentConversation: CurrentConversationState): string => {
    return currentConversation.currentConversationId;
  }
);
