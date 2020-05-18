import React, { useContext } from "react";
import { getViewStates } from "features/layout/Selectors";
import { useSelector, useDispatch } from "react-redux";
import { getLoggedInUserId } from "features/authentication/authenticationModel";
import {
  ConversationDescription,
  ConversationDescriptionFragment
} from "../ConversationDescription";
import {
  getConversationsByUserId,
  MembershipHash
} from "../joinedConversationModel";
import { CrossIcon } from "foundations/components/icons/CrossIcon";
import {
  ScrollView,
  CloseButton,
  Title,
  Header
} from "./JoinConversationDialog.style";
import {
  Overlay,
  Modal,
  getAnimatedModalVariants
} from "foundations/components/Modal";
import { createSelector } from "reselect";
import {
  getAllConversations,
  Conversation
} from "features/conversations/conversationModel";
import { joinConversation } from "../joinConversationCommand";
import { joinConversationViewHidden } from "features/layout/LayoutActions";
import { ThemeContext } from "styled-components";
import { useMediaQuery } from "foundations/hooks/useMediaQuery";

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

/**
 * Present list to the user of conversations that they could join, but have not.
 * Allow the user to select the conversation to join or back out.
 *
 * TODO: This renders unconditionally as display:none so it will fetch the
 * list of conversations to join when the UI is rendered even if the user has not
 * opened the dialog.
 */
const JoinConversationDialog = () => {
  const conversations: ConversationDescriptionFragment[] = useSelector(
    getJoinableConversations
  );
  const views = useSelector(getViewStates);
  const currentUserId = useSelector(getLoggedInUserId);
  const dispatch = useDispatch();
  const theme = useContext(ThemeContext);
  const isMedium = useMediaQuery(theme.mediaQueries.medium);

  return (
    <Overlay displayed={views.JoinConversation}>
      <Modal
        animate={views.JoinConversation ? "open" : "closed"}
        variants={getAnimatedModalVariants(isMedium)}
      >
        <Header>
          <Title>Join a Conversation</Title>
          <CloseButton
            onClick={() => {
              dispatch(joinConversationViewHidden());
            }}
          >
            <CrossIcon color={theme.colors.normalText} title="close" />
          </CloseButton>
        </Header>
        <ScrollView>
          {conversations.map(conversation => (
            <ConversationDescription
              key={`conversationDescription-${conversation.id}`}
              onClick={() => {
                const conversationId = conversation.id;
                dispatch(joinConversation(currentUserId, conversationId));
                dispatch(joinConversationViewHidden());
              }}
              conversation={conversation}
            />
          ))}
        </ScrollView>
      </Modal>
    </Overlay>
  );
};

export { JoinConversationDialog };
