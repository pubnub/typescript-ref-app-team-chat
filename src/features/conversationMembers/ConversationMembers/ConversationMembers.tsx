import React, { useEffect, useContext } from "react";
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
import { CrossIcon } from "foundations/components/icons/CrossIcon";
import { BackIcon } from "foundations/components/icons/BackIcon";
import {
  Wrapper,
  getAnimatedWrapperVariants,
  CloseIcon,
  ScrollableView,
  Header,
  BackIconWrapper,
  Title
} from "./ConversationMembers.style";
import { fetchMembers, fetchHereNow } from "pubnub-redux";
import { usePubNub } from "pubnub-react";
import { conversationMembersViewHidden } from "features/layout/LayoutActions";
import { ThemeContext } from "styled-components";
import { useMediaQuery } from "foundations/hooks/useMediaQuery";

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
    let presence = conversationPresence[conversationId];
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
  const members: UserFragment[] = useSelector(getCurrentConversationMembers);
  const currentConversationId = useSelector(getCurrentConversationId);
  const dispatch = useDispatch();
  const pubnub = usePubNub();
  const views = useSelector(getViewStates);
  const themeContext = useContext(ThemeContext);
  const isSmall = useMediaQuery(themeContext.breakpoint.mediaQuery.small);

  useEffect(() => {
    if (members.length === 0) {
      dispatch(
        fetchMembers({
          spaceId: currentConversationId,
          include: {
            userFields: true,
            customUserFields: true,
            totalCount: false
          }
        })
      );

      dispatch(
        fetchHereNow({
          channels: [currentConversationId]
        })
      );
    }
  }, [members, currentConversationId, pubnub, dispatch]);

  return (
    <Wrapper
      animate={views.ConversationMembers ? "open" : "closed"}
      variants={getAnimatedWrapperVariants(isSmall)}
    >
      <Header>
        <Title>
          <BackIconWrapper
            onClick={() => {
              dispatch(conversationMembersViewHidden());
            }}
          >
            <BackIcon title="back" />
          </BackIconWrapper>
          Members
        </Title>
        <CloseIcon
          onClick={() => {
            dispatch(conversationMembersViewHidden());
          }}
        >
          <CrossIcon title="close members list" />
        </CloseIcon>
      </Header>
      <ScrollableView>
        {orderByPresence(members).map(user => (
          <MemberDescription user={user} key={user.id} />
        ))}
      </ScrollableView>
    </Wrapper>
  );
};

export { ConversationMembers };
