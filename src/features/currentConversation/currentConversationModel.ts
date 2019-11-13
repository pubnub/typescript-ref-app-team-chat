import { AppState } from "main/storeTypes";
import { AppActions } from "main/AppActions";
import { createSelector } from "reselect";

export const DEFAULT_CONVERSATION = "space_ac4e67b98b34b44c4a39466e93e";

export const FOCUS_ON_CONVERSATION = "FOCUS_ON_CONVERSATION";
export const UPDATE_CONVERSATION_MESSAGE_INPUT_VALUE =
  "UPDATE_CONVERSATION_MESSAGE_INPUT_VALUE";

export interface focusOnConversationAction {
  type: typeof FOCUS_ON_CONVERSATION;
  payload: string;
}

export interface updateConversationMessageInputValueAction {
  type: typeof UPDATE_CONVERSATION_MESSAGE_INPUT_VALUE;
  payload: {
    conversationId: string;
    value: string;
  };
}

export const focusOnConversation = (
  target: string
): focusOnConversationAction => {
  return {
    type: FOCUS_ON_CONVERSATION,
    payload: target
  };
};

export const updateConversationMessageInputValueAction = (
  conversationId: string,
  value: string
): updateConversationMessageInputValueAction => {
  return {
    type: UPDATE_CONVERSATION_MESSAGE_INPUT_VALUE,
    payload: {
      conversationId,
      value
    }
  };
};

export interface CurrentConversationState {
  currentConversationId: string;
  conversationsMessageInputValuesById: { [conversationId: string]: string };
}

const initialState: CurrentConversationState = {
  currentConversationId: DEFAULT_CONVERSATION,
  conversationsMessageInputValuesById: {}
};

const currentConversationStateReducer = (
  state: CurrentConversationState = initialState,
  action: AppActions
): CurrentConversationState => {
  switch (action.type) {
    case FOCUS_ON_CONVERSATION:
      return { ...state, currentConversationId: action.payload };
    case UPDATE_CONVERSATION_MESSAGE_INPUT_VALUE: {
      const newConversationsMessageInputValuesById = {
        ...state.conversationsMessageInputValuesById,
        [action.payload.conversationId]: action.payload.value
      };
      return {
        ...state,
        conversationsMessageInputValuesById: newConversationsMessageInputValuesById
      };
    }
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

export const getConversationMessageInputValue = createSelector(
  [getCurrentConversationSlice],
  (currentConversation: CurrentConversationState): string => {
    return (
      currentConversation.conversationsMessageInputValuesById[
        currentConversation.currentConversationId
      ] || ""
    );
  }
);
