import exampleGiphy from "./exampleGiphy";

export const link = {
  url: "https://pubnub.com",
  provider: {
    name: "PubNub",
    url: "https://pubnub.com"
  },
  title:
    "Realtime Communication APIs for Chat, Notifications, Geolocation, and Collaboration | PubNub",
  description:
    "Leverage the power of hosted realtime APIs to build and augment connected experiences including in-app chat, mapping, device control and more on a massive scale.",
  image:
    "https://images.ctfassets.net/3prze68gbwl1/3roUbsKJAysxW6gUUxczrY/89eeaa8940ccf2ed10b348adaca99b64/pubnub-powered-apps.png",
  icon: "https://www.pubnub.com/images/favicon.png"
} as const;

export const image = {
  source:
    "https://images.ctfassets.net/3prze68gbwl1/7Mtx0mNP5byeuqrTr8gBCS/0d4ca318dc54edc7a17cfa9bf9987ecd/pubnub-chat-sdk-messaging-api.png"
};

export const gif = {
  title: "Giphy Logo",
  gif: exampleGiphy
};
