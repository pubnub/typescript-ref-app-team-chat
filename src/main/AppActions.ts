import {
  focusOnConversationAction,
  updateConversationMessageInputValueAction
} from "features/currentConversation/currentConversationStore";
import { setLayoutAction, setBreakpointAction } from "features/layout/store";
import {
  logingInAction,
  loginSucceededAction
} from "features/authentication/authenticationStore";

/**
 * AppActions is the union of all basic actions in this application.
 *
 * It is used to decribe the actions that can be received by a reducer
 * and is helpful for type inference of action payload types when writing
 * switch style reducers.
 *
 * Thunks and other dispatchable objects that will not end up being received by
 * reducers directly should not be added to this union.
 */
export type AppActions =
  | focusOnConversationAction
  | setLayoutAction
  | setBreakpointAction
  | logingInAction
  | loginSucceededAction
  | updateConversationMessageInputValueAction;
