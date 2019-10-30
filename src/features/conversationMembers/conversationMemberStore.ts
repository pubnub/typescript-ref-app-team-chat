import { RootState } from "main/store";
import { createSelector } from "reselect";
import { createMembersReducer } from "pubnub-redux";

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

const ConversationMembersStateReducer = createMembersReducer();

export { ConversationMembersStateReducer };
