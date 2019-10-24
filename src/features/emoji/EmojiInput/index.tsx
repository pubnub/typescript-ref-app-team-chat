import "emoji-mart/css/emoji-mart.css";
import React, { useState, useCallback, useRef } from "react";
import useClickOutside from "hooks/useClickOutside";
import { Picker, EmojiData } from "emoji-mart";
import FunnyEmoji from "components/icons/FunnyEmoji";
import { Dialog, EmojiButton } from "./style";

interface EmojiInputProps {
  value: string;
  onSelection(contentWithEmoji: string): any;
}

const EmojiInput = ({ value, onSelection }: EmojiInputProps) => {
  const [showPicker, setPickerState] = useState(false);
  const picker = useRef<HTMLDivElement>(null);

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
    <div ref={picker}>
      <Dialog>
        {showPicker && <Picker emoji="" title="" onSelect={addEmoji} />}
      </Dialog>
      <EmojiButton onClick={togglePicker}>
        <FunnyEmoji />
      </EmojiButton>
    </div>
  );
};

export default EmojiInput;
