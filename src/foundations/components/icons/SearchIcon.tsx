import React from "react";

interface SearchIconProp {
  title: string;
}

export const SearchIcon = ({ title }: SearchIconProp) => (
  <svg width={16} height={16}>
    <title>{title}</title>
    <path
      d="M12.489 12.072l-.295-.301a7.22 7.22 0 001.673-4.638C13.867 3.193 10.763 0 6.933 0 3.104 0 0 3.193 0 7.133s3.104 7.133 6.933 7.133a6.79 6.79 0 004.507-1.718l.294.3v.87L14 16l1.59-1.636-2.255-2.292h-.846zM7 12A5 5 0 117 2a5 5 0 010 10z"
      fill="#000"
      fillRule="evenodd"
      opacity={0.346}
    />
  </svg>
);
