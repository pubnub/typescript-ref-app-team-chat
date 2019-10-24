import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { getCurrentConversationId } from "features/currentConversation/currentConversationStore";
import { setLayoutOverlay, setLayoutDefault } from "features/layout/actions";
import { getConversationsByUserId } from "features/joinedConversations/joinedConversationStore";
import { MembershipHash } from "features/joinedConversations/joinedConversationStore";
import {
  ConversationsIndexedById,
  getConversationsById
} from "features/conversations/conversationStore";
import { focusOnConversation } from "features/currentConversation/currentConversationStore";
import { getLoggedInUserId } from "features/authentication/authenticationStore";
import Add from "components/icons/Add";
import ConversationItem from "./ConversationItem";
import { Wrapper, Title, AddButton, ConversationList } from "./style";
import {
  fetchSpaces,
  leaveSpaces,
  fetchMembers,
  fetchMemberships
} from "pubnub-redux";
import { usePubNub } from "pubnub-react";
import { getCurrentConversationMembers } from "features/conversationMembers/ConversationMembers";
import { UserFragment } from "features/conversationMembers/ConversationMembers/MemberDescription";

export interface ConversationFragment {
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
          return { name: conversations[conversation.id].name };
        })
      : [];
  }
);

const MyConversations = () => {
  const currentUserId = useSelector(getLoggedInUserId);
  const conversationsById = useSelector(getConversationsById);
  const hasConversations = !!conversationsById[currentUserId];
  const conversations: ConversationFragment[] = useSelector(
    getJoinedConversations
  );
  const currentConversationId: string = useSelector(getCurrentConversationId);
  const members: UserFragment[] = useSelector(getCurrentConversationMembers);

  const dispatch = useDispatch();
  const pubnub = usePubNub();

  const openOverlay = () => {
    dispatch(fetchSpaces(pubnub));
    dispatch(setLayoutOverlay());
  };

  useEffect(() => {
    if (!hasConversations) {
      dispatch(
        fetchMemberships(pubnub, currentUserId, {
          include: {
            spaceFields: true,
            customSpaceFields: false
          }
        })
      );
    }
  }, [hasConversations, currentUserId, pubnub, dispatch]);

  useEffect(() => {
    let subscribedChannels = pubnub.getSubscribedChannels();
    // let unsubscribeChannels = subscribedChannels.filter((value: string) =>
    //   conversations.find(c => c.name !== value)
    // );
    let subscribeChannels = conversations.filter(
      (c: ConversationFragment) => subscribedChannels.indexOf(c.name) === -1
    );

    // pubnub.unsubscribe({
    //   channels: unsubscribeChannels.map((c: string) => c)
    // });

    pubnub.subscribe({
      channels: subscribeChannels.map(c => c.name)
    });
  }, [conversations, pubnub]);

  if (conversationsById === undefined) {
    return <div>Loading...</div>;
  }

  return (
    <Wrapper>
      <Title>
        Conversations
        <AddButton onClick={openOverlay}>
          <Add />
        </AddButton>
      </Title>
      <ConversationList>
        {conversations.map(conversation => (
          <ConversationItem
            name={conversation.name}
            onLeave={() => {
              dispatch(
                leaveSpaces(pubnub, {
                  userId: currentUserId,
                  spaces: [{ id: conversation.name }]
                })
              );
            }}
            selected={conversation.name === currentConversationId}
            key={conversation.name}
            unreadMessageCount={0}
            onClick={() => {
              dispatch(focusOnConversation(conversation.name));
              dispatch(setLayoutDefault());

              if (members.length === 0) {
                dispatch(
                  fetchMembers(pubnub, conversation.name, {
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

export default MyConversations;
