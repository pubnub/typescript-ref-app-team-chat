import React from "react";
import { useSelector } from "react-redux";
import { UserInitialsAvatar } from "foundations/components/UserInitialsAvatar";
import { MessageListItem, MessageFragment } from "../MessageListItem";
import { MessageType } from "features/messages/messageModel";
import { getLoggedInUserId } from "features/authentication/authenticationModel";
import { getUsersById } from "features/users/userModel";

const capitalize = (string: string): string => {
  return string
    .split(" ")
    .map(token => token.charAt(0).toUpperCase() + token.slice(1))
    .join(" ");
};

const welcome = (name: string): MessageFragment => ({
  sender: {
    id: "PUBNUB-BOT",
    name: "PubNub Bot"
  },
  timetoken: "15735897955841496",
  message: {
    type: MessageType.Text,
    senderId: "PUBNUB-BOT",
    text: `Welcome to Team Chat. 👋👋 \nWe logged you in as ${capitalize(
      name
    )}. \nSend a message now to start interacting with other users in the app. ⬇️`
  }
});

const WelcomeMessage = () => {
  const userId = useSelector(getLoggedInUserId);
  const usersById = useSelector(getUsersById);
  const user = usersById[userId];
  const welcomeMessage = welcome(user.name);
  return (
    <MessageListItem
      messageFragment={welcomeMessage}
      key={welcomeMessage.timetoken}
      avatar={
        <UserInitialsAvatar
          size={36}
          name="P N"
          userId={welcomeMessage.sender.id}
          color="#DE2440"
        />
      }
    />
  );
};

export default WelcomeMessage;
