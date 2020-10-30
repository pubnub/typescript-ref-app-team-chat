import React, { useCallback } from "react";
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
import { ConversationItem } from "../ConversationItem";
import {
  Heading,
  HeadingVariants,
  Icon,
  Icons
} from "foundations/components/presentation";
import { ScrollView, FlexRow } from "foundations/components/layout";
import { leaveConversation } from "../leaveConversationCommand";
import {
  currentConversationViewDisplayed,
  joinConversationViewDisplayed,
  menuViewHidden
} from "features/layout/LayoutActions";
import {
  usePagination,
  GetNextPage,
  SavePaginationState
} from "foundations/hooks/usePagination";
import { fetchMemberships } from "pubnub-redux";
import { MembershipsRetrievedAction } from "pubnub-redux/dist/features/membership/MembershipActions";
import { ChannelMembershipObject } from "pubnub";
import { getMembershipsPaginationStateById } from "features/pagination/Selectors";
import { setMembershipsPagination } from "features/pagination/PaginationActions";

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
  const dispatch = useDispatch();
  const openOverlay = () => {
    dispatch(joinConversationViewDisplayed());
  };

  const storedPaginationState = useSelector(getMembershipsPaginationStateById)[
    currentUserId
  ];

  const restorePaginationState = useCallback(() => {
    return storedPaginationState;
  }, [storedPaginationState]);

  const savePaginationState: SavePaginationState<
    string | undefined,
    string
  > = useCallback(
    (channel, pagination, count, pagesRemain) => {
      dispatch(
        setMembershipsPagination(channel, { pagination, count, pagesRemain })
      );
    },
    [dispatch]
  );

  const getNextPage: GetNextPage<
    ChannelMembershipObject<{}, {}>,
    string | undefined,
    string
  > = useCallback(
    async (next, total, uuid) => {
      const pageSize = 20;
      const action = ((await dispatch(
        fetchMemberships({
          uuid,
          limit: pageSize,
          include: {
            channelFields: true,
            customChannelFields: false,
            customFields: false,
            totalCount: true
          },
          page: {
            next: next || undefined
          }
        })
      )) as unknown) as MembershipsRetrievedAction<{}, {}, unknown>;
      const response = action.payload.response;
      return {
        results: response.data,
        pagination: response.next,
        pagesRemain:
          response.data.length > 0 && response.totalCount && total
            ? total + response.data.length < response.totalCount
            : response.data.length === pageSize
      };
    },
    [dispatch]
  );

  const { containerRef, endRef } = usePagination(
    getNextPage,
    currentUserId,
    savePaginationState,
    restorePaginationState
  );

  if (conversationsById === undefined) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <FlexRow justifyContent="space-between" mx={6} marginBottom={1}>
        <Heading variant={HeadingVariants.INVERSE}>Conversations</Heading>
        <Icon
          icon={Icons.Add}
          color={"onPrimary"}
          onClick={openOverlay}
          title="Join conversation"
          clickable
        />
      </FlexRow>

      <ScrollView ref={containerRef}>
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
            }}
          ></ConversationItem>
        ))}
        <div ref={endRef} />
      </ScrollView>
    </>
  );
};

export { MyConversations };
