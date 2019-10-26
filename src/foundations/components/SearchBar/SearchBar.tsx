import React from "react";
import { Search as SearchIcon } from "foundations/components/icons/Search";
import { Wrapper, Input, IconWrapper } from "./SearchBar.style";

type SearchBarProps = {
  placeholder: string;
};

const SearchBar = ({ placeholder }: SearchBarProps) => (
  <Wrapper>
    <Input placeholder={placeholder} />
    <IconWrapper>
      <SearchIcon />
    </IconWrapper>
  </Wrapper>
);

export { SearchBar };
