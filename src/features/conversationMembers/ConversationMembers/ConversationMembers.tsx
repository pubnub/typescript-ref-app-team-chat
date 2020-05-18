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
import {
  Wrapper,
  getAnimatedWrapperVariants,
  CloseIcon,
  ScrollableView,
  Header,
  Controls,
  ConversationIcon,
  IconWrapper,
  Details,
  Title,
  Channel
} from "./ConversationMembers.style";
import { fetchMembers, fetchHereNow } from "pubnub-redux";
import { usePubNub } from "pubnub-react";
import { conversationMembersViewHidden } from "features/layout/LayoutActions";
import { ThemeContext } from "styled-components";
import { useMediaQuery } from "foundations/hooks/useMediaQuery";
import { getLoggedInUserId } from "features/authentication/authenticationModel";
import getUniqueColor from "foundations/utilities/getUniqueColor";
import { getCurrentConversationDescription } from "features/currentConversation/Header";

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
  const userId = useSelector(getLoggedInUserId);
  const members: UserFragment[] = useSelector(getCurrentConversationMembers);
  const currentConversationId = useSelector(getCurrentConversationId);
  const dispatch = useDispatch();
  const pubnub = usePubNub();
  const views = useSelector(getViewStates);
  const theme = useContext(ThemeContext);
  const isMedium = useMediaQuery(theme.mediaQueries.medium);
  const conversation = useSelector(getCurrentConversationDescription);
  const conversationColor = getUniqueColor(
    conversation.name,
    (theme.colors.avatars as unknown) as string[]
  );

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
      variants={getAnimatedWrapperVariants(isMedium, theme.sizes[4])}
      transition={{ ease: "linear", duration: 0.15 }}
    >
      <Controls>
        <CloseIcon
          onClick={() => {
            dispatch(conversationMembersViewHidden());
          }}
        >
          <CrossIcon
            color={theme.colors.normalText}
            title="close members list"
          />
        </CloseIcon>
      </Controls>
      <Header>
        <IconWrapper>
          <ConversationIcon color={conversationColor}>#</ConversationIcon>
          <Details>
            <Channel>{conversation.name}</Channel>
          </Details>
        </IconWrapper>
      </Header>
      <Title>Members</Title>
      <ScrollableView>
        {orderByPresence(members).map(user => (
          <MemberDescription
            user={user}
            key={user.id}
            you={user.id === userId}
          />
        ))}
      </ScrollableView>
    </Wrapper>
  );
};

export { ConversationMembers };
