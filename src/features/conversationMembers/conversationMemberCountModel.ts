import { AppState } from "main/storeTypes";
import { createSelector } from "reselect";
import { createChannelMembersCountReducer } from "pubnub-redux";

export interface ConversationMembersCount {
  [conversationId: string]: number;
}

const getMembersCountByConversationIdSlice = (state: AppState) =>
  state.conversationMembersCount;

export const getMembersCountByConversationId = createSelector(
  [getMembersCountByConversationIdSlice],
  (users: { byId: ConversationMembersCount }) => {
    return users.byId;
  }
);

const ConversationMembersCountStateReducer = createChannelMembersCountReducer();

export { ConversationMembersCountStateReducer };
