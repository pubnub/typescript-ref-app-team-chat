import React, { useState, useCallback, useRef } from "react";
import useClickOutside from "foundations/hooks/useClickOutside";
import { GifPicker, onSelectedHandler } from "../GifPicker";
import { GiphyIcon } from "foundations/components/icons/GiphyIcon";
import { Wrapper, Dialog, GifButton } from "./GifInput.style";

interface GifInputProps {
  onSelection: onSelectedHandler;
}

const GifInput = ({ onSelection }: GifInputProps) => {
  const [showPicker, setPickerState] = useState(false);
  const picker = useRef<HTMLDivElement>(null);

  const dismissPicker = useCallback(() => {
    setPickerState(false);
  }, [setPickerState]);

  useClickOutside([picker], dismissPicker);

  const togglePicker = () => {
    setPickerState(!showPicker);
  };

  const onSelected: onSelectedHandler = (gif, query) => {
    onSelection(gif, query);
    dismissPicker();
  };

  return (
    <Wrapper ref={picker}>
      <Dialog>{showPicker && <GifPicker onSelected={onSelected} />}</Dialog>
      <GifButton onClick={togglePicker}>
        <GiphyIcon title="Open gif selector" />
      </GifButton>
    </Wrapper>
  );
};

export { GifInput };
