import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { getCurrentConversationId } from "features/currentConversation/currentConversationModel";
import { getConversationsByUserId } from "../joinedConversationModel";
import { MembershipHash } from "../joinedConversationModel";
import {
  ConversationsIndexedById,
  getConversationsById
} from "features/conversations/conversationModel";
import { focusOnConversation } from "features/currentConversation/currentConversationModel";
import { getLoggedInUserId } from "features/authentication/authenticationModel";
import { AddIcon } from "foundations/components/icons/AddIcon";
import { ConversationItem } from "../ConversationItem";
import {
  Wrapper,
  Title,
  AddButton,
  ConversationList
} from "./MyConversations.style";
import { fetchSpaces, fetchMembers } from "pubnub-redux";
import { getCurrentConversationMembers } from "features/conversationMembers/ConversationMembers/ConversationMembers";
import { UserFragment } from "features/conversationMembers/MemberDescription/MemberDescription";
import { leaveConversation } from "../leaveConversationCommand";
import {
  currentConversationViewDisplayed,
  joinConversationViewDisplayed,
  menuViewHidden
} from "features/layout/LayoutActions";

export interface ConversationFragment {
  id: string;
  name: string;
}

export const getJoinedConversations = createSelector(
  [getConversationsById, getLoggedInUserId, getConversationsByUserId],
  (
    conversations: ConversationsIndexedById,
    userId: string,
    userConversations: MembershipHash
  ): ConversationFragment[] => {
    return userConversations[userId]
      ? userConversations[userId].map(conversation => {
          return {
            id: conversation.id,
            name: conversations[conversation.id].name
          };
        })
      : [];
  }
);

const MyConversations = () => {
  const currentUserId = useSelector(getLoggedInUserId);
  const conversationsById = useSelector(getConversationsById);
  const conversations: ConversationFragment[] = useSelector(
    getJoinedConversations
  );
  const currentConversationId: string = useSelector(getCurrentConversationId);
  const members: UserFragment[] = useSelector(getCurrentConversationMembers);
  const dispatch = useDispatch();
  const openOverlay = () => {
    dispatch(fetchSpaces());
    dispatch(joinConversationViewDisplayed());
  };

  if (conversationsById === undefined) {
    return <div>Loading...</div>;
  }

  return (
    <Wrapper>
      <Title>
        Conversations
        <AddButton onClick={openOverlay}>
          <AddIcon title="Join conversation" />
        </AddButton>
      </Title>
      <ConversationList>
        {conversations.map(conversation => (
          <ConversationItem
            id={conversation.id}
            name={conversation.name}
            onLeave={() => {
              dispatch(leaveConversation(currentUserId, conversation.id));
            }}
            selected={conversation.id === currentConversationId}
            key={conversation.id}
            unreadMessageCount={0}
            onClick={() => {
              dispatch(focusOnConversation(conversation.id));
              dispatch(currentConversationViewDisplayed());
              dispatch(menuViewHidden());

              if (members.length === 0) {
                dispatch(
                  fetchMembers({
                    spaceId: conversation.id,
                    include: {
                      userFields: true,
                      customUserFields: true,
                      totalCount: false
                    }
                  })
                );
              }
            }}
          ></ConversationItem>
        ))}
      </ConversationList>
    </Wrapper>
  );
};

export { MyConversations };
