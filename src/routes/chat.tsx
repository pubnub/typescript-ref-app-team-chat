import React from "react";
import Menu from "features/menu/Menu";
import CurrentConversation from "features/currentConversation/CurrentConversation";
import ConversationMembers from "features/conversationMembers/ConversationMembers";
import JoinConversationOverlay from "features/joinedConversations/JoinConversationOverlay";
import { Redirect, RouteComponentProps } from "@reach/router";
import { isUserLoggedIn } from "features/authentication/authenticationStore";
import { useSelector } from "react-redux";

const Chat = (props: RouteComponentProps) => {
  const loggedIn = useSelector(isUserLoggedIn);
  return loggedIn ? (
    <>
      <Menu />
      <CurrentConversation />
      <ConversationMembers />
      <JoinConversationOverlay />
    </>
  ) : (
    <Redirect from="/" to="/login" noThrow />
  );
};

export default Chat;
