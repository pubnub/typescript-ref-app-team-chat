import React from "react";
import UserInitialsAvatar from "components/UserInitialsAvatar";
import convertTimestampToTime from "utilities/convertTimestampToTime";
import {
  Wrapper,
  Body,
  Header,
  Avatar,
  SenderName,
  Content,
  TimeSent
} from "./style";

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
}

const Message = ({ message }: MessageProps) => {
  /*
    TODO: THere is a bug here.  The message sender may not be loaded here due to errors in timing.
    But, usually, it does get loaded when the members in the conversation get loaded.
  if (message.message.sender === undefined) {
    return null;
  }
  */

  return (
    <Wrapper>
      <Avatar>
        <UserInitialsAvatar
          size={36}
          name={message.sender.name}
          uuid={message.sender.id}
        />
      </Avatar>
      <Body>
        <Header>
          <SenderName>{message.sender.name}</SenderName>
          <TimeSent>{convertTimestampToTime(message.timetoken)}</TimeSent>
        </Header>
        <Content>{message.message.content.body}</Content>
      </Body>
    </Wrapper>
  );
};

export default Message;
