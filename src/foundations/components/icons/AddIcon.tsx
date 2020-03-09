import React from "react";

interface AddIconProps {
  title: string;
}

export const AddIcon = ({ title }: AddIconProps) => (
  <svg width={20} height={20}>
    <title>{title}</title>
    <g transform="translate(1 1)" fill="none" fillRule="evenodd">
      <circle stroke="#9B9B9B" cx={9} cy={9} r={9} />
      <path
        d="M5 9h8M9 5v8"
        stroke="#979797"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  </svg>
);
