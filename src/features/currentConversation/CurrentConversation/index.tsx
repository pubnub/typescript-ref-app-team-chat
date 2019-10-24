import React from "react";
import { AnimatedWrapper } from "./style";
import Header from "./Header";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import { useSelector } from "react-redux";
import { getPanelStates } from "features/layout/selectors";

const CurrentConversation = () => {
  const panels = useSelector(getPanelStates);
  return (
    <AnimatedWrapper pose={panels.Content ? "open" : "closed"}>
      <Header />
      <MessageList />
      <MessageInput />
    </AnimatedWrapper>
  );
};

export default CurrentConversation;
