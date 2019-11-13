import { combineReducers } from "redux";

import { currentConversationStateReducer } from "features/currentConversation/currentConversationModel";
import { LayoutStateReducer } from "features/layout/layoutModel";
import { UsersReducer } from "features/users/userModel";
import { AuthenticationStateReducer } from "features/authentication/authenticationModel";
import { MessageStateReducer } from "features/messages/messageModel";
import { conversationStateReducer } from "features/conversations/conversationModel";
import { JoinedConversationsStateReducer } from "features/joinedConversations/joinedConversationModel";
import { ConversationMembersStateReducer } from "features/conversationMembers/conversationMemberModel";
import { NetworkStatusReducer } from "features/currentUser/networkStatusModel";
import { MemberPresenceReducer } from "features/memberPresence/memberPresenceModel";

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
