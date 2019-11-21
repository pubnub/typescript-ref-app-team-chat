import React, { ReactNode } from "react";
import { UserInitialsAvatar } from "foundations/components/UserInitialsAvatar";
import convertTimestampToTime from "foundations/utilities/convertTimestampToTime";
import {
  Wrapper,
  Body,
  Header,
  Avatar,
  SenderName,
  Content,
  TimeSent
} from "./Message.style";

export interface MessageFragment {
  sender: {
    id: string;
    name: string;
  };
  timetoken: string;
  message: {
    content: {
      body: string;
    };
  };
}

interface MessageProps {
  message: MessageFragment;
  avatar?: ReactNode;
}

const Message = ({ message, avatar }: MessageProps) => {
  // show unknown sender when sender is missing
  let sender = message.sender || { id: "unknown", name: "Unknown" };

  return (
    <Wrapper>
      <Avatar>
        {avatar ? (
          avatar
        ) : (
          <UserInitialsAvatar size={36} name={sender.name} uuid={sender.id} />
        )}
      </Avatar>
      <Body>
        <Header>
          <SenderName>{sender.name}</SenderName>
          <TimeSent>{convertTimestampToTime(message.timetoken)}</TimeSent>
        </Header>
        <Content>{message.message.content.body}</Content>
      </Body>
    </Wrapper>
  );
};

export { Message };
