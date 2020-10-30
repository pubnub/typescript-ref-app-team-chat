import React, { useEffect, useState, useCallback, useContext } from "react";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { MessageListItem, MessageFragment } from "../MessageListItem";
import { getCurrentConversationId } from "../currentConversationModel";
import { getUsersById } from "features/users/userModel";
import { getMessagesById } from "features/messages/messageModel";
import { getUniqueColor, getInitials } from "foundations/utilities";
import { Avatar, AvatarVariants } from "foundations/components/chat";
import { ScrollView, FlexColumn } from "foundations/components/layout";
import { ThemeContext } from "styled-components";
import {
  usePagination,
  GetNextPage,
  SavePaginationState
} from "foundations/hooks/usePagination";
import { fetchMessageHistory, fetchUserData } from "pubnub-redux";
import {
  MessageHistoryRetrievedAction,
  HistoryResponseMessage
} from "pubnub-redux/dist/features/message/MessageActions";
import { useDispatch } from "react-redux";
import { getHistoryPaginationStateById } from "features/pagination/Selectors";
import { setHistoryPagination } from "features/pagination/PaginationActions";

/**
 * Create a selector that that returns the list of messages in the currentConversation joined
 * to the user that sent that message
 *
 * TODO:
 * This implementation will cause the dependant component to re-render if any user data has changed
 * if the current conversation has changed or if any message has changed or if any user has changed.
 * This needs to be reduced in scope
 *
 * TODO: This needs to sort by time token; object keys are not guarenteed to retain order in js.
 */
export const getCurrentConversationMessages = createSelector(
  [getMessagesById, getCurrentConversationId, getUsersById],
  (messages, conversationId, users): MessageFragment[] => {
    return messages[conversationId]
      ? Object.values(messages[conversationId])
          .filter(message => message.channel === conversationId)
          .map(
            (message): MessageFragment => {
              // if the user is unknown queue up a request for the missing data
              return {
                ...message,
                timetoken: String(message.timetoken),
                sender:
                  (users[message.message.senderId] as {
                    id: string;
                    name: string;
                  }) ||
                  (users[message.message.senderId]
                    ? {
                        id: message.message.senderId,
                        name: message.message.senderId
                      }
                    : {
                        id: "unknown",
                        name: "unknown"
                      })
              };
            }
          )
          .sort((messageA, messageB) => {
            if (messageA.timetoken === messageB.timetoken) {
              return 0;
            } else if (messageA.timetoken > messageB.timetoken) {
              return 1;
            } else {
              return -1;
            }
          })
      : [];
  }
);

// find users who have messages in the channel but are not loaded yet
export const getUnknownUsers = createSelector(
  [getMessagesById, getCurrentConversationId, getUsersById],
  (messages, conversationId, users): string[] => {
    return messages[conversationId]
      ? Object.values(messages[conversationId])
          .filter(message => message.channel === conversationId)
          .filter(
            message =>
              // if the user is unknown queue up a request for the missing data
              !users[message.message.senderId]
          )
          .map(message => message.message.senderId)
      : [];
  }
);

// prevent multiple fetches for the same data
const wasFetched = (() => {
  const ids: { [id: string]: boolean } = {};
  return (id: string) => {
    if (ids.hasOwnProperty(id)) {
      return true;
    } else {
      ids[id] = true;
      return false;
    }
  };
})();

const MessageList = () => {
  const dispatch = useDispatch();
  const [height, setHeight] = useState(0);
  type ConversationScrollPositionsType = { [conversationId: string]: number };
  const conversationId: string = useSelector(getCurrentConversationId);
  const [
    conversationsScrollPositions,
    setConversationsScrollPositions
  ] = useState<ConversationScrollPositionsType>({});

  const updateCurrentConversationScrollPosition = (scrollPosition: number) => {
    setConversationsScrollPositions({
      ...conversationsScrollPositions,
      [conversationId]: scrollPosition
    });
  };

  const handleScroll = (e: any) => {
    const scrollPosition = e.target.scrollTop;
    if (scrollPosition !== 0) {
      updateCurrentConversationScrollPosition(scrollPosition);
    }
  };

  const storedPaginationState = useSelector(getHistoryPaginationStateById)[
    conversationId
  ];

  const restorePaginationState = useCallback(() => {
    return storedPaginationState;
  }, [storedPaginationState]);

  const savePaginationState: SavePaginationState<
    string | undefined,
    string
  > = useCallback(
    (channel, pagination, count, pagesRemain) => {
      dispatch(
        setHistoryPagination(channel, { pagination, count, pagesRemain })
      );
    },
    [dispatch]
  );

  const getNextPage: GetNextPage<
    HistoryResponseMessage<unknown>,
    string | undefined,
    string
  > = useCallback(
    async (tt, total, channel) => {
      const pageSize = 100;
      const action = ((await dispatch(
        fetchMessageHistory({
          count: pageSize,
          channel,
          start: tt || undefined,
          stringifiedTimeToken: true
        })
      )) as unknown) as MessageHistoryRetrievedAction<unknown, unknown>;
      const response = action.payload.response;
      return {
        results: response.messages,
        pagination: `${response.startTimeToken}`,
        pagesRemain: response.messages.length === pageSize
      };
    },
    [dispatch]
  );

  const { containerRef, endRef } = usePagination(
    getNextPage,
    conversationId,
    savePaginationState,
    restorePaginationState
  );

  const restoreConversationScrollPosition = (conversationId: string) => {
    const conversationScrollPosition: number =
      conversationsScrollPositions[conversationId];
    if (containerRef.current) {
      if (conversationScrollPosition) {
        containerRef.current.scrollTo(0, conversationScrollPosition);
      } else {
        // scroll to bottom
        containerRef.current.scrollTo(0, containerRef.current.scrollHeight);
      }
    }
  };

  const memoizedRestoreConversationScrollPositionCallback = useCallback(
    restoreConversationScrollPosition,
    [conversationId]
  );

  const messages: MessageFragment[] = useSelector(
    getCurrentConversationMessages
  );

  const unknownUsers = useSelector(getUnknownUsers);
  useEffect(() => {
    // send requests for missing data
    unknownUsers.forEach(uuid => {
      if (!wasFetched(uuid)) {
        dispatch(
          fetchUserData({
            uuid
          })
        );
      }
    });
  }, [unknownUsers, dispatch]);

  const el = containerRef.current;

  // when history is pulled, scroll down to compensate
  const newHeight = el?.scrollHeight;
  useEffect(() => {
    if (height === 0 && newHeight) {
      setHeight(newHeight);
    } else if (newHeight && newHeight !== height) {
      if (el) {
        el.scrollTop += newHeight - height;
      }
      setHeight(newHeight);
    }
  }, [newHeight, height, el]);

  const scrollToBottom = useCallback(() => {
    return el && (el.scrollTop = el.scrollHeight - el.clientHeight);
  }, [el]);

  const hasReachedBottom = el
    ? el.scrollHeight - el.clientHeight === el.scrollTop
    : false;

  useEffect(() => {
    if (hasReachedBottom) {
      scrollToBottom();
    }
  }, [messages.length, hasReachedBottom, scrollToBottom]);

  useEffect(() => {
    memoizedRestoreConversationScrollPositionCallback(conversationId);
  }, [memoizedRestoreConversationScrollPositionCallback, conversationId]);

  const theme = useContext(ThemeContext);

  return (
    <ScrollView ref={containerRef} onScroll={handleScroll}>
      <FlexColumn minHeight="100%" flexGrow={1} paddingBottom="1">
        {/* This moves the list of messages to the bottom, since there's a bug with flex-end scroll */}
        <FlexColumn flex="1 1 auto"></FlexColumn>

        <div ref={endRef} />
        {messages.map(message => (
          <MessageListItem
            messageFragment={message}
            key={message.timetoken}
            avatar={
              <Avatar
                variant={AvatarVariants.ROUND}
                bg={getUniqueColor(
                  message.sender.id,
                  (theme.colors.avatars as any) as string[]
                )}
              >
                {getInitials(message.sender.name)}
              </Avatar>
            }
          />
        ))}
      </FlexColumn>
    </ScrollView>
  );
};

export { MessageList };
