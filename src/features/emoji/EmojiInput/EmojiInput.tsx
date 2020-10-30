import "emoji-mart/css/emoji-mart.css";
import React, { useContext } from "react";
import { Picker as EmojiPicker, EmojiData } from "emoji-mart";
import { ThemeContext } from "styled-components";
import { Icons } from "foundations/components/presentation";
import { Dropdown } from "foundations/components/layout";

interface EmojiInputProps {
  value: string;
  onSelection(contentWithEmoji: string): void;
}

const EmojiInput = ({ value, onSelection }: EmojiInputProps) => {
  const theme = useContext(ThemeContext);

  return (
    <Dropdown
      icon={Icons.Emoji}
      right="0"
      bottom="0"
      title="Open emoji selector"
      render={dismiss => {
        const addEmoji = (emoji: EmojiData) => {
          if ("native" in emoji) {
            onSelection(`${value}${emoji.native}`);
            dismiss();
          }
        };
        return (
          <EmojiPicker
            emoji=""
            title=""
            native={true}
            onSelect={addEmoji}
            darkMode={theme.custom.dark}
            color={theme.colors.active}
          />
        );
      }}
    />
  );
};

export { EmojiInput };
