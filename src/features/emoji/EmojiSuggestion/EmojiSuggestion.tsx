import "emoji-mart/css/emoji-mart.css";
import React, { useRef, useContext } from "react";
import useClickOutside from "foundations/hooks/useClickOutside";
import { emojiIndex, EmojiData } from "emoji-mart";
import { ThemeContext } from "styled-components";
import { useMediaQuery } from "foundations/hooks/useMediaQuery";
import useHover from "foundations/hooks/useHover";
import {
  Label,
  LabelSizes,
  LabelVariants,
  Button
} from "foundations/components/presentation";
import {
  FlexColumn,
  StyledBox,
  ScrollView
} from "foundations/components/layout";

type EmojiInputProps = {
  value: string;
  onSelection(contentWithEmoji: string): any;
};

const getEmojisFromEmojiSearchTerm = (emojiSearchTerm: string) =>
  (emojiIndex.search(emojiSearchTerm) as any) as EmojiData[];

const getEmojiSearchTerm = (content: string) => {
  // I don't think this is cross browser - haven't for a better way to detect newlines yet
  let search = "";
  const colons = content.match(/:([a-z_]+)(:)?/);
  if (colons) {
    if (colons[2] !== undefined) {
      // closing colon is present
      const match = emojiIndex.emojis[colons[1]];
      if (match && "native" in match) {
        content = content.replace(colons[0], match.native);
        search = "";
      } else {
        const results = (emojiIndex.search(colons[1]) as any) as EmojiData[];
        if (results[0] && "native" in results[0]) {
          content = content.replace(colons[0], (results[0] as any).native);
        }
        search = "";
      }
    } else if (colons[1].length > 1) {
      // colons aren't closed, use the search
      search = colons[1];
    } else if (colons[1]) {
      search = "";
    }
  }
  return search;
};

const EmojiSuggestion = ({ value, onSelection }: EmojiInputProps) => {
  const suggestions = useRef<HTMLDivElement>(null);
  const theme = useContext(ThemeContext);
  const isMedium = useMediaQuery(theme.mediaQueries.medium);

  const replaceEmoji = (search: string, emoji: EmojiData) => {
    if ("native" in emoji) {
      const txt = value.replace(`:${search}`, emoji.native);
      onSelection(txt);
    }
  };

  let displayed = false;

  const emojiSearchTerm = getEmojiSearchTerm(value);
  const emojis = getEmojisFromEmojiSearchTerm(emojiSearchTerm);

  if (emojiSearchTerm !== "" && emojis.length > 0) {
    displayed = true;
  } else {
    displayed = false;
  }
  useClickOutside([suggestions], () => {
    displayed = false;
  });

  const EmojiResult = ({ emoji }: { emoji: EmojiData }) => {
    const [isHovering, hoverProps] = useHover({ mouseEnterDelayMS: 0 });

    return (
      <StyledBox {...hoverProps}>
        <Button hoverBg={theme.colors.active} borderRadius="light">
          <StyledBox
            key={emoji.id}
            onClick={() => replaceEmoji(emojiSearchTerm, emoji)}
            px="2"
            py={[1, 2]}
          >
            {"native" in emoji && emoji.native}
            <Label
              size={LabelSizes.SMALL}
              variant={isHovering ? LabelVariants.INVERSE : LabelVariants.DARK}
            >
              {emoji.colons}
            </Label>
          </StyledBox>
        </Button>
      </StyledBox>
    );
  };

  return (
    <StyledBox position="relative">
      {displayed && (
        <StyledBox
          ref={suggestions}
          bg="backgrounds.panel"
          position="absolute"
          bottom="0"
          border="light"
          borderRadius="light"
        >
          <ScrollView maxHeight="4">
            <StyledBox padding="1" borderBottom="light">
              Suggestions for <b>{emojiSearchTerm}</b>
            </StyledBox>
            <FlexColumn
              padding="1"
              justifyContent="flex-start"
              flexDirection={["row", "column"]}
              flexWrap={["wrap", "nowrap"]}
            >
              {emojis.slice(0, isMedium ? 35 : 7).map(emoji => (
                <EmojiResult emoji={emoji}></EmojiResult>
              ))}
            </FlexColumn>
          </ScrollView>
        </StyledBox>
      )}
    </StyledBox>
  );
};

export { EmojiSuggestion };
