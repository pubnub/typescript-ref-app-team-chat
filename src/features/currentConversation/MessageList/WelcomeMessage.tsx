import React from "react";
import { useSelector } from "react-redux";
import { MessageListItem, MessageFragment } from "../MessageListItem";
import { MessageType } from "features/messages/messageModel";
import { getLoggedInUserId } from "features/authentication/authenticationModel";
import { getUsersById } from "features/users/userModel";
import { Avatar, AvatarVariants } from "foundations/components/chat";

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
  const welcomeMessage = welcome(user.name || "");
  return (
    <MessageListItem
      messageFragment={welcomeMessage}
      key={welcomeMessage.timetoken}
      avatar={
        <Avatar variant={AvatarVariants.ROUND} bg="#DE2440">
          PN
        </Avatar>
      }
    />
  );
};

export default WelcomeMessage;
