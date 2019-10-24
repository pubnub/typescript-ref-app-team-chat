import { focusOnConversationAction } from "features/currentConversation/currentConversationStore";
import { setLayoutAction, setBreakpointAction } from "features/layout/store";
import {
  logingInAction,
  loginSucceededAction
} from "features/authentication/authenticationStore";

export type AppActions =
  | focusOnConversationAction
  | setLayoutAction
  | setBreakpointAction
  | logingInAction
  | loginSucceededAction;
