import React from "react";
import { Wrapper } from "./ChatUI.style";
import { Menu } from "features/chat/Menu/Menu";
import { CurrentConversation } from "features/currentConversation/CurrentConversation/CurrentConversation";
import { ConversationMembers } from "features/conversationMembers/ConversationMembers/ConversationMembers";
import { JoinConversationModal } from "features/joinedConversations/JoinConversationModal/JoinConversationModal";

const ChatUI = () => {
  return (
    <Wrapper>
      <Menu />
      <CurrentConversation />
      <ConversationMembers />
      <JoinConversationModal />
    </Wrapper>
  );
};

export { ChatUI };
