import React, { useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { appTheme } from "main/Theme";
import GlobalStyles from "main/styles/GlobalStyles";
import Normalize from "main/styles/Normalize";

const App = storyFn => {
  return (
    <ThemeProvider theme={appTheme}>
      <Normalize />
      <GlobalStyles />
      {storyFn()}
    </ThemeProvider>
  );
};

export const decorators = [App];

export const parameters = {
  options: {
    storySort: {
      order: [
        "About",
        "Chat Components",
        "Basic Presentation",
        "Basic Layout",
        "Style Utilities"
      ]
    }
  }
};

/* Uncomment in case Redux state is ever needed

import { Provider, useSelector } from "react-redux";
import Pubnub from "pubnub";
import { PubNubProvider } from "pubnub-react";
import { createPubNubListener } from "pubnub-redux";
import keyConfiguration from "config/pubnub-keys.json";
import KnownIds from "config/knownUserIds.json";
import { createAppStore } from "main/store";
import { isUserLoggedIn } from "features/authentication/authenticationModel";
import { useDispatch } from "main/useDispatch";
import { login } from "features/authentication/loginCommand";
import { createTypingIndicatorsListener } from "features/typingIndicator/typingIndicatorModel";


const AppWithPubnub = props => {
  const pubnub = new Pubnub(keyConfiguration);
  const store = createAppStore({
    pubnub: {
      api: pubnub
    }
  });

  useEffect(() => {
    pubnub.addListener(createPubNubListener(store.dispatch));
    pubnub.addListener(createTypingIndicatorsListener(store.dispatch));
  }, []);

  useEffect(() => {
    window.addEventListener("beforeunload", pubnub.unsubscribeAll);
  }, []);

  return (
    <ThemeProvider theme={appTheme}>
      <Provider store={store}>
        <PubNubProvider client={pubnub}>
          <Normalize />
          <GlobalStyles />
          {props.children}
        </PubNubProvider>
      </Provider>
    </ThemeProvider>
  );
};

const Authorized = props => {
  if (useSelector(isUserLoggedIn)) return props.children;

  const dispatch = useDispatch();
  const randomUserId = KnownIds[Math.floor(Math.random() * KnownIds.length)];
  dispatch(login(randomUserId));
  return null;
};

const AppWithPubnubDecorator = storyFn => (
  <App>
    <Authorized>{storyFn()}</Authorized>
  </App>
);

addDecorator(AppWithPubnubDecorator);

*/
