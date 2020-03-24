import { AppState } from "main/storeTypes";
import { createSelector } from "reselect";
import {
  createMessageReducer,
  Message as PubNubMessageEnvelope
} from "pubnub-redux";

/**
 * Define the types of messages that this application is designed to work with.
 *
 * This application only defines "text" messages, but you can add more here.
 */
export enum MessageType {
  Text = "text"
}

/**
 * BaseMessage defines a structure that ALL messages that the application works should conform to.
 */
export interface BaseMessage {
  /**
   * An indicator of the type of this message, which must appear in the MessageType enum.
   */
  type: MessageType;

  /**
   * The user id of the user that sent this message
   */
  senderId: string;
}

/**
 * Defines a text message with a UTF-8 encoding
 */
export interface TextMessage extends BaseMessage {
  /**
   * type must be "text"
   */
  type: MessageType.Text;

  /**
   * The message content with a UTF-8 unicode encoding
   */
  text: string;
}

/**
 * This is a union of all of the message types that the application works with.
 *
 * To add a new message type, add a new type identifier to the MessageType enum.
 *
 *    MyCustomMessageType = "my-custom-message-type",
 *
 * Then declare a new message type that extends BaseMessage that uses the enum
 *
 *     export interface MyCustomMessage extends BaseMessage {
 *       type: MessageType.MyCustomMessageType;
 *       myField: string;
 *     }
 *
 * Then add that type to this AppMessage union type
 *    export type AppMessage = TextMessage | MyCustomMessage;
 *
 * You will also need to modify the application to work with your new message type.
 * Using your IDE to find references to AppMessage will help find those areas you
 * need to modify.
 */
export type AppMessage = TextMessage;

/**
 * Customize the PubNub message envelope declaration to include our custom message types
 * and define which fields from the envelope this application will have access to.
 *
 * Fields that are not included in this list may appear in the data but will be ignored by
 * the application.  To remove the fields entirely (for example to use less memory),
 *  use a filter on the incoming messages from subscribe.
 */
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
export const getMessagesById = createSelector([getMessagesSlice], messages => {
  return messages.byId;
});
