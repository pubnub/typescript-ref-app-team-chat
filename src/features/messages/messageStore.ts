import { RootState } from "main/store";
import { createSelector } from "reselect";
import { createMessageReducer, Message as PubNubMessage } from "pubnub-redux";

export interface MessageContent {
  type: string;
  body: string;
}

export interface MessageBody {
  sender: string;
  content: MessageContent;
}

export type Message = Required<
  Pick<PubNubMessage, "channel" | "message" | "timetoken">
> & {
  message: MessageBody;
};

const getMessagesSlice = (state: RootState) => state.messages;

export const getMessagesById = createSelector(
  [getMessagesSlice],
  messages => {
    return messages.byId;
  }
);

const MessageStateReducer = createMessageReducer<Message>();
export { MessageStateReducer };
