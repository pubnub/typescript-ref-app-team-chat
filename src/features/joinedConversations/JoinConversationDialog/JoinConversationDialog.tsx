import React, { useCallback } from "react";
import { getViewStates } from "features/layout/Selectors";
import { useSelector, useDispatch } from "react-redux";
import { getLoggedInUserId } from "features/authentication/authenticationModel";
import {
  ConversationDescription,
  ConversationDescriptionFragment
} from "../ConversationDescription";
import {
  getConversationsByUserId,
  MembershipHash
} from "../joinedConversationModel";
import {
  Heading,
  HeadingSizes,
  Icon,
  Icons
} from "foundations/components/presentation";
import { ScrollView, Modal, FlexRow } from "foundations/components/layout";
import { createSelector } from "reselect";
import {
  getAllConversations,
  Conversation
} from "features/conversations/conversationModel";
import { joinConversation } from "../joinConversationCommand";
import { joinConversationViewHidden } from "features/layout/LayoutActions";
import {
  usePagination,
  GetNextPage,
  SavePaginationState
} from "foundations/hooks/usePagination";
import { ChannelMetadataObject } from "pubnub";
import { fetchAllChannelData } from "pubnub-redux";
import { AllChannelDataRetrievedAction } from "pubnub-redux/dist/features/channel/ChannelDataActions";
import { getChannelsPaginationState } from "features/pagination/Selectors";
import { setChannelsPagination } from "features/pagination/PaginationActions";

// Fetch all conversations and remove the ones we're already a member of
const getJoinableConversations = createSelector(
  [getAllConversations, getLoggedInUserId, getConversationsByUserId],
  (
    conversations: Conversation[],
    userId: string,
    joinedConversations: MembershipHash
  ): ConversationDescriptionFragment[] => {
    return conversations.filter(conversation => {
      return !joinedConversations[userId]
        .map(conv => conv.id)
        .includes(conversation.id);
    });
  }
);

/**
 * Present list to the user of conversations that they could join, but have not.
 * Allow the user to select the conversation to join or back out.
 *
 * TODO: This renders unconditionally as display:none so it will fetch the
 * list of conversations to join when the UI is rendered even if the user has not
 * opened the dialog.
 */
const JoinConversationDialog = () => {
  const conversations: ConversationDescriptionFragment[] = useSelector(
    getJoinableConversations
  );
  const views = useSelector(getViewStates);
  const currentUserId = useSelector(getLoggedInUserId);
  const dispatch = useDispatch();

  const storedPaginationState = useSelector(getChannelsPaginationState);

  const restorePaginationState = useCallback(() => {
    return storedPaginationState;
  }, [storedPaginationState]);

  const savePaginationState: SavePaginationState<
    string | undefined,
    undefined
  > = useCallback(
    (_, pagination, count, pagesRemain) => {
      dispatch(setChannelsPagination({ pagination, count, pagesRemain }));
    },
    [dispatch]
  );

  const getNextPage: GetNextPage<
    ChannelMetadataObject<{}>,
    string | undefined,
    undefined
  > = useCallback(
    async (next, total) => {
      const pageSize = 20;
      const action = ((await dispatch(
        fetchAllChannelData({
          limit: pageSize,
          include: {
            totalCount: true
          },
          page: {
            next: next || undefined
          }
        })
      )) as unknown) as AllChannelDataRetrievedAction<{}, unknown>;
      const response = action.payload.response;
      return {
        results: response.data,
        pagination: response.next,
        pagesRemain:
          response.totalCount && total
            ? total + response.data.length < response.totalCount
            : response.data.length === pageSize
      };
    },
    [dispatch]
  );

  const { containerRef, endRef } = usePagination(
    getNextPage,
    undefined,
    savePaginationState,
    restorePaginationState
  );

  return (
    <Modal open={views.JoinConversation}>
      <FlexRow
        justifyContent="space-between"
        px={[3, 0]}
        paddingBottom={8}
        paddingTop={[8, 0]}
      >
        <Heading size={HeadingSizes.BIG}>Join a Conversation</Heading>
        <Icon
          onClick={() => {
            dispatch(joinConversationViewHidden());
          }}
          color={"normalText"}
          icon={Icons.Cross}
          title="Close"
          clickable
        />
      </FlexRow>

      <ScrollView ref={containerRef}>
        {conversations.map(conversation => (
          <ConversationDescription
            key={`conversationDescription-${conversation.id}`}
            onClick={() => {
              const conversationId = conversation.id;
              dispatch(joinConversation(currentUserId, conversationId));
              dispatch(joinConversationViewHidden());
            }}
            conversation={conversation}
          />
        ))}
        <div ref={endRef} />
      </ScrollView>
    </Modal>
  );
};

export { JoinConversationDialog };
