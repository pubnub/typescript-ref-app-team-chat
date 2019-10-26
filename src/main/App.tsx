import React, { useEffect } from "react";
import GlobalStyles from "main/styles/GlobalStyles";
import Normalize from "main/styles/Normalize";
import Pubnub from "pubnub";
import { Router } from "@reach/router";
import { LoginRoute } from "routes/login";
import { ChatRoute } from "routes/chat";
import { Wrapper } from "./style";
import { createPubNubActionListener } from "pubnub-redux";
import { PubNubProvider } from "pubnub-react";
import { Provider } from "react-redux";
import store from "main/store";
import { resize } from "features/layout/actions";

const onResize = () => {
  store.dispatch(resize(window.innerWidth));
};

let pubnub = new Pubnub({
  publishKey: "pub-c-f9b0d980-af95-461e-ac87-012d62f92228",
  subscribeKey: "sub-c-a3470ba0-b7a3-11e9-aec0-fa920b0289f3"
});

pubnub.addListener(createPubNubActionListener(store.dispatch));

// TODO: Decide how we will be subscribing to channels. Currently using dummy channel to get network status events.
pubnub.subscribe({ channels: ["team-chat"] });

const App: React.FC = () => {
  useEffect(() => {
    return () => {
      pubnub.stop(); // This should be `destroy` but that's not defined in TS
    };
  }, []);

  useEffect(() => {
    window.addEventListener("resize", onResize);
    window.addEventListener("load", onResize);
  });

  return (
    <Provider store={store}>
      <PubNubProvider client={pubnub}>
        <Normalize />
        <GlobalStyles />
        <Router component={Wrapper}>
          <LoginRoute path="/login" />
          <ChatRoute path="/" />
        </Router>
      </PubNubProvider>
    </Provider>
  );
};

export { App };
