import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import EmojiInput from "features/emoji/EmojiInput";
import EmojiSuggestion from "features/emoji/EmojiSuggestion";
import { Wrapper, Container, TextArea } from "./style";
import { usePubNub } from "pubnub-react";
import { sendMessageAction } from "features/messages/sendMessageAction";

const emptyMessage = "";

const autoExpand = (field: HTMLTextAreaElement) => {
  // Reset field height
  field.style.height = "inherit";

  // Get the computed styles for the element
  const computed = window.getComputedStyle(field);

  // Calculate the height
  const height =
    parseInt(computed.getPropertyValue("border-top-width"), 10) +
    parseInt(computed.getPropertyValue("padding-top"), 10) +
    field.scrollHeight +
    parseInt(computed.getPropertyValue("padding-bottom"), 10) +
    parseInt(computed.getPropertyValue("border-bottom-width"), 10);

  field.style.height = height + "px";
};

type MessageFragment<message = string> = [message, (setTo: message) => void];

const MessageInput = () => {
  const pubnub = usePubNub();
  const [message, setMessage]: MessageFragment = useState(emptyMessage);
  const dispatch = useDispatch();
  useEffect(() => {
    document.addEventListener(
      "input",
      function(event) {
        const target = event.target as HTMLElement;
        if (
          target &&
          target.tagName &&
          target.tagName.toLowerCase() !== "textarea"
        )
          return;
        autoExpand(event.target as HTMLTextAreaElement);
      },
      false
    );
  });

  const changed = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && message !== "") {
      send();
      e.preventDefault();
    }
  };

  const send = () => {
    dispatch(
      sendMessageAction(pubnub, {
        type: "text",
        body: message.trim()
      })
    );
    setMessage(emptyMessage);
  };

  return (
    <Wrapper>
      <EmojiSuggestion
        value={message}
        onSelection={messageWithEmoji => {
          setMessage(messageWithEmoji);
        }}
      />
      <Container>
        <TextArea
          rows={1}
          value={message}
          onChange={changed}
          onKeyPress={handleKeyPress}
          placeholder="Type Message"
        />
        <EmojiInput
          value={message}
          onSelection={messageWithEmoji => {
            setMessage(messageWithEmoji);
          }}
        />
      </Container>
    </Wrapper>
  );
};

export default MessageInput;
