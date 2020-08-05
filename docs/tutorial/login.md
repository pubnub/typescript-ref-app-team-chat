---
id: login
title: Log in with a User
sidebar_label: User Login
---

While the splash screen displays, the app is selecting a user for you, and retrieving the conversations to which your user is subscribed. 

![splash screen](assets/team-chat-loading-screen.png)

## Select a User

The `authentication/login/Login.tsx` component displays a login screen and selects a random user to log into the application. 
The user is selected from the list of IDs defined in the `knownUserIds.json` file. 
These are the same users that were initially populated on your key.

```tsx
const Login = () => {
  const dispatch = useDispatch();
  const loggingIn = useSelector(isLoggingIn);
  const loggedIn = useSelector(isUserLoggedIn);
  const loginWithRandomlyPickedUser = () => {
    if (loggingIn || loggedIn) {
      return;
    }
    const userId = KnownIds[Math.floor(Math.random() * KnownIds.length)];
    dispatch(login(userId));
  };
  if (!loggedIn && !loggingIn) {
    loginWithRandomlyPickedUser();
  }
  return (
    <Wrapper>
      <Body>
        <Button onClick={loginWithRandomlyPickedUser}>
          {loggingIn ? "Connecting" : "Connect"}
        </Button>
        <PoweredByPubNub>
          <PoweredBy>Powered By</PoweredBy>
          <img alt="PubNub" src={PubNubLogo} />
        </PoweredByPubNub>
      </Body>
    </Wrapper>
  );
};
export { Login };
```

## Set the User

Once the app selects a user, the following code (in `authentication/loginCommand.ts`) calls [pubnub.api.setUUID()](https://www.pubnub.com/docs/chat/reference/users#set-a-user) to set the user’s ID on the pubnub object. 
This ID will be passed in all API calls to PubNub so that the network can identify the user who performs these operations. 

We then call the [fetchUserById()](https://www.pubnub.com/docs/chat/redux/users#fetchuserbyid) command to fetch user details from PubNub and store the logged in user in the local store.

```tsx
export const login = (userId: string): ThunkAction<Promise<void>> => {
  return (dispatch, getState, context) => {
    dispatch(loggingIn());
    // Show the login screen for a minimum amount of time
    const timer = new Promise(resolve => setTimeout(resolve, 2000));
    // Set the UUID of the current user
    context.pubnub.api.setUUID(userId);
    // Fetch user from PubNub
    const isLoginSuccessful = dispatch(fetchUserById({ userId }))
});
```

## Connect To Conversations

Once the login is successful, we call the [fetchMemberships()](https://www.pubnub.com/docs/chat/redux/memberships#fetchmemberships) command to retrieve the user’s conversations from PubNub. 
The method returns a list of space memberships that were initially populated by the `setup/populate.js` script and stores these conversations in the local store.

Next, we call [pubnub.api.subscribe()](https://www.pubnub.com/docs/chat/reference/spaces#subscribe-to-channels) to open a realtime connection with PubNub and subscribe the user to the conversation channels. 
If a client is subscribed to one or more channels, it will start receiving the messages and events published on those channels.
Subscribing with presence also subscribes you to presence channels so you can receive join and leave events, which allow you to show other users as online or offline on the app. 
(We’ll dive into detail on presence in the next part of the tutorial.)

```tsx
const isLoginSuccessful = dispatch(fetchUserById({ userId }))
  .then(() => {
    return dispatch(
      // Fetch the user’s conversations from PubNub
      fetchMemberships({
        userId,
        include: {
          spaceFields: true,
          customSpaceFields: false,
          customFields: false,
          totalCount: false
        }
      })
    );
  })
  .then(() => {
    // Subscribe to messages on the user's joined conversations.
    // The store contains a list of the user's conversations; we use
    // this list to perform the subscribe() operation.
    const conversationChannels = getConversationsByUserId(getState())[
      userId
    ].map(membership => membership.id);
    context.pubnub.api.subscribe({
      channels: conversationChannels,
      withPresence: true
    });
  });
```