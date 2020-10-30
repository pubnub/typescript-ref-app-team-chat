import React, { useEffect, useRef, useContext } from "react";
import { EmojiInput } from "features/emoji/EmojiInput/EmojiInput";
import { GifInput } from "features/gifs/GifInput";
import { IGif } from "@giphy/js-types";
import { EmojiSuggestion } from "features/emoji/EmojiSuggestion/EmojiSuggestion";
import { MessageType } from "../messageModel";
import { DraftTextMessage, isDraftModified } from "../draft";
import { useMediaQuery } from "foundations/hooks/useMediaQuery";
import { ThemeContext } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "../sendMessage";
import { getLoggedInUserId } from "features/authentication/authenticationModel";
import { FlexRow, StyledBox } from "foundations/components/layout";
import { Icon, Icons, Textarea } from "foundations/components/presentation";
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
    text: newText
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
  updateDraft
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
        gif
      })
    );
  };

  useEffect(() => {
    autoExpand(textareaRef.current);
  }, [textareaRef]);

  return (
    <FlexRow padding="2">
      <FlexRow flexGrow={1}>
        <Textarea
          ref={textareaRef}
          rows={1}
          value={text}
          onChange={textChanged}
          onKeyPress={handleKeyPress}
          placeholder="Type Message"
        />
      </FlexRow>

      {process.env.REACT_APP_GIPHY_API_KEY && (
        <GifInput onSelection={sendGif} />
      )}

      <StyledBox marginLeft="1">
        <EmojiInput value={text} onSelection={emojiInserted} />
        <EmojiSuggestion value={text} onSelection={emojiInserted} />
      </StyledBox>

      {touch && (
        <StyledBox
          bg="active"
          color="onPrimary"
          padding="1"
          margin={-1}
          marginLeft="1"
          borderRadius="light"
          onClick={() => isDraftModified(message) && sendDraft(message)}
        >
          <Icon icon={Icons.Send} title="Send Message" />
        </StyledBox>
      )}
    </FlexRow>
  );
};
