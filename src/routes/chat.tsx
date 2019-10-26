import React from "react";
import { Menu } from "features/menu/Menu/Menu";
import { CurrentConversation } from "features/currentConversation/CurrentConversation/CurrentConversation";
import { ConversationMembers } from "features/conversationMembers/ConversationMembers/ConversationMembers";
import { JoinConversationOverlay } from "features/joinedConversations/JoinConversationOverlay/JoinConversationOverlay";
import { Redirect, RouteComponentProps } from "@reach/router";
import { isUserLoggedIn } from "features/authentication/authenticationStore";
import { useSelector } from "react-redux";

export const ChatRoute = (props: RouteComponentProps) => {
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
