import React from "react";
import { UserInitialsAvatar } from "foundations/components/UserInitialsAvatar";
import { MessageListItem, MessageFragment } from "../MessageListItem";
import { MessageType } from "features/messages/messageModel";

const welcomeMessage: MessageFragment = {
  sender: {
    id: "PUBNUB-BOT",
    name: "PubNub Bot"
  },
  timetoken: "15735897955841496",
  message: {
    type: MessageType.Text,
    senderId: "PUBNUB-BOT",
    text:
      "Welcome to Team Chat. 👋👋 Send a message now to start interacting with other users in the app. ⬇️"
  }
};

const WelcomeMessage = () => (
  <MessageListItem
    messageFragment={welcomeMessage}
    key={welcomeMessage.timetoken}
    avatar={
      <UserInitialsAvatar
        size={36}
        name="P N"
        userId={welcomeMessage.sender.id}
        color="#E5585E"
      />
    }
  />
);

export default WelcomeMessage;
