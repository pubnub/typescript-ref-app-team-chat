---
id: user-details
title: Show User Details
sidebar_label: Show User Details
---

In the top left section of the UI, the app shows details for the current user. 
These include an avatar image, the user’s name and title, and the user’s network status.

![user details](assets/team-chat-user-details.png)

The `currentUser/MyUserDetails.tsx` component displays the details for the user like name, title and profileUrl. 
The component calls `getUsersById()` selector to retrieve these user details from the [local store](https://www.pubnub.com/docs/chat/redux/users#state-shape).

The component also calls the `NetworkStatus` component to show the user’s connection status. 
The next section has more details on network status.

```tsx
export interface MyUserDetailsFragment {
  name: string;
  profileUrl: string;
  custom: {
    title: string;
  };
}
const MyUserDetails = () => {
  const userId = useSelector(getLoggedInUserId);
  const usersById = useSelector(getUsersById);
  const user = usersById[userId];
  // We must always have a user; change this to a development time error check
  if (user === undefined) {
    return <div>Loading...</div>;
  }
  return (
    <Wrapper>
      <Avatar>
        <NetworkStatus />
        <UserInitialsAvatar size={56} name={user.name} uuid={user.id} />
      </Avatar>
      <About>
        <UserName>{user.name}</UserName>
        <UserTitle>{user.custom.title}</UserTitle>
      </About>
    </Wrapper>
  );
};
```

## Get Network Status

The `currentUser/NetworkStatus/NetworkStatus.tsx` component displays a green or gray dot to indicate if the user is connected to the network. 
The component calls the[`state.networkStatus.isConnected](https://www.pubnub.com/docs/chat/redux/network-status#state-shape) selector to get this connection status from the store.

```tsx
const NetworkStatus = () => {
  let isConnected: boolean = useSelector(
    (state: AppState) => state.networkStatus.isConnected
  );
  return (
    <Wrapper>
      <PresenceIndicatorIcon fill={isConnected ? "#B8E986" : "#E9EEF4"} />
    </Wrapper>
  );
};
```