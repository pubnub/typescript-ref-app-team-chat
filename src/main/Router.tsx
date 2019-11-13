import React from "react";

import { Wrapper } from "./style";
import { Login } from "features/authentication/Login/Login";
import { ChatUI } from "features/chat/Chat";
import { isUserLoggedIn } from "features/authentication/authenticationModel";
import { useSelector } from "react-redux";
import keyConfiguration from "config/pubnub-keys.json";
import isPubNubConfigured from "foundations/utilities/isPubNubConfigured";
import { ErrorBanner } from "main/styles/ErrorBanner.style";

const ErrorBannerComponent = (
  <ErrorBanner>
    <div>
      Please run <pre>npm setup</pre>
    </div>
  </ErrorBanner>
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
