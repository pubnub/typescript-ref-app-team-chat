import "emoji-mart/css/emoji-mart.css";
import React, { useState, useCallback, useRef, useContext } from "react";
import useClickOutside from "foundations/hooks/useClickOutside";
import { Picker, EmojiData } from "emoji-mart";
import { FunnyEmojiIcon } from "foundations/components/icons/FunnyEmojiIcon";
import { Wrapper, Dialog, EmojiButton } from "./EmojiInput.style";
import { ThemeContext } from "styled-components";

interface EmojiInputProps {
  value: string;
  onSelection(contentWithEmoji: string): any;
}

const EmojiInput = ({ value, onSelection }: EmojiInputProps) => {
  const [showPicker, setPickerState] = useState(false);
  const picker = useRef<HTMLDivElement>(null);

  const theme = useContext(ThemeContext);

  const dismissPicker = useCallback(() => {
    setPickerState(false);
  }, [setPickerState]);

  useClickOutside([picker], dismissPicker);

  const togglePicker = () => {
    setPickerState(!showPicker);
  };

  const addEmoji = (emoji: EmojiData) => {
    if ("native" in emoji) {
      onSelection(`${value}${emoji.native}`);
      dismissPicker();
    }
  };

  return (
    <Wrapper ref={picker}>
      <Dialog>
        {showPicker && (
          <Picker
            emoji=""
            title=""
            native={true}
            onSelect={addEmoji}
            darkMode={theme.custom.dark}
            color={theme.colors.active}
          />
        )}
      </Dialog>
      <EmojiButton onClick={togglePicker}>
        <FunnyEmojiIcon title="Open emoji selector" />
      </EmojiButton>
    </Wrapper>
  );
};

export { EmojiInput };
