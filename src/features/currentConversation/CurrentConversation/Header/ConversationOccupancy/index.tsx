import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { getCurrentConversationId } from "features/currentConversation/currentConversationStore";
import {
  getUsersByConversationId,
  MembershipHash
} from "features/conversationMembers/conversationMemberStore";
import { getPanelStates } from "features/layout/selectors";
import { setLayoutRight } from "features/layout/actions";
import PeopleGroupIcon from "components/icons/PeopleGroup";
import { Wrapper, OccupancyNumber, IconWrapper } from "./style";

export interface ConversationOccupancyFragment {
  joinedCount: number;
  presentCount: number;
}

export const getCurrentConversationOccupancy = createSelector(
  [getCurrentConversationId, getUsersByConversationId],
  (
    currentConversationId: string,
    conversationMemberships: MembershipHash
  ): ConversationOccupancyFragment => {
    const members = conversationMemberships[currentConversationId];
    return {
      joinedCount: members ? members.length : 0,
      presentCount: 0
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

export default ConversationOccupancy;
