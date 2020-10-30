import React from "react";
import { GifPicker, onSelectedHandler } from "../GifPicker";
import { Icons } from "foundations/components/presentation";
import { Dropdown } from "foundations/components/layout";

interface GifInputProps {
  onSelection: onSelectedHandler;
}

const GifInput = ({ onSelection }: GifInputProps) => {
  return (
    <Dropdown
      icon={Icons.Giphy}
      right="0"
      bottom="0"
      title="Open gif selector"
      render={dismiss => {
        const onSelected: onSelectedHandler = (gif, query) => {
          onSelection(gif, query);
          dismiss();
        };
        return <GifPicker onSelected={onSelected} />;
      }}
    />
  );
};

export { GifInput };
