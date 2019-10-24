import { RootState } from "app/store";
import { createSelector } from "reselect";
import { createMembersReducer } from 'pubnub-redux';

export type MembershipHash = { [id: string]: { id: string }[] };

export interface ConversationMembers {
  [conversationId: string]: string[];
}

const getByConversationIdSlice = (state: RootState) =>
  state.conversationMembers;

export const getUsersByConversationId = createSelector(
  [getByConversationIdSlice],
  (users: { byId: MembershipHash }) => {
    return users.byId;
  }
);

export default createMembersReducer();
