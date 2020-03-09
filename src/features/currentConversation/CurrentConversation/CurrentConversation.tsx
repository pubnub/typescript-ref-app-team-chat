import React from "react";
import { Wrapper, animatedWrapperVariants } from "./CurrentConversation.style";
import { Header } from "../Header";
import { MessageList } from "../MessageList";
import { MessageInput } from "../MessageInput";
import { useSelector } from "react-redux";
import { getViewStates } from "features/layout/Selectors";

const CurrentConversation = () => {
  const views = useSelector(getViewStates);
  return (
    <Wrapper
      animate={views.CurrentConversation ? "open" : "closed"}
      variants={animatedWrapperVariants}
    >
      <Header />
      <MessageList />
      <MessageInput />
    </Wrapper>
  );
};

export { CurrentConversation };
