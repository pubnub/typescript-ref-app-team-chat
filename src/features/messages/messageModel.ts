import { AppState } from "main/storeTypes";
import { createSelector } from "reselect";
import {
  createMessageReducer,
  Message as PubNubMessageEnvelope,
} from "pubnub-redux";
import { AppMessage } from "sharedTypes/messageModel";
export { MessageType } from "sharedTypes/messageModel";
export type {
  AppMessage,
  TextMessage,
  GiphyMessage,
} from "sharedTypes/messageModel";

export type MessageEnvelope = Required<
  Pick<PubNubMessageEnvelope, "channel" | "message" | "timetoken">
> & {
  message: AppMessage;
};

/**
 * create a reducer which holds all known messsage envelope objects in a normalized form
 */
export const MessageStateReducer = createMessageReducer<MessageEnvelope>();

/**
 * THis Slice selector is used internally to access the state of the reducer,
 * primarily as the base selector function for creating other selectors.
 */
const getMessagesSlice = (state: AppState) => state.messages;

/**
 * Returns an index which can be used to find user objects
 */
export const getMessagesById = createSelector(
  [getMessagesSlice],
  (messages) => {
    return messages.byId;
  }
);
