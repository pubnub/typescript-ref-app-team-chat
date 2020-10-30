import { combineReducers } from "redux";

import { currentConversationStateReducer } from "features/currentConversation/currentConversationModel";
import { LayoutStateReducer } from "features/layout/LayoutReducer";
import { UsersReducer } from "features/users/userModel";
import { AuthenticationStateReducer } from "features/authentication/authenticationModel";
import { MessageStateReducer } from "features/messages/messageModel";
import { TypingIndicatorStateReducer } from "features/typingIndicator/typingIndicatorModel";
import { conversationStateReducer } from "features/conversations/conversationModel";
import { JoinedConversationsStateReducer } from "features/joinedConversations/joinedConversationModel";
import { ConversationDraftStateReducer } from "features/joinedConversations/DraftsModel";
import { ConversationMembersStateReducer } from "features/conversationMembers/conversationMemberModel";
import { ConversationMembersCountStateReducer } from "features/conversationMembers/conversationMemberCountModel";
import { NetworkStatusReducer } from "features/currentUser/networkStatusModel";
import { MemberPresenceReducer } from "features/memberPresence/memberPresenceModel";
import { PaginationStateReducer } from "features/pagination/PaginationReducer";

/**
 * Combine all of the reducers in this application
 */
const rootReducer = combineReducers({
  layout: LayoutStateReducer,
  networkStatus: NetworkStatusReducer,
  users: UsersReducer,
  conversations: conversationStateReducer,
  joinedConversations: JoinedConversationsStateReducer,
  drafts: ConversationDraftStateReducer,
  conversationMembers: ConversationMembersStateReducer,
  conversationMembersCount: ConversationMembersCountStateReducer,
  memberPresence: MemberPresenceReducer,
  messages: MessageStateReducer,
  typingIndicators: TypingIndicatorStateReducer,
  authentication: AuthenticationStateReducer,
  currentConversation: currentConversationStateReducer,
  pagination: PaginationStateReducer
});

export default rootReducer;

/**
 * RootState describes the shape of the global Redux store in this application
 */
export type RootState = Readonly<ReturnType<typeof rootReducer>>;
