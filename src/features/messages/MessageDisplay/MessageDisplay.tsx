import React from "react";
import invariant from "invariant";
import { TextMessageDisplay } from "features/messages/TextMessageDisplay";
import { MessageType, AppMessage } from "features/messages/messageModel";

type MessageProps = {
  message: AppMessage;
};

/**
 * Display a Message based on its type
 */
export const MessageDisplay = ({ message }: MessageProps) => {
  switch (message.type) {
    case MessageType.Text:
      return <TextMessageDisplay message={message}></TextMessageDisplay>;

    // <== Add additional message types here.

    // Don't show anything for an unrecognized message type
    default:
      invariant(
        false,
        `No component available for displaying message of type "${message.type}"`
      );
  }
};
