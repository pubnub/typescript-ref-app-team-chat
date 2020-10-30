import React from "react";
import { ConversationOccupancy } from "../ConversationOccupancy";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import {
  ConversationsIndexedById,
  getConversationsById
} from "features/conversations/conversationModel";
import { getCurrentConversationId } from "../currentConversationModel";
import { menuViewDisplayed } from "features/layout/LayoutActions";
import { Icon, Icons, Title } from "foundations/components/presentation";
import { FlexRow, StyledBox } from "foundations/components/layout";

export interface ConversationDescriptionFragment {
  id: string;
  name: string;
  description: string;
}

export const getCurrentConversationDescription = createSelector(
  [getConversationsById, getCurrentConversationId],
  (
    conversations: ConversationsIndexedById,
    currentConversationId: string
  ): ConversationDescriptionFragment => {
    return {
      ...conversations[currentConversationId]
    };
  }
);

const Header = () => {
  const conversation: ConversationDescriptionFragment = useSelector(
    getCurrentConversationDescription
  );

  const dispatch = useDispatch();

  return (
    <StyledBox px="6" paddingTop="7" bg={["backgrounds.panel", "transparent"]}>
      <FlexRow justifyContent="space-between">
        <StyledBox display={["block", "none"]} color="active" marginRight="7">
          <Icon
            icon={Icons.Back}
            onClick={() => {
              dispatch(menuViewDisplayed());
            }}
            title="Back"
            clickable
          />
        </StyledBox>

        <Title
          heading={conversation.name}
          label={conversation.description}
        ></Title>

        <ConversationOccupancy />
      </FlexRow>

      <StyledBox paddingTop="5" borderBottom="light"></StyledBox>
    </StyledBox>
  );
};

export { Header };
