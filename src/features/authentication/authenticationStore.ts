import { RootState } from "main/store";
import { createSelector } from "reselect";
import { AppActions } from "main/AppActions";
export const LOGGING_IN = "LOGGIN_IN";
export const LOGIN_SUCCEEDED = "LOGIN_SUCCEEDED";

export interface logingInAction {
  type: typeof LOGGING_IN;
}

export const loggingIn = (): logingInAction => ({
  type: LOGGING_IN
});

type loginSucceededPayloadType = {
  loggedInUserId?: string;
};

export interface loginSucceededAction {
  type: typeof LOGIN_SUCCEEDED;
  payload: loginSucceededPayloadType;
}

export const loginSucceeded = (
  loginSucceededPayload: loginSucceededPayloadType
): loginSucceededAction => ({
  type: LOGIN_SUCCEEDED,
  payload: loginSucceededPayload
});

export interface AuthenticationState {
  isLoggingIn: boolean;
  loggedInUserId?: string;
}

const initialState: AuthenticationState = {
  isLoggingIn: false
};

const AuthenticationStateReducer = (
  state: AuthenticationState = initialState,
  action: AppActions
): AuthenticationState => {
  switch (action.type) {
    case LOGGING_IN: {
      return { ...state, isLoggingIn: true };
    }
    case LOGIN_SUCCEEDED: {
      return {
        ...state,
        isLoggingIn: false,
        loggedInUserId: action.payload.loggedInUserId
      };
    }
    default:
      return state;
  }
};

const getAuthenticationStateSlice = (state: RootState) => state.authentication;

export const getLoggedInUserId = createSelector(
  [getAuthenticationStateSlice],
  (authenticationState: AuthenticationState): string => {
    if (authenticationState.loggedInUserId === undefined) {
      throw new Error("Requires loggedInUserId");
    }
    return authenticationState.loggedInUserId;
  }
);

export const isUserLoggedIn = createSelector(
  getAuthenticationStateSlice,
  (authenticationState: AuthenticationState): boolean => {
    return !!authenticationState.loggedInUserId;
  }
);

export const isLoggingIn = createSelector(
  getAuthenticationStateSlice,
  (authenticationState: AuthenticationState): boolean => {
    return authenticationState.isLoggingIn;
  }
);

export { AuthenticationStateReducer };
