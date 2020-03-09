import React from "react";
import invariant from "invariant";
import { DraftMessage } from "../draft";
import { MessageType } from "../messageModel";
import { TextMessageEditor } from "../TextMessageEditor";
import { Wrapper } from "./MessageEditor.style";

type MessageEditorProps = {
  message: DraftMessage;
  sendDraft: (message: DraftMessage) => void;
  updateDraft: (message: DraftMessage) => void;
};

/**
 * Edit a Draft Message buy selecting the proper editor for the message type
 */
export const MessageEditor = ({
  message,
  sendDraft,
  updateDraft
}: MessageEditorProps) => {
  switch (message.type) {
    case MessageType.Text:
      return (
        <Wrapper>
          <TextMessageEditor
            message={message}
            sendDraft={sendDraft}
            updateDraft={updateDraft}
          ></TextMessageEditor>
        </Wrapper>
      );

    // <== Add additional message types here.

    // Don't show anything for an unrecognized message type
    default:
      invariant(
        false,
        `No editor available for draft message of type "${message.type}"`
      );
  }
};
