import { ThunkAction } from "main/storeTypes";
import { loggingIn, loginSucceeded } from "./authenticationStore";
import { fetchUserById, fetchMemberships } from "pubnub-redux";
import { getConversationsByUserId } from "features/joinedConversations/joinedConversationStore";

export const login = (userId: string): ThunkAction<Promise<void>> => {
  return (dispatch, getState, context) => {
    dispatch(loggingIn());

    // Show the login screen for a minimum amount of time as a splash screen
    const timer = new Promise(resolve => setTimeout(resolve, 2000));

    // Set the UUID of the current user to ensure that presence works correctly
    context.pubnub.api.setUUID(userId);

    // ensure that the current user exists while also populating the store
    // with their information.
    const isLoginSuccessful = dispatch(fetchUserById({ userId }))
      .then(() => {
        // Subscribe to the user's channel to receive events involving this user
        context.pubnub.api.subscribe({
          channels: [userId]
        });
      })
      .then(() => {
        return dispatch(
          // Load the conversations that this user has joined
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
        // Subscribe to messages on the user's joined conversations
        const conversationChannels = getConversationsByUserId(getState())[
          userId
        ].map(membership => membership.id);

        context.pubnub.api.subscribe({
          channels: conversationChannels
        });
      });

    return Promise.all([timer, isLoginSuccessful]).then(() => {
      dispatch(loginSucceeded({ loggedInUserId: userId }));
    });
  };
};
