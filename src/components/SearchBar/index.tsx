import React from "react";
import SearchIcon from "components/icons/Search";
import { Wrapper, Input, IconWrapper } from "./style";

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

export default SearchBar;
