import React from "react";

import { Wrapper } from "./style";
import { Login } from "features/authentication/Login/Login";
import { ChatUI } from "features/chat/Chat";
import { isUserLoggedIn } from "features/authentication/authenticationModel";
import { useSelector } from "react-redux";
import keyConfiguration from "config/pubnub-keys";
import isPubNubConfigured from "foundations/utilities/isPubNubConfigured";
import { FlexColumn } from "foundations/components/layout";

const ErrorBannerComponent = (
  <FlexColumn
    bg="error"
    color="onPrimary"
    padding="3"
    justifyContent="center"
    alignItems="center"
  >
    <p>Please run</p>
    <pre>npm setup</pre>
  </FlexColumn>
);

export const ApplicationRouter = () => {
  const loggedIn = useSelector(isUserLoggedIn);
  const view = loggedIn ? <ChatUI /> : <Login />;
  return (
    <Wrapper>
      {!isPubNubConfigured(keyConfiguration) && ErrorBannerComponent}
      {view}
    </Wrapper>
  );
};
