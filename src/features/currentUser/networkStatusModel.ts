import { createNetworkStatusReducer } from "pubnub-redux";

/**
 * Create a reducer to hold the current online status of the user
 */

const NetworkStatusReducer = createNetworkStatusReducer(false);
export { NetworkStatusReducer };
