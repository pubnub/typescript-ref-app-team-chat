import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { getCurrentConversationId } from "../currentConversationModel";
import {
  getUsersByConversationId,
  MembershipHash
} from "features/conversationMembers/conversationMemberModel";
import {
  getPresenceByConversationId,
  ConversationPresence
} from "features/memberPresence/memberPresenceModel";
import { getViewStates } from "features/layout/Selectors";
import { PeopleGroupIcon } from "foundations/components/icons/PeopleGroupIcon";
import {
  Wrapper,
  OccupancyNumber,
  IconWrapper
} from "./ConversationOccupancy.style";
import {
  conversationMembersViewDisplayed,
  conversationMembersViewHidden
} from "features/layout/LayoutActions";

export interface ConversationOccupancyFragment {
  joinedCount: number;
  presentCount: number;
}

export const getCurrentConversationOccupancy = createSelector(
  [
    getCurrentConversationId,
    getUsersByConversationId,
    getPresenceByConversationId
  ],
  (
    currentConversationId: string,
    conversationMemberships: MembershipHash,
    conversationPresence: ConversationPresence
  ): ConversationOccupancyFragment => {
    const members = conversationMemberships[currentConversationId];
    const presence = conversationPresence[currentConversationId];
    return {
      joinedCount: members ? members.length : 0,
      presentCount: presence ? presence.occupancy : 0
    };
  }
);

const ConversationOccupancy = () => {
  const {
    joinedCount,
    presentCount
  }: ConversationOccupancyFragment = useSelector(
    getCurrentConversationOccupancy
  );
  const views = useSelector(getViewStates);
  const isConversationMembersLayoutVisible = views.ConversationMembers;
  const dispatch = useDispatch();

  return (
    <Wrapper
      highlighted={isConversationMembersLayoutVisible}
      onClick={() => {
        isConversationMembersLayoutVisible
          ? dispatch(conversationMembersViewHidden())
          : dispatch(conversationMembersViewDisplayed());
      }}
    >
      <OccupancyNumber>
        <em>{presentCount}</em> | {joinedCount}
      </OccupancyNumber>
      <IconWrapper>
        <PeopleGroupIcon
          title={
            isConversationMembersLayoutVisible
              ? "Hide members list"
              : "Show convsersation members"
          }
          active={isConversationMembersLayoutVisible}
        />
      </IconWrapper>
    </Wrapper>
  );
};

export { ConversationOccupancy };
