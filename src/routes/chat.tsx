import React from "react";
import { Menu } from "features/menu/Menu/Menu";
import { CurrentConversation } from "features/currentConversation/CurrentConversation/CurrentConversation";
import { ConversationMembers } from "features/conversationMembers/ConversationMembers/ConversationMembers";
import { JoinConversationModal } from "features/joinedConversations/JoinConversationModal/JoinConversationModal";
import { Redirect, RouteComponentProps } from "@reach/router";
import { isUserLoggedIn } from "features/authentication/authenticationStore";
import { useSelector } from "react-redux";

export const ChatRoute = (props: RouteComponentProps) => {
  const loggedIn = useSelector(isUserLoggedIn);
  if (!loggedIn) {
    return <Redirect from="/" to="/login" noThrow />;
  }
  return (
    <>
      <Menu />
      <CurrentConversation />
      <ConversationMembers />
      <JoinConversationModal />
    </>
  );
};
