import React, { useContext } from "react";
import { ThemeContext } from "styled-components";

interface AddIconProps {
  title: string;
}

export const AddIcon = ({ title }: AddIconProps) => {
  const theme = useContext(ThemeContext);
  return (
    <svg width={20} height={20}>
      <title>{title}</title>
      <g transform="translate(1 1)" fill="none" fillRule="evenodd">
        <circle stroke={theme.colors.onPrimary} cx={9} cy={9} r={9} />
        <path
          d="M5 9h8M9 5v8"
          stroke={theme.colors.onPrimary}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};
