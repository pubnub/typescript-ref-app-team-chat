import React, { useEffect, useContext, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { getViewStates } from "features/layout/Selectors";
import { UsersIndexedById, getUsersById } from "features/users/userModel";
import {
  getUsersByConversationId,
  MembershipHash
} from "../conversationMemberModel";
import {
  getPresenceByConversationId,
  ConversationPresence
} from "features/memberPresence/memberPresenceModel";
import { MemberDescription, UserFragment } from "../MemberDescription";
import { getCurrentConversationId } from "features/currentConversation/currentConversationModel";

import { Heading, Icon, Icons } from "foundations/components/presentation";
import { Avatar } from "foundations/components/chat";
import {
  ScrollView,
  Drawer,
  StyledBox,
  FlexRow
} from "foundations/components/layout";
import { fetchChannelMembers, fetchHereNow } from "pubnub-redux";
import { usePubNub } from "pubnub-react";
import { conversationMembersViewHidden } from "features/layout/LayoutActions";
import { ThemeContext } from "styled-components";
import { getLoggedInUserId } from "features/authentication/authenticationModel";
import { getUniqueColor } from "foundations/utilities";
import { getCurrentConversationDescription } from "features/currentConversation/Header";
import {
  usePagination,
  GetNextPage,
  SavePaginationState
} from "foundations/hooks/usePagination";
import { ChannelMembersRetrievedAction } from "pubnub-redux/dist/features/members/ChannelMembersActions";
import { UUIDMembershipObject } from "pubnub";
import { getChannelMembersPaginationStateById } from "features/pagination/Selectors";
import { setChannelMembersPagination } from "features/pagination/PaginationActions";

export const getCurrentConversationMembers = createSelector(
  [
    getUsersById,
    getCurrentConversationId,
    getUsersByConversationId,
    getPresenceByConversationId
  ],
  (
    users: UsersIndexedById,
    conversationId: string,
    conversationMemberships: MembershipHash,
    conversationPresence: ConversationPresence
  ): UserFragment[] => {
    const presence = conversationPresence[conversationId];
    return conversationMemberships[conversationId]
      ? conversationMemberships[conversationId].map(user => {
          return {
            ...users[user.id],
            presence: presence
              ? presence.occupants.filter(occupant => {
                  return occupant.uuid === user.id;
                }).length > 0
              : false
          };
        })
      : [];
  }
);

const orderByPresence = (members: UserFragment[]) => {
  return members.sort((userA, userB) =>
    userA.presence === userB.presence ? 0 : userA.presence ? -1 : 1
  );
};
const ConversationMembers = () => {
  const userId = useSelector(getLoggedInUserId);
  const members: UserFragment[] = useSelector(getCurrentConversationMembers);
  const currentConversationId = useSelector(getCurrentConversationId);
  const dispatch = useDispatch();
  const pubnub = usePubNub();
  const views = useSelector(getViewStates);
  const theme = useContext(ThemeContext);
  const conversation = useSelector(getCurrentConversationDescription);
  const conversationColor = getUniqueColor(
    conversation.name,
    (theme.colors.avatars as unknown) as string[]
  );

  const storedPaginationState = useSelector(
    getChannelMembersPaginationStateById
  )[currentConversationId];

  const restorePaginationState = useCallback(() => {
    return storedPaginationState;
  }, [storedPaginationState]);

  const savePaginationState: SavePaginationState<
    string | undefined,
    string
  > = useCallback(
    (channel, pagination, count, pagesRemain) => {
      dispatch(
        setChannelMembersPagination(channel, { pagination, count, pagesRemain })
      );
    },
    [dispatch]
  );

  const getNextPage: GetNextPage<
    UUIDMembershipObject<{}, {}>,
    string | undefined,
    string
  > = useCallback(
    async (next, total, channel) => {
      const pageSize = 100;
      const action = ((await dispatch(
        fetchChannelMembers({
          limit: pageSize,
          channel,
          include: {
            UUIDFields: true,
            customUUIDFields: true,
            totalCount: true
          },
          page: {
            next: next || undefined
          }
        })
      )) as unknown) as ChannelMembersRetrievedAction<{}, {}, unknown>;
      const response = action.payload.response;
      return {
        results: response.data,
        pagination: response.next,
        pagesRemain:
          response.totalCount && total
            ? total + response.data.length < response.totalCount
            : response.data.length === pageSize
      };
    },
    [dispatch]
  );

  const { containerRef, endRef } = usePagination(
    getNextPage,
    currentConversationId,
    savePaginationState,
    restorePaginationState
  );

  // update hereNow when the conversationId changes
  useEffect(() => {
    dispatch(
      fetchHereNow({
        channels: [currentConversationId]
      })
    );
  }, [currentConversationId, pubnub, dispatch]);

  return (
    <Drawer open={views.ConversationMembers} edge="right" wide>
      <StyledBox position="absolute" right="0" padding="6">
        <Icon
          onClick={() => {
            dispatch(conversationMembersViewHidden());
          }}
          icon={Icons.Cross}
          color="normalText"
          title="Close members list"
          clickable
        />
      </StyledBox>

      <FlexRow padding="6">
        <Avatar bg={conversationColor}>#</Avatar>
        <StyledBox paddingLeft="6">
          <Heading>{conversation.name}</Heading>
        </StyledBox>
      </FlexRow>

      <StyledBox px="6" py="1">
        <Heading>Members</Heading>
      </StyledBox>

      <ScrollView ref={containerRef}>
        {orderByPresence(members).map(user => (
          <MemberDescription
            user={user}
            key={user.id}
            you={user.id === userId}
          />
        ))}
        <div ref={endRef} />
      </ScrollView>
    </Drawer>
  );
};

export { ConversationMembers };
