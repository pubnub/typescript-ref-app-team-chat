import React from "react";
import { UserInitialsAvatar } from "foundations/components/UserInitialsAvatar";
import { Message } from "../Message";

const welcomeMessage = {
  sender: {
    id: "PUBNUB-BOT",
    name: "PubNub Bot"
  },
  timetoken: "15735897955841496",
  message: {
    content: {
      body:
        "Welcome to Team Chat. 👋👋 Send a message now to start interacting with other users in the app. ⬇️"
    }
  }
};

const WelcomeMessage = () => (
  <Message
    message={welcomeMessage}
    key={welcomeMessage.timetoken}
    avatar={
      <UserInitialsAvatar
        size={36}
        name="P N"
        uuid={welcomeMessage.sender.id}
        color="#E5585E"
      />
    }
  />
);

export default WelcomeMessage;
