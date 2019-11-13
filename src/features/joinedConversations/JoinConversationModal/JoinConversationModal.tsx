import React from "react";
import { getPanelStates } from "features/layout/selectors";
import { useSelector, useDispatch } from "react-redux";
import { setLayoutDefault } from "features/layout/actions";
import { getLoggedInUserId } from "features/authentication/authenticationModel";
import {
  ConversationDescription,
  ConversationDescriptionFragment
} from "../ConversationDescription";
import {
  getConversationsByUserId,
  MembershipHash
} from "../joinedConversationModel";
import { Cross as CrossIcon } from "foundations/components/icons/Cross";
import {
  ScrollView,
  CloseButton,
  Title,
  Header
} from "./JoinConversationModal.style";
import { Overlay, Modal, AnimatedModal } from "foundations/components/Modal";
import { createSelector } from "reselect";
import {
  getAllConversations,
  Conversation
} from "features/conversations/conversationModel";
import { Breakpoint } from "features/layout/layoutModel";
import { getBreakpoint } from "features/layout/selectors";
import { joinConversation } from "../joinConversationCommand";

// Fetch all conversations and remove the ones we're already a member of
const getJoinableConversations = createSelector(
  [getAllConversations, getLoggedInUserId, getConversationsByUserId],
  (
    conversations: Conversation[],
    userId: string,
    joinedConversations: MembershipHash
  ): ConversationDescriptionFragment[] => {
    return conversations.filter(conversation => {
      return !joinedConversations[userId]
        .map(conv => conv.id)
        .includes(conversation.id);
    });
  }
);

const JoinConversationModal = () => {
  const conversations: ConversationDescriptionFragment[] = useSelector(
    getJoinableConversations
  );
  const panels = useSelector(getPanelStates);
  const currentUserId = useSelector(getLoggedInUserId);
  const dispatch = useDispatch();
  const breakpoint = useSelector(getBreakpoint);
  const Panel = breakpoint === Breakpoint.Small ? Modal : AnimatedModal;

  return (
    <Overlay displayed={panels.Overlay}>
      <Panel pose={panels.Overlay ? "open" : "closed"}>
        <Header>
          <Title>Join a Conversation</Title>
          <CloseButton
            onClick={() => {
              dispatch(setLayoutDefault());
            }}
          >
            <CrossIcon />
          </CloseButton>
        </Header>
        <ScrollView>
          {conversations.map(conversation => (
            <ConversationDescription
              key={`conversationDescription-${conversation.id}`}
              onClick={() => {
                const conversationId = conversation.id;
                dispatch(joinConversation(currentUserId, conversationId));
                dispatch(setLayoutDefault());
              }}
              conversation={conversation}
            />
          ))}
        </ScrollView>
      </Panel>
    </Overlay>
  );
};

export { JoinConversationModal };
