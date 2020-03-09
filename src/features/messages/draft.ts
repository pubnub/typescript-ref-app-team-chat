import invariant from "invariant";
import { MessageType, TextMessage } from "./messageModel";

/**
 * We define a draft text message to to be identical to a finalized text message.
 *
 * This does not have to be the case for complext message types.  some fields might
 * be optional in the draft but required in the final version for example.
 */
export type DraftTextMessage = TextMessage;

/**
 * This is a union of all draft message types defined by the application.
 *
 * This can differ from the final version of the
 * message in that fields might be missing or temporary editor state may be
 * included.
 *
 * we don't do any of those things in this example, but having a separate type
 * helps to clarify which parts of the code are working with unsent messages.
 */
export type DraftMessage = DraftTextMessage;

/**
 * Test if a draft message been modified (used to ignore unmodified drafts).
 */
export const isDraftModified = (message: DraftMessage) => {
  switch (message.type) {
    case MessageType.Text:
      return message.text !== "";
    default:
      invariant(
        false,
        `Cannot determin if message of type "${message.type}" has been modified.`
      );
  }
};
