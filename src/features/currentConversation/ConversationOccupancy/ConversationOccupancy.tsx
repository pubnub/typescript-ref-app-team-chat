import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { getCurrentConversationId } from "../currentConversationModel";
import {
  getPresenceByConversationId,
  ConversationPresence
} from "features/memberPresence/memberPresenceModel";
import { getViewStates } from "features/layout/Selectors";
import {
  Label,
  LabelVariants,
  Icon,
  Icons,
  Button
} from "foundations/components/presentation";
import { FlexRow, StyledBox } from "foundations/components/layout";
import {
  conversationMembersViewDisplayed,
  conversationMembersViewHidden
} from "features/layout/LayoutActions";
import {
  getMembersCountByConversationId,
  ConversationMembersCount
} from "features/conversationMembers/conversationMemberCountModel";

export interface ConversationOccupancyFragment {
  joinedCount: number;
  presentCount: number;
}

export const getCurrentConversationOccupancy = createSelector(
  [
    getCurrentConversationId,
    getPresenceByConversationId,
    getMembersCountByConversationId
  ],
  (
    currentConversationId: string,
    conversationPresence: ConversationPresence,
    conversationMembersCount: ConversationMembersCount
  ): ConversationOccupancyFragment => {
    const count = conversationMembersCount[currentConversationId];
    const presence = conversationPresence[currentConversationId];
    return {
      joinedCount: count || 0,
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
    <FlexRow
      alignSelf="flex-start"
      flexDirection={["column-reverse", "row"]}
      onClick={() => {
        isConversationMembersLayoutVisible
          ? dispatch(conversationMembersViewHidden())
          : dispatch(conversationMembersViewDisplayed());
      }}
    >
      <StyledBox px={[0, 3]}>
        <Button>
          <Label
            variant={isConversationMembersLayoutVisible && LabelVariants.ACTIVE}
          >
            <b>{presentCount}</b> | {joinedCount}
          </Label>
        </Button>
      </StyledBox>

      <Icon
        icon={Icons.People}
        title={
          isConversationMembersLayoutVisible
            ? "Hide members list"
            : "Show convsersation members"
        }
        color={isConversationMembersLayoutVisible ? "active" : "normalText"}
        clickable
      />
    </FlexRow>
  );
};

export { ConversationOccupancy };
