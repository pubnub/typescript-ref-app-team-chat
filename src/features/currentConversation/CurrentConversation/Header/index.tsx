import React from "react";
import ConversationOccupancy from "./ConversationOccupancy";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { setLayoutLeft } from "features/layout/actions";
import {
  ConversationsIndexedById,
  getConversationsById
} from "features/conversations/conversationStore";
import { getCurrentConversationId } from "features/currentConversation/currentConversationStore";
import {
  Wrapper,
  Body,
  Information,
  Name,
  Description,
  Border,
  BackIconWrapper
} from "./style";
import BackIcon from "components/icons/Back";

export interface ConversationDescriptionFragment {
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

const Header: React.FC = () => {
  const conversation: ConversationDescriptionFragment = useSelector(
    getCurrentConversationDescription
  );

  const dispatch = useDispatch();
  return (
    <Wrapper>
      <Body>
        <BackIconWrapper
          onClick={() => {
            dispatch(setLayoutLeft());
          }}
        >
          <BackIcon />
        </BackIconWrapper>
        <Information>
          <Name>{conversation.name}</Name>
          <Description>{conversation.description}</Description>
        </Information>
        <ConversationOccupancy />
      </Body>
      <Border />
    </Wrapper>
  );
};

export default Header;
