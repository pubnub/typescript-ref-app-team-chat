import { ThunkAction } from "main/storeTypes";
import { loggingIn, loginSucceeded } from "./authenticationModel";
import { fetchUserData, fetchMemberships } from "pubnub-redux";
import { getConversationsByUserId } from "features/joinedConversations/joinedConversationModel";

export const login = (uuid: string): ThunkAction<Promise<void>> => {
  return (dispatch, getState, context) => {
    dispatch(loggingIn());

    // Show the login screen for a minimum amount of time as a splash screen
    //const timer = new Promise(resolve => setTimeout(resolve, 2000));

    // Set the UUID of the current user to ensure that presence works correctly
    context.pubnub.api.setUUID(uuid);

    // ensure that the current user exists while also populating the store
    // with their information.
    const isLoginSuccessful = dispatch(fetchUserData({ uuid }))
      .then(() => {
        // Subscribe to the user's channel to receive events involving this user
        context.pubnub.api.subscribe({
          channels: [uuid],
          withPresence: true,
        });
      })
      .then(() => {
        return dispatch(
          // Load the conversations that this user has joined
          fetchMemberships({
            uuid: uuid,
            include: {
              channelFields: true,
              customChannelFields: false,
              customFields: false,
              totalCount: false,
            },
          })
        );
      })
      .then(() => {
        // Subscribe to messages on the user's joined conversations
        const conversationChannels = getConversationsByUserId(getState())[
          uuid
        ].map((membership) => membership.id);

        context.pubnub.api.subscribe({
          channels: conversationChannels,
          withPresence: true,
        });
      });

    return Promise.all([isLoginSuccessful]).then(() => {
      dispatch(loginSucceeded({ loggedInUserId: uuid }));
    });
  };
};
