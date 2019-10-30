import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { EmojiInput } from "features/emoji/EmojiInput/EmojiInput";
import { EmojiSuggestion } from "features/emoji/EmojiSuggestion/EmojiSuggestion";
import { Wrapper, Container, TextArea } from "./MessageInput.style";
import { usePubNub } from "pubnub-react";
import { sendMessageAction } from "features/messages/sendMessageCommand";

const emptyMessage = "";

const autoExpand = (el: HTMLTextAreaElement) => {
  setTimeout(function() {
    el.style.cssText = "height:auto; padding:0";
    el.style.cssText = "height:" + el.scrollHeight + "px";
  }, 0);
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
  }, []);

  const changed = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && message !== "") {
      send();
      e.preventDefault();
      autoExpand(e.target as HTMLTextAreaElement);
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

export { MessageInput };
