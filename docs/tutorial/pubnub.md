---
id: pubnub
title: Add PubNub to your App
sidebar_label: Add PubNub Keys
---

When the app first loads, it runs the `main/App.tsx` component to initialize the [pubnub client](https://www.pubnub.com/docs/chat/reference/users#initialize-pubnub) with your publish and subscribe keys that are configured in the `.env` file.

The component also calls [pubnub.addListener()](https://www.pubnub.com/docs/chat/redux/using#register-listeners) to register all listeners at once (message listener, presence listener, and so on). 
The listener triggers events when the app receives messages, and automatically dispatches reducers to update the local store.

```tsx
import Pubnub from "pubnub";
import { createPubNubListener } from "pubnub-redux";
import { PubNubProvider } from "pubnub-react";
import keyConfiguration from "config/pubnub-keys";
const pubnubConfig = Object.assign(
  {},{
    restore: true,
    heartbeatInterval: 0
  },
  keyConfiguration
);
const pubnub = new Pubnub(pubnubConfig);
const App = () => {
  useEffect(() => {
    pubnub.addListener(createPubNubListener(store.dispatch));
    return leaveApplication;
  }, []);
  
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
```