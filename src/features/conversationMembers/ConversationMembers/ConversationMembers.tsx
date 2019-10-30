import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { getPanelStates, getBreakpoint } from "features/layout/selectors";
import { Breakpoint } from "features/layout/store";
import { UsersIndexedById, getUsersById } from "features/users/userStore";
import {
  getUsersByConversationId,
  MembershipHash
} from "../conversationMemberStore";
import { MemberDescription, UserFragment } from "../MemberDescription";
import { getCurrentConversationId } from "features/currentConversation/currentConversationStore";
import { setLayoutDefault } from "features/layout/actions";
import { Cross as CrossIcon } from "foundations/components/icons/Cross";
import { Back as BackIcon } from "foundations/components/icons/Back";
import {
  Wrapper,
  AnimatedWrapper,
  CloseIcon,
  ScrollableView,
  Header,
  BackIconWrapper,
  Title
} from "./ConversationMembers.style";
import { fetchMembers } from "pubnub-redux";
import { usePubNub } from "pubnub-react";

export const getCurrentConversationMembers = createSelector(
  [getUsersById, getCurrentConversationId, getUsersByConversationId],
  (
    users: UsersIndexedById,
    conversationId: string,
    conversationMemberships: MembershipHash
  ): UserFragment[] => {
    return conversationMemberships[conversationId]
      ? conversationMemberships[conversationId].map(user => {
          return {
            ...users[user.id],
            presence: true
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
  const panels = useSelector(getPanelStates);
  const breakpoint = useSelector(getBreakpoint);
  const Panel = breakpoint === Breakpoint.Small ? Wrapper : AnimatedWrapper;

  useEffect(() => {
    if (members.length === 0) {
      dispatch(
        fetchMembers(pubnub, currentConversationId, {
          include: {
            userFields: true,
            customUserFields: true,
            totalCount: false
          }
        })
      );
    }
  }, [members, currentConversationId, pubnub, dispatch]);

  return (
    <Panel pose={panels.Right ? "open" : "closed"}>
      <Header>
        <Title>
          <BackIconWrapper
            onClick={() => {
              dispatch(setLayoutDefault());
            }}
          >
            <BackIcon />
          </BackIconWrapper>
          Members
        </Title>
        <CloseIcon
          onClick={() => {
            dispatch(setLayoutDefault());
          }}
        >
          <CrossIcon />
        </CloseIcon>
      </Header>
      <ScrollableView>
        {orderByPresence(members).map(user => (
          <MemberDescription user={user} key={user.name} />
        ))}
      </ScrollableView>
    </Panel>
  );
};

export { ConversationMembers };
