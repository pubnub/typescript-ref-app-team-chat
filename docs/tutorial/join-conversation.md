---
id: join-conversation
title: Join a Conversation
sidebar_label: Join Conversation
---

When you click the "+ button" on your list of joined conversations, the app displays an overlay listing all the other available conversations. 
Click a conversation to join it and start receiving the messages from that conversation.

![join a conversation](/img/join-conversations.png)

The `joinedConversations/JoinConversationDialog/JoinConversationDialog.tsx` component displays the dialog with a list of conversations that are available to join. 
The component calls the `getAllConversations` selector to fetch all conversations from the [local store](https://www.pubnub.com/docs/chat/redux/spaces?#state-shape). 
It also calls `getConversationsByUserId` selector to fetch the user’s current conversations from the [local store](https://www.pubnub.com/docs/chat/redux/memberships#state-shape) so the list doesn't display them again.

```tsx
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
 */
const JoinConversationDialog = () => {
  const conversations: ConversationDescriptionFragment[] = useSelector(
    getJoinableConversations
  );
  const views = useSelector(getViewStates);
  const currentUserId = useSelector(getLoggedInUserId);
  const dispatch = useDispatch();
  const themeContext = useContext(ThemeContext);
  const isSmall = useMediaQuery(themeContext.breakpoint.mediaQuery.small);
  return (
    <Overlay displayed={views.JoinConversation}>
      <Modal
        animate={views.JoinConversation ? "open" : "closed"}
        variants={getAnimatedModalVariants(isSmall)}
      >
        <Header>
          <Title>Join a Conversation</Title>
          <CloseButton
            onClick={() => {
              dispatch(joinConversationViewHidden());
            }}
          >
            <CrossIcon title="close" />
          </CloseButton>
        </Header>
        <ScrollView>
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
        </ScrollView>
      </Modal>
    </Overlay>
  );
};
export { JoinConversationDialog }
```

## joinSpaces Command

The `joinConversation()` method (in the `joinedConversations/joinConversationCommand.ts` file) uses the [joinSpaces](https://www.pubnub.com/docs/chat/redux/memberships#joinspaces) command from the Redux framework to add the conversation membership for the user.
It also calls [pubnub.api.subscribe](https://www.pubnub.com/docs/chat/reference/spaces#subscribe-to-channels) to subscribe to the conversation channel to start receiving messages on that channel.

```tsx
export const joinConversation = (
  userId: string,
  conversationId: string
): ThunkAction<Promise<void>> => {
  return (dispatch, getState, context) => {
    return dispatch(
      joinSpaces({
        userId: userId,
        spaces: [{ id: conversationId }]
      })
    ).then(() => {
      context.pubnub.api.subscribe({
        channels: [conversationId],
        withPresence: true
      });
      dispatch(focusOnConversation(conversationId));
    });
  };
};
```