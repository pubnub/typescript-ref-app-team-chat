import React from "react";
import { Header } from "../Header";
import { MessageList } from "../MessageList";
import { MessageInput } from "../MessageInput";
import { TypingIndicatorDisplay } from "features/typingIndicator/TypingIndicatorDisplay";
import { FlexColumn } from "foundations/components/layout";

const CurrentConversation = () => {
  return (
    <FlexColumn
      height="100%"
      width="100%"
      position={["fixed", "static"]}
      bg="backgrounds.content"
      borderRight="light"
    >
      <Header />
      <MessageList />
      <MessageInput />
      <TypingIndicatorDisplay />
    </FlexColumn>
  );
};

export { CurrentConversation };
