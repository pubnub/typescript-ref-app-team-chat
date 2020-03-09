import { focusOnConversationAction } from "features/currentConversation/currentConversationModel";
import {
  MessageDraftUpdatedAction,
  MessageDraftDiscardedAction
} from "features/joinedConversations/DraftsModel";
import {
  logingInAction,
  loginSucceededAction
} from "features/authentication/authenticationModel";
import {
  menuViewDisplayedAction,
  currentConversationViewDisplayedAction,
  conversationMembersViewDisplayedAction,
  joinConversationViewDisplayedAction,
  menuViewHiddenAction,
  currentConversationViewHiddenAction,
  conversationMembersViewHiddenAction,
  joinConversationViewHiddenAction
} from "features/layout/LayoutActions";

/**
 * AppActions is the union of all basic actions in this application.
 *
 * It is used to describe the actions that can be received by a reducer
 * and is helpful for type inference of action payload types when writing
 * switch style reducers.
 *
 * Thunks and other dispatchable objects that will not end up being received by
 * reducers directly should not be added to this union.
 */
export type AppActions =
  | focusOnConversationAction
  | logingInAction
  | loginSucceededAction
  | MessageDraftUpdatedAction
  | MessageDraftDiscardedAction
  | menuViewDisplayedAction
  | currentConversationViewDisplayedAction
  | conversationMembersViewDisplayedAction
  | joinConversationViewDisplayedAction
  | menuViewHiddenAction
  | currentConversationViewHiddenAction
  | conversationMembersViewHiddenAction
  | joinConversationViewHiddenAction;
