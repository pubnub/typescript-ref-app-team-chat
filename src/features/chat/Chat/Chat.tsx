import React from "react";
import { Menu } from "features/chat/Menu/Menu";
import { CurrentConversation } from "features/currentConversation/CurrentConversation/CurrentConversation";
import { ConversationMembers } from "features/conversationMembers/ConversationMembers/ConversationMembers";
import { JoinConversationDialog } from "features/joinedConversations/JoinConversationDialog/JoinConversationDialog";
import { FlexRow } from "foundations/components/layout";
const ChatUI = () => {
  return (
    <FlexRow height="100%">
      <Menu />
      <CurrentConversation />
      <ConversationMembers />
      <JoinConversationDialog />
    </FlexRow>
  );
};

export { ChatUI };
