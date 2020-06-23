import React from "react";
import { Content, Attachments } from "./TextMessageDisplay.style";
import { AttachmentDisplay } from "../AttachmentDisplay";
import { TextMessage } from "../messageModel";
import emojiRegex from "emoji-regex";

type TextMessageProps = {
  message: TextMessage;
  parentKey: string;
};

// make the message larger if there are only emoji and 3 or less emoji
const isEmphasized = (messageContent: string): boolean => {
  const trimmed = messageContent.trim();
  if (trimmed.length <= 15) {
    const emoji = messageContent.match(emojiRegex());
    return emoji ? emoji.length <= 3 && emoji.join("") === trimmed : false;
  } else {
    return false;
  }
};

/**
 * Display a TextMessage such as it would appear in a list of messages
 */
export const TextMessageDisplay = ({
  message,
  parentKey,
}: TextMessageProps) => {
  return (
    <>
      <Content emphasize={isEmphasized(message.text)}>{message.text}</Content>
      {message.attachments && (
        <Attachments>
          {message.attachments.map((attachment, index) => (
            <AttachmentDisplay
              key={`${parentKey}-attachment-${index}`}
              attachment={attachment}
            />
          ))}
        </Attachments>
      )}
    </>
  );
};
