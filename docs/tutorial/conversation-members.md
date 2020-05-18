---
id: conversation-members
title: Show Members in Conversation
sidebar_label: Conversation Members
---

Click the membership count at the top right of a conversation, and you’ll see the conversation’s member list.
Online members are placed at the top of the list and have a green dot, while offline members are below, and greyed out.

![members list](/img/team-chat-member-list.png)

The `conversationMembers/ConversationMembers/ConversationMembers.tsx` component displays the list of members that belong to the conversations. 
It calls the [fetchMembers](https://www.pubnub.com/docs/chat/redux/members#fetchmembers) command to get the list of members in the conversation from PubNub and stores the members in the local store.

The component also calls the [fetchHereNow](https://www.pubnub.com/docs/chat/redux/presence#fetchherenow) command from the Redux framework. 
This command uses presence to indicate if members in the conversation are online. 
[Presence](https://www.pubnub.com/docs/chat/redux/presence) allows you to track the state of users in realtime. 
When users are connected to the app and present in the conversation, their "present" state is indicated with a green dot. 
If they are away from the app, their "away" state is indicated by removing the green dot and graying out their name.

```tsx
export const getCurrentConversationMembers = createSelector(
  [
    getUsersById,
    getCurrentConversationId,
    getUsersByConversationId,
    getPresenceByConversationId
  ],
  (
    users: UsersIndexedById,
    conversationId: string,
    conversationMemberships: MembershipHash,
    conversationPresence: ConversationPresence
  ): UserFragment[] => {
    let presence = conversationPresence[conversationId];
    return conversationMemberships[conversationId]
      ? conversationMemberships[conversationId].map(user => {
          return {
            ...users[user.id],
            presence: presence
              ? presence.occupants.filter(occupant => {
                  return occupant.uuid === user.id;
                }).length > 0
              : false
          };
        })
      : [];
  }
);
const orderByPresence = (members: UserFragment[]) => {
  return members.sort((userA, userB) =>
    userA.presence === userB.presence ? 0 : userA.presence ? -1 : 1
  );
};
const ConversationMembers = () => {
  const members: UserFragment[] = useSelector(getCurrentConversationMembers);
  const currentConversationId = useSelector(getCurrentConversationId);
  const dispatch = useDispatch();
  const pubnub = usePubNub();
  const views = useSelector(getViewStates);
  const themeContext = useContext(ThemeContext);
  const isSmall = useMediaQuery(themeContext.breakpoint.mediaQuery.small);
  useEffect(() => {
    if (members.length === 0) {
      dispatch(
        fetchMembers({
          spaceId: currentConversationId,
          include: {
            userFields: true,
            customUserFields: true,
            totalCount: false
          }
        })
      );
      dispatch(
        fetchHereNow({
          channels: [currentConversationId]
        })
      );
    }
  }, [members, currentConversationId, pubnub, dispatch]);
  return (
    <Wrapper
      animate={views.ConversationMembers ? "open" : "closed"}
      variants={getAnimatedWrapperVariants(isSmall)}
    >
      <Header>
        <Title>
          <BackIconWrapper
            onClick={() => {
              dispatch(conversationMembersViewHidden());
            }}
          >
            <BackIcon title="back" />
          </BackIconWrapper>
          Members
        </Title>
        <CloseIcon
          onClick={() => {
            dispatch(conversationMembersViewHidden());
          }}
        >
          <CrossIcon title="close members list" />
        </CloseIcon>
      </Header>
      <ScrollableView>
        {orderByPresence(members).map(user => (
          <MemberDescription user={user} key={user.id} />
        ))}
      </ScrollableView>
    </Wrapper>
  );
};
export { ConversationMembers };
```

## Member Details

The `MemberDescription` method (in `conversationMembers/MemberDescription/MemberDescription.tsx`) displays the name, profile image, and title of each member.

The member list also displays user presence to indicate if users are online or offline within a conversation. 
The app fetches the presence state from the `user.presence` flag in the [local](https://www.pubnub.com/docs/chat/redux/presence#state-shape) store. 
The next section provides more details on presence events.

```tsx
const MemberDescription = ({ user }: MemberDescriptionProps) => {
  return (
    <Wrapper>
      <Avatar>
        <UserInitialsAvatar
          size={36}
          name={user.name}
          userId={user.id}
          muted={!user.presence}
        />
      </Avatar>
      <About>
        <UserName muted={!user.presence}>
          {user.name}{" "}
          {user.presence && <PresenceDot presence={user.presence} />}
        </UserName>
        <UserTitle muted={!user.presence}>{user.custom.title}</UserTitle>
      </About>
    </Wrapper>
  );
};
export { MemberDescription };
```

## Presence Events

The `features/memberPresence/memberPresenceModel.ts` file calls [createPresenceReducer()](https://www.pubnub.com/docs/chat/redux/presence#createpresencereducer) reducer from the Redux framework. 
This automatically updates the presence state for users in the local store. 
The reducer responds to actions that are dispatched when presence join, leave, timeout or interval events are received by the app.

```tsx
/**
 * Create a reducer to presence information for conversation members
 */
const MemberPresenceReducer = createPresenceReducer();
export { MemberPresenceReducer };
```

## Presence Occupancy
The `currentConversation/ConversationOccupancy/ConversationOccupancy.tsx` component uses `joinedCount` and `presentCount` to show counts of all members in the conversation and the count of members who are currently online.

The component uses the `getUsersByConversationId` selector to get all members from the [local store](https://www.pubnub.com/docs/chat/redux/presence#state-shape) and `getPresenceByConversationId` to get online users from the [local store](https://www.pubnub.com/docs/chat/redux/presence#state-shape).

```tsx
export interface ConversationOccupancyFragment {
  joinedCount: number;
  presentCount: number;
}
export const getCurrentConversationOccupancy = createSelector(
  [
    getCurrentConversationId,
    getUsersByConversationId,
    getPresenceByConversationId
  ],
  (
    currentConversationId: string,
    conversationMemberships: MembershipHash,
    conversationPresence: ConversationPresence
  ): ConversationOccupancyFragment => {
    const members = conversationMemberships[currentConversationId];
    const presence = conversationPresence[currentConversationId];
    return {
      joinedCount: members ? members.length : 0,
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
    <Wrapper
      highlighted={isConversationMembersLayoutVisible}
      onClick={() => {
        isConversationMembersLayoutVisible
          ? dispatch(conversationMembersViewHidden())
          : dispatch(conversationMembersViewDisplayed());
      }}
    >
      <OccupancyNumber>
        <em>{presentCount}</em> | {joinedCount}
      </OccupancyNumber>
      <IconWrapper>
        <PeopleGroupIcon
          title={
            isConversationMembersLayoutVisible
              ? "Hide members list"
              : "Show conversation members"
          }
          active={isConversationMembersLayoutVisible}
        />
      </IconWrapper>
    </Wrapper>
  );
};

export { ConversationOccupancy };
```
