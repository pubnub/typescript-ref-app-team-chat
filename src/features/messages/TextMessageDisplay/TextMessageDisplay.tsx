import React from "react";
import { Content } from "./TextMessageDisplay.style";
import { TextMessage } from "../messageModel";

type TextMessageProps = {
  message: TextMessage;
};

/**
 * Display a TextMessage such as it would appear in a list of messages
 */
export const TextMessageDisplay = ({ message }: TextMessageProps) => {
  return <Content>{message.text}</Content>;
};
