import { Transformer } from "./types";
import {
  BaseMessage,
  TextMessage,
  MessageType,
  GiphyMessage,
} from "sharedTypes/messageModel";
import { translate, Rating } from "features/giphy";
import { IGif } from "@giphy/js-types";

const isTextMessage = (message: BaseMessage): message is TextMessage =>
  message.type === MessageType.Text;

const createGifMessage = (
  gif: IGif,
  query: string,
  senderId: string
): GiphyMessage => {
  return {
    query,
    senderId,
    type: MessageType.Giphy,
    gif,
  };
};

const transformer: Transformer<BaseMessage> = async (message) => {
  const apiKey = process.env.FUNCTIONS_GIPHY_API_KEY;
  if (!apiKey) {
    return message;
  }
  if (isTextMessage(message) && message.text.startsWith("/giphy ")) {
    const query = message.text.replace("/giphy ", "");
    const gif = await translate({
      s: query,
      // eslint-disable-next-line @typescript-eslint/camelcase
      api_key: apiKey,
      rating: Rating.G,
      lang: "en",
    });
    if (gif) {
      return createGifMessage(gif, query, message.senderId);
    }
  }
  return message;
};

export default transformer;
