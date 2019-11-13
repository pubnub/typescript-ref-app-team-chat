import { combineReducers } from "redux";

import { currentConversationStateReducer } from "features/currentConversation/currentConversationStore";
import { LayoutStateReducer } from "features/layout/store";
import { UsersReducer } from "features/users/userStore";
import { AuthenticationStateReducer } from "features/authentication/authenticationStore";
import { MessageStateReducer } from "features/messages/messageStore";
import { conversationStateReducer } from "features/conversations/conversationStore";
import { JoinedConversationsStateReducer } from "features/joinedConversations/joinedConversationStore";
import { ConversationMembersStateReducer } from "features/conversationMembers/conversationMemberStore";
import { NetworkStatusReducer } from "features/currentUser/networkStatusStore";
import { MemberPresenceReducer } from "features/memberPresence/memberPresenceStore";

/**
 * Combine all of the reducers in this application
 */
const rootReducer = combineReducers({
  layout: LayoutStateReducer,
  networkStatus: NetworkStatusReducer,
  users: UsersReducer,
  conversations: conversationStateReducer,
  joinedConversations: JoinedConversationsStateReducer,
  conversationMembers: ConversationMembersStateReducer,
  memberPresence: MemberPresenceReducer,
  messages: MessageStateReducer,
  authentication: AuthenticationStateReducer,
  currentConversation: currentConversationStateReducer
});

export default rootReducer;

/**
 * RootState describes the shape of the global Redux store in this application
 */
export type RootState = Readonly<ReturnType<typeof rootReducer>>;
