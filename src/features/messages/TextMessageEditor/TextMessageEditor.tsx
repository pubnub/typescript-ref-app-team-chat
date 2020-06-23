import React, { useEffect, useRef, useContext } from "react";
import { EmojiInput } from "features/emoji/EmojiInput/EmojiInput";
import { GifInput } from "features/gifs/GifInput";
import { IGif } from "@giphy/js-types";
import { EmojiSuggestion } from "features/emoji/EmojiSuggestion/EmojiSuggestion";
import {
  Wrapper,
  Container,
  TextArea,
  SendButton,
  Editor,
  EditorActions,
} from "./TextMessageEditor.style";
import { MessageType } from "../messageModel";
import { DraftTextMessage, isDraftModified } from "../draft";
import { SendIcon } from "foundations/components/icons/SendIcon";
import { useMediaQuery } from "foundations/hooks/useMediaQuery";
import { ThemeContext } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "../sendMessage";
import { getLoggedInUserId } from "features/authentication/authenticationModel";

/**
 * Expand the height of the input box as multiple lines of text are entered.
 */
const autoExpand = (el: HTMLTextAreaElement) => {
  setTimeout(function () {
    el.style.cssText = "height:auto; padding:0";
    el.style.cssText = "height:" + el.scrollHeight + "px";
  }, 0);
};

/**
 * Update the text field on a draft text message by returning a new object if
 * the new text is different than the text in the old object.
 * This is the proper way to do updates to avoid unnecessary rerendering.
 */
const newTextDraft = (
  draft: DraftTextMessage,
  newText: string
): DraftTextMessage => {
  if (draft.text === newText) {
    return draft;
  }
  return {
    type: MessageType.Text,
    senderId: draft.senderId,
    text: newText,
  };
};

type TextMessageEditorProps = {
  message: DraftTextMessage;
  sendDraft: (message: DraftTextMessage) => void;
  updateDraft: (message: DraftTextMessage) => void;
};

/**
 * Edit a draft Text Message
 */
export const TextMessageEditor = ({
  message,
  sendDraft,
  updateDraft,
}: TextMessageEditorProps) => {
  const dispatch = useDispatch();
  const userId = useSelector(getLoggedInUserId);
  const theme = useContext(ThemeContext);
  const touch = useMediaQuery(theme.mediaQueries.touch);
  const text = message.text;
  const textareaRef = useRef<HTMLTextAreaElement>(
    document.createElement("textarea")
  );

  const textChanged = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateDraft(newTextDraft(message, e.target.value));
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !(e.shiftKey || touch)) {
      const draft = newTextDraft(message, text);
      if (isDraftModified(draft)) {
        sendDraft(draft);
      }
      e.preventDefault();
    }
    autoExpand(e.target as HTMLTextAreaElement);
  };

  const emojiInserted = (messageWithEmoji: string) => {
    updateDraft(newTextDraft(message, messageWithEmoji));
    textareaRef.current.focus();
  };

  // immediately send gifs (without creating a draft message)
  const sendGif = (gif: IGif, query: string) => {
    dispatch(
      sendMessage({
        type: MessageType.Giphy,
        senderId: userId,
        query,
        gif,
      })
    );
  };

  useEffect(() => {
    autoExpand(textareaRef.current);
  }, [textareaRef]);

  return (
    <Wrapper>
      <EmojiSuggestion value={text} onSelection={emojiInserted} />
      <Container>
        <Editor>
          <TextArea
            ref={textareaRef}
            rows={1}
            value={text}
            onChange={textChanged}
            onKeyPress={handleKeyPress}
            placeholder="Type Message"
          />
        </Editor>
        <EditorActions>
          {process.env.REACT_APP_GIPHY_API_KEY && (
            <GifInput onSelection={sendGif} />
          )}
          <EmojiInput value={text} onSelection={emojiInserted} />
          <SendButton
            onClick={() => isDraftModified(message) && sendDraft(message)}
          >
            <SendIcon title="Send Message" />
          </SendButton>
        </EditorActions>
      </Container>
    </Wrapper>
  );
};
