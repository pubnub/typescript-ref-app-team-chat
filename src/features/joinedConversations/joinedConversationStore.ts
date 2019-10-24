import { RootState } from "app/store";
import { createSelector } from "reselect";
import { createMembershipReducer } from "pubnub-redux";

export type MembershipHash = { [id: string]: { id: string }[] };

export interface MemberConversations {
  [userId: string]: string[];
}

const getByUserIdSlice = (state: RootState) => state.joinedConversations;

export const getConversationsByUserId = createSelector(
  [getByUserIdSlice],
  conversations => {
    return conversations.byId;
  }
);

export default createMembershipReducer();
