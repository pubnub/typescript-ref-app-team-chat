import { AppState } from "main/storeTypes";
import { createSelector } from "reselect";
import { combineReducers } from "redux";
import {
  createSpaceReducer,
  createSpaceListReducer,
  Space
} from "pubnub-redux";

/**
 * Define which fields of PubNub's User object is accessed by this application.
 * Fields not specified in this definition are not used.
 * We use this oportunity to indicate that some fields which are optional in
 * the PubNub object definition are NOT optional in this application.
 */
export type Conversation = Required<Pick<Space, "id" | "name" | "description">>;

/**
 * Describes a way to lookup a conversation from a conversationId
 */
export type ConversationsIndexedById = { [id: string]: Conversation };

/**
 * create a reducer which holds all known conversation objects in a normalized form
 */
const conversationStateReducer = combineReducers({
  conversations: createSpaceReducer<Conversation>(),
  allConversations: createSpaceListReducer<Conversation>()
});
export { conversationStateReducer };

/**
 * Slice selectors are used internally to access the state of the reducer
 */
const getConversationsSlice = (state: AppState) => state.conversations;
const getSpacesSlice = (state: AppState) => state.conversations.conversations;
const getAllSpacesSlice = (state: AppState) =>
  state.conversations.allConversations;

/**
 * Returns an index which can be used to find conversation objects
 */
export const getConversationsById = createSelector(
  [getConversationsSlice],
  (conversations): ConversationsIndexedById => {
    return conversations.conversations.byId;
  }
);

/**
 * Returns an array of all spaces
 */
export const getAllConversations = createSelector(
  [getSpacesSlice, getAllSpacesSlice],
  (spaces, allSpaces) => {
    return allSpaces.spaceIds.map(id => spaces.byId[id]);
  }
);
