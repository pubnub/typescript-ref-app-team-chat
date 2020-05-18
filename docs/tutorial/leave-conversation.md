---
id: leave-conversation
title: Leave a Conversation
sidebar_label: Leave Conversation
---

Hover over a conversation in your list of joined conversations to display a leave icon. 
Click it, and you’ll leave the conversation. 
You'll no longer receiving messages sent to that conversation.

![leave a conversation](/img/leave-conversation.png)

The `joinedConversations/MyConversations/MyConversations.tsx` component displays the icon next to the user’s conversations to leave a conversation. 
The next section goes over the method that is called. 
Note that the app doesn’t allow users to leave the “Introductions” conversation, which is set as default.

```tsx
import { leaveConversation } from "../leaveConversationCommand";
const MyConversations = () => {
  const currentUserId = useSelector(getLoggedInUserId);
  const conversationsById = useSelector(getConversationsById);
  const conversations: ConversationFragment[] = useSelector(
    getJoinedConversations
  );
  const currentConversationId: string = useSelector(getCurrentConversationId);
  const members: UserFragment[] = useSelector(getCurrentConversationMembers);
  const dispatch = useDispatch();
  const openOverlay = () => {
    dispatch(fetchSpaces());
    dispatch(joinConversationViewDisplayed());
  };
  return (
    <Wrapper>
      <Title>
        Conversations
      </Title>
      <ConversationList>
        {conversations.map(conversation => (
          <ConversationItem
            id={conversation.id}
            name={conversation.name}
            onLeave={() => {
              dispatch(leaveConversation(currentUserId, conversation.id));
            }}
          ></ConversationItem>
        ))}
      </ConversationList>
    </Wrapper>
  );
};
export { MyConversations };
```

## leaveSpaces Command

The `leaveConversation()` method (in `joinedConversations/leaveConversationCommand.ts`) uses the [leaveSpaces](https://www.pubnub.com/docs/chat/redux/memberships#leavespaces) command from the Redux framework to remove the conversation membership for the user. 
It also calls [pubnub.api.unsubscribe](https://www.pubnub.com/docs/chat/reference/disconnect#disconnecting-from-pubnub) to unsubscribe the user from the conversation channel so they stop receiving messages on that channel.

```tsx
/**
 * Leave the current conversation and select the default conversation
 * as the current conversation.  (The application expects that some
 * conversation will always be current.)
 */
export const leaveConversation = (
  userId: string,
  conversationId: string
): ThunkAction<Promise<void>> => {
  return (dispatch, getState, context) => {
    if (conversationId === DEFAULT_CONVERSATION) {
      return Promise.resolve();
    }
    return dispatch(
      leaveSpaces({
        userId: userId,
        spaces: [{ id: conversationId }]
      })
    ).then(() => {
      context.pubnub.api.unsubscribe({
        channels: [conversationId]
      });
      dispatch(focusOnConversation(DEFAULT_CONVERSATION));
    });
  };
};
```