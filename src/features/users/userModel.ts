import { AppState } from "main/storeTypes";
import { createSelector } from "reselect";
import { createUserDataReducer, UserData } from "pubnub-redux";
import { RequireFields } from "foundations/utilities/requireFields";

/**
 * This application uses a custom field called title, which must be defined for
 * every user
 */
type CustomUserFields = {
  title: string;
};

/**
 * Define which fields of PubNub's User object is accessed by this application.
 * Fields not specified in this definition are not used.
 * We use this oportunity to indicate that some fields which are optional in
 * the PubNub object definition are NOT optional in this application.
 */
export type User = RequireFields<
  UserData<CustomUserFields>,
  "id" | "name" | "profileUrl" | "custom"
>;

/**
 * Describes a way to lookup a user from a userId
 */
export type UsersIndexedById = { [id: string]: User };

/**
 * create a reducer which holds all known user objects in a normalized form
 */
const UsersReducer = createUserDataReducer<User>();
export { UsersReducer };

/**
 * Slice selector is used internally to access the state of the reducer
 */
const getUsersSlice = (state: AppState) => state.users;

/**
 * Returns an index which can be used to find user objects
 */
export const getUsersById = createSelector(
  [getUsersSlice],
  (users): UsersIndexedById => {
    return users.byId as UsersIndexedById;
  }
);
