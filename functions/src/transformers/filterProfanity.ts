import { Transformer } from "./types";
import {
  BaseMessage,
  TextMessage,
  MessageType,
} from "sharedTypes/messageModel";
import { censor } from "features/moderation/text";

const isTextMessage = (message: BaseMessage): message is TextMessage =>
  message.type === MessageType.Text;

const transformer: Transformer<BaseMessage> = async (message) => {
  if (isTextMessage(message)) {
    message.text = censor(message.text);
  }
  return message;
};

export default transformer;
