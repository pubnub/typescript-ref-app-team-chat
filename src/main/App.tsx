import React, { useEffect } from "react";
import GlobalStyles from "main/styles/GlobalStyles";
import Normalize from "main/styles/Normalize";
import { ApplicationRouter } from "./Router";
import Pubnub from "pubnub";
import { createPubNubActionListener } from "pubnub-redux";
import { PubNubProvider } from "pubnub-react";
import { Provider } from "react-redux";
import store from "main/store";
import { resize } from "features/layout/actions";
import keyConfiguration from "config/pubnub-keys.json";

const onResize = () => {
  store.dispatch(resize(window.innerWidth));
};

const pubnub = new Pubnub(keyConfiguration);

const isPubNubConfigured = () =>
  keyConfiguration.publishKey.length !== 0 &&
  keyConfiguration.subscribeKey.length !== 0;

const App = () => {
  useEffect(() => {
    pubnub.addListener(createPubNubActionListener(store.dispatch));

    // TODO: Decide how we will be subscribing to channels. Currently using dummy channel to get network status events.
    pubnub.subscribe({ channels: ["team-chat"] });

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

  if (!isPubNubConfigured()) {
    return (
      <div>
        Please run <pre>npm setup</pre>
      </div>
    );
  }

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
