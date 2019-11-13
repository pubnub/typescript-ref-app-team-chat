import React from "react";
import { ConversationOccupancy } from "../ConversationOccupancy";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { setLayoutLeft } from "features/layout/actions";
import {
  ConversationsIndexedById,
  getConversationsById
} from "features/conversations/conversationModel";
import { getCurrentConversationId } from "../currentConversationModel";
import {
  Wrapper,
  Body,
  Information,
  Name,
  Description,
  Border,
  BackIconWrapper
} from "./Header.style";
import { Back as BackIcon } from "foundations/components/icons/Back";

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

export { Header };
