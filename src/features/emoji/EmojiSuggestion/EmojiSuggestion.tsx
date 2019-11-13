import "emoji-mart/css/emoji-mart.css";
import { getBreakpoint } from "features/layout/selectors";
import { useSelector } from "react-redux";
import { Breakpoint } from "features/layout/layoutModel";
import React, { useRef } from "react";
import useClickOutside from "foundations/hooks/useClickOutside";
import { emojiIndex, EmojiData } from "emoji-mart";
import {
  Popup,
  Suggestions,
  Heading,
  EmojiSearchTerm,
  Results,
  Result,
  Emoji,
  Colons
} from "./EmojiSuggestion.style";

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
  const breakpoint = useSelector(getBreakpoint);

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

  return (
    <Popup>
      {displayed && (
        <Suggestions ref={suggestions}>
          <Heading>
            Suggestions for <EmojiSearchTerm>{emojiSearchTerm}</EmojiSearchTerm>
          </Heading>
          <Results>
            {emojis
              .slice(0, breakpoint === Breakpoint.Small ? 7 : 35)
              .map(emoji => (
                <Result
                  key={emoji.id}
                  onClick={() => replaceEmoji(emojiSearchTerm, emoji)}
                >
                  <Emoji>{"native" in emoji && emoji.native}</Emoji>
                  <Colons>{emoji.colons}</Colons>
                </Result>
              ))}
          </Results>
        </Suggestions>
      )}
    </Popup>
  );
};

export { EmojiSuggestion };
