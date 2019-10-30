import React from "react";
import { getPanelStates } from "features/layout/selectors";
import { useSelector, useDispatch } from "react-redux";
import { setLayoutDefault } from "features/layout/actions";
import { getLoggedInUserId } from "features/authentication/authenticationStore";
import { focusOnConversation } from "features/currentConversation/currentConversationStore";
import {
  ConversationDescription,
  ConversationDescriptionFragment
} from "../ConversationDescription";
import { Cross as CrossIcon } from "foundations/components/icons/Cross";
import {
  Overlay,
  Wrapper,
  AnimatedWrapper,
  ScrollView,
  CloseButton,
  Title,
  Header
} from "./JoinConversationModal.style";
import { createSelector } from "reselect";
import {
  getAllConversations,
  Conversation
} from "features/conversations/conversationStore";
import { Breakpoint } from "features/layout/store";
import { getBreakpoint } from "features/layout/selectors";
import { joinSpaces } from "pubnub-redux";
import { usePubNub } from "pubnub-react";

// Fetch all conversations and remove the ones we're already a member of
const getJoinableConversations = createSelector(
  [getAllConversations],
  (conversations: Conversation[]): ConversationDescriptionFragment[] => {
    return conversations;
  }
);

const JoinConversationModal = () => {
  const pubnub = usePubNub();
  const conversations: ConversationDescriptionFragment[] = useSelector(
    getJoinableConversations
  );
  const panels = useSelector(getPanelStates);
  const currentUserId = useSelector(getLoggedInUserId);
  const dispatch = useDispatch();
  const breakpoint = useSelector(getBreakpoint);
  const Panel = breakpoint === Breakpoint.Small ? Wrapper : AnimatedWrapper;

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
              key={`conversationDescription-${conversation.name}`}
              onClick={() => {
                const conversationId = conversation.name;
                dispatch(
                  joinSpaces(pubnub, {
                    userId: currentUserId,
                    spaces: [{ id: conversationId }]
                  })
                );
                dispatch(focusOnConversation(conversationId));
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
