import { AppState } from "main/storeTypes";
import { createSelector } from "reselect";
import { createPresenceReducer, Presence } from "pubnub-redux";

export interface ConversationPresence {
  [conversationId: string]: {
    name: string;
    occupants: Presence[];
    occupancy: number;
  };
}

/**
 * Create a reducer to precense information for conversation members
 */
const MemberPresenceReducer = createPresenceReducer();
export { MemberPresenceReducer };

const getByPresenceSlice = (state: AppState) => state.memberPresence;

export const getPresenceByConversationId = createSelector(
  [getByPresenceSlice],
  (presence: { byId: ConversationPresence }) => {
    return presence.byId;
  }
);
