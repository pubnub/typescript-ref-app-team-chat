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
import { getPanelStates } from "features/layout/selectors";
import { setLayoutRight } from "features/layout/actions";
import { PeopleGroup as PeopleGroupIcon } from "foundations/components/icons/PeopleGroup";
import {
  Wrapper,
  OccupancyNumber,
  IconWrapper
} from "./ConversationOccupancy.style";

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
  const panels = useSelector(getPanelStates);
  const isRightLayoutToggled = panels.Right;
  const dispatch = useDispatch();

  return (
    <Wrapper
      highlighted={isRightLayoutToggled}
      onClick={() => {
        dispatch(setLayoutRight());
      }}
    >
      <OccupancyNumber>
        <em>{presentCount}</em> | {joinedCount}
      </OccupancyNumber>
      <IconWrapper>
        <PeopleGroupIcon fill={isRightLayoutToggled ? "#3FABFF" : "#979797"} />
      </IconWrapper>
    </Wrapper>
  );
};

export { ConversationOccupancy };
