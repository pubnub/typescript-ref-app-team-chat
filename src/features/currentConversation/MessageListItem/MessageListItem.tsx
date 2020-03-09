import React, { ReactNode } from "react";
import convertTimestampToTime from "foundations/utilities/convertTimestampToTime";
import {
  Wrapper,
  Body,
  Header,
  Avatar,
  SenderName,
  TimeSent
} from "./MessageListItem.style";
import { MessageDisplay } from "features/messages/MessageDisplay";
import { AppMessage } from "features/messages/messageModel";

// TODO: Explain message fragment
export interface MessageFragment {
  sender: {
    id: string;
    name: string;
  };
  timetoken: string;
  message: AppMessage;
}

interface MessageProps {
  messageFragment: MessageFragment;
  avatar: ReactNode;
}

/**
 * Display a message as it appears in a list
 */
const MessageListItem = ({ messageFragment, avatar }: MessageProps) => {
  let sender = messageFragment.sender;

  return (
    <Wrapper>
      <Avatar>{avatar}</Avatar>
      <Body>
        <Header>
          <SenderName>{sender.name}</SenderName>
          <TimeSent>
            {convertTimestampToTime(messageFragment.timetoken)}
          </TimeSent>
        </Header>
        <MessageDisplay message={messageFragment.message}></MessageDisplay>
      </Body>
    </Wrapper>
  );
};

export { MessageListItem };
