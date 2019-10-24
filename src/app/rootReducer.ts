import { combineReducers } from "redux";

import currentConversationStateReducer from "features/currentConversation/currentConversationStore";
import LayoutStateReducer from "features/layout/store";
import UsersReducer from "features/users/userStore";
import AuthenticationStateReducer from "features/authentication/authenticationStore";
import MessageStateReducer from "features/messages/messageStore";
import conversationStateReducer from "features/conversations/conversationStore";
import { createNetworkStatusReducer } from "pubnub-redux";
import JoinedConversationsStateReducer from "features/joinedConversations/joinedConversationStore";
import ConversationMembersStateReducer from "features/conversationMembers/conversationMemberStore";

const rootReducer = combineReducers({
  layout: LayoutStateReducer,
  networkStatus: createNetworkStatusReducer(false), // TODO: move elsewhere
  users: UsersReducer,
  conversations: conversationStateReducer,
  joinedConversations: JoinedConversationsStateReducer,
  conversationMembers: ConversationMembersStateReducer,
  messages: MessageStateReducer,
  authentication: AuthenticationStateReducer,
  currentConversation: currentConversationStateReducer
});

export default rootReducer;
