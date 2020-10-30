import React from "react";
import invariant from "invariant";
import { DraftMessage } from "../draft";
import { MessageType } from "../messageModel";
import { TextMessageEditor } from "../TextMessageEditor";
import { BaseMessage } from "sharedTypes/messageModel";
import { StyledBox } from "foundations/components/layout";

type MessageEditorProps = {
  message: DraftMessage;
  sendDraft: (message: DraftMessage) => void;
  updateDraft: (message: DraftMessage) => void;
};

/**
 * Edit a Draft Message by selecting the proper editor for the message type
 */
export const MessageEditor = ({
  message,
  sendDraft,
  updateDraft
}: MessageEditorProps) => {
  switch (message.type) {
    case MessageType.Text:
      return (
        <StyledBox
          border="dark"
          borderRadius="messageEditor"
          position="relative"
        >
          <TextMessageEditor
            message={message}
            sendDraft={sendDraft}
            updateDraft={updateDraft}
          ></TextMessageEditor>
        </StyledBox>
      );

    // <== Add additional message types here.

    // Don't show anything for an unrecognized message type
    default:
      invariant(
        false,
        `No editor available for draft message of type "${
          (message as BaseMessage).type
        }"`
      );
  }
};
