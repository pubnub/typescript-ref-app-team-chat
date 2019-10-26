import { ActionThunk } from "main/store";
import { navigate } from "@reach/router";
import { loggingIn, loginSucceeded } from "./authenticationStore";

export const login = (userId: string): ActionThunk => {
  return (dispatch, getState) => {
    return new Promise(() => {
      dispatch(loggingIn());

      setTimeout(() => {
        dispatch(loginSucceeded({ loggedInUserId: userId }));
        navigate("/");
      }, 1000);
    });
  };
};
