import React, { useEffect } from "react";
import GlobalStyles from "main/styles/GlobalStyles";
import Normalize from "main/styles/Normalize";
import { ApplicationRouter } from "./Router";
import Pubnub from "pubnub";
import { createPubNubListener } from "pubnub-redux";
import { PubNubProvider } from "pubnub-react";
import { Provider } from "react-redux";
import { createAppStore } from "main/store";
import { resize } from "features/layout/actions";
import keyConfiguration from "config/pubnub-keys.json";

const pubnubConfig = Object.assign(
  {},
  {
    // Ensure that subscriptions will be retained if the network connection is lost
    restore: true,
    heartbeatInterval: 0
  },
  keyConfiguration
);
const pubnub = new Pubnub(pubnubConfig);

const store = createAppStore({
  pubnub: {
    api: pubnub
  }
});

const onResize = () => {
  store.dispatch(resize(window.innerWidth));
};

const App = () => {
  useEffect(() => {
    // Start listening for messages and events from PubNub
    pubnub.addListener(createPubNubListener(store.dispatch));
    return () => {
      pubnub.stop(); // This should be `destroy` but that's not defined in TS
    };
  }, []);

  useEffect(() => {
    window.addEventListener("resize", onResize);
    window.addEventListener("load", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("load", onResize);
    };
  });

  return (
    <Provider store={store}>
      <PubNubProvider client={pubnub}>
        <Normalize />
        <GlobalStyles />
        <ApplicationRouter />
      </PubNubProvider>
    </Provider>
  );
};

export { App };