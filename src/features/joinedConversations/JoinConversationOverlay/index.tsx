import React from "react";
import { getPanelStates } from "features/layout/selectors";
import { useSelector, useDispatch } from "react-redux";
import { setLayoutDefault } from "features/layout/actions";
import { getLoggedInUserId } from "features/authentication/authenticationStore";
import { focusOnConversation } from "features/currentConversation/currentConversationStore";
import ConversationDescription, {
  ConversationDescriptionFragment
} from "./ConversationDescription";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import {
  AnimatedWrapper,
  ScrollView,
  CloseButton,
  Title,
  Header
} from "./style";
import { createSelector } from "reselect";
import {
  getAllConversations,
  Conversation
} from "features/conversations/conversationStore";
import { joinSpaces } from "pubnub-redux";
import { usePubNub } from "pubnub-react";

// Fetch all conversations and remove the ones we're already a member of
const getJoinableConversations = createSelector(
  [getAllConversations],
  (conversations: Conversation[]): ConversationDescriptionFragment[] => {
    return conversations;
  }
);

const JoinConversationOverlay = () => {
  const pubnub = usePubNub();
  const conversations: ConversationDescriptionFragment[] = useSelector(
    getJoinableConversations
  );
  const panels = useSelector(getPanelStates);
  const currentUserId = useSelector(getLoggedInUserId);
  const dispatch = useDispatch();

  return (
    <AnimatedWrapper pose={panels.Overlay ? "open" : "closed"}>
      <Header>
        <Title>Join a Conversation</Title>
        <CloseButton
          onClick={() => {
            dispatch(setLayoutDefault());
          }}
        >
          <FontAwesomeIcon icon={faTimes} />
        </CloseButton>
      </Header>
      <ScrollView>
        {conversations.map(conversation => (
          <ConversationDescription
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
    </AnimatedWrapper>
  );
};

export default JoinConversationOverlay;
