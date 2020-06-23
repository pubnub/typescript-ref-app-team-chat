import React from "react";
import invariant from "invariant";
import { TextMessageDisplay } from "features/messages/TextMessageDisplay";
import { GiphyMessageDisplay } from "features/messages/GiphyMessageDisplay";
import { MessageType, AppMessage } from "features/messages/messageModel";
import { BaseMessage } from "sharedTypes/messageModel";

type MessageProps = {
  message: AppMessage;
  parentKey: string;
};

/**
 * Display a Message based on its type
 */
export const MessageDisplay = ({ message, parentKey }: MessageProps) => {
  switch (message.type) {
    case MessageType.Text:
      return (
        <TextMessageDisplay
          message={message}
          parentKey={parentKey}
        ></TextMessageDisplay>
      );

    case MessageType.Giphy:
      return <GiphyMessageDisplay message={message}></GiphyMessageDisplay>;

    // <== Add additional message types here.

    // Don't show anything for an unrecognized message type
    default:
      invariant(
        false,
        `No component available for displaying message of type "${
          (message as BaseMessage).type
        }"`
      );
  }
};
