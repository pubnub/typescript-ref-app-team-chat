import { RootState } from "app/store";
import { AppActions } from "app/AppActions";
import { createSelector } from "reselect";

export const DEFAULT_CONVERSATION = "introductions";

export const FOCUS_ON_CONVERSATION = "FOCUS_ON_CONVERSATION";

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
  }
  return state;
};

export default currentConversationStateReducer;

const getCurrentConversationSlice = (state: RootState) =>
  state.currentConversation;

export const getCurrentConversationId = createSelector(
  [getCurrentConversationSlice],
  (currentConversation: CurrentConversationState): string => {
    return currentConversation.currentConversationId;
  }
);
