---
id: joined-conversations
title: Show Joined Conversations
sidebar_label: Joined Conversations
---

Below your user info, you’ll find your list of conversations. 
The Introductions conversation is automatically selected when the app launches.

You can join other conversations with the + button, and leave existing conversations with the Exit button. 
These features are covered in the [join conversation](/docs/tutorial/join-conversation) and [leave conversation](/docs/tutorial/leave-conversation) sections of the tutorial.

![conversations list](/img/team-chat-my-conversations.png)

The `joinedConversations/MyConversations/MyConversations.tsx` component gets the user’s list of conversations and allows the user to select a conversation. 
When the app loads, it selects the Introduction conversation by default.

```tsx
export interface ConversationFragment {
  id: string;
  name: string;
}
const MyConversations = () => {
  const currentUserId = useSelector(getLoggedInUserId);
  const conversationsById = useSelector(getConversationsById);
  const conversations: ConversationFragment[] = useSelector(
    getJoinedConversations
  );
  const currentConversationId: string = useSelector(getCurrentConversationId);
  if (conversationsById === undefined) {
    return <div>Loading...</div>;
  }
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
            selected={conversation.id === currentConversationId}
            key={conversation.id}
            onClick={() => {
              dispatch(focusOnConversation(conversation.id));
              dispatch(setLayoutDefault());
            }}
          ></ConversationItem>
        ))}
      </ConversationList>
    </Wrapper>
  );
};
```

## Get Conversations for User

The `MyConversations` component calls the `getConversationsByUserId()` selector to get the user’s conversations from the [local store](https://www.pubnub.com/docs/chat/redux/memberships). This selector returns the list of conversations, along with properties like id and name, to be displayed in the UI.

```tsx
export const getJoinedConversations = createSelector(
  [getConversationsById, getLoggedInUserId, getConversationsByUserId],
  (
    conversations: ConversationsIndexedById,
    userId: string,
    userConversations: MembershipHash
  ): ConversationFragment[] => {
    return userConversations[userId]
      ? userConversations[userId].map(conversation => {
          return {
            id: conversation.id,
            name: conversations[conversation.id].name
          };
        })
      : [];
  }
);
```