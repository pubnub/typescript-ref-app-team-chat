import { BaseMessage } from "sharedTypes/messageModel";
import { Transformer } from "transformers/types";
import attachLinks from "transformers/attachLinks";
import applyGiphyCommand from "transformers/applyGiphyCommand";
import filterProfanity from "transformers/filterProfanity";

// basic type guard
const isMessage = (message: object): message is BaseMessage => {
  return "type" in message && "senderId" in message;
};

// all the transformers for your application
const messageTransformers: Transformer<BaseMessage>[] = [
  filterProfanity,
  applyGiphyCommand,
  attachLinks,
];

const applyTransformers = async <T>(
  transformers: Transformer<T>[],
  message: T
): Promise<T> => {
  // applies all the transformers to the message in order
  return await transformers.reduce(
    async (message: Promise<T> | T, transformer: Transformer<T>) => {
      return transformer(await message);
    },
    message
  );
};

const beforePublish: PNFunction.BeforePublish = async (request) => {
  const message = request.message;
  if (isMessage(message)) {
    request.message = await applyTransformers(messageTransformers, message);
  }
  // all messages are allowed through after being transformed
  return request.ok();
};

export default beforePublish;
