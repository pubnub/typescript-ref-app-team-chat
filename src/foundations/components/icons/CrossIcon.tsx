import React from "react";

interface CrossIconProps {
  title: string;
}

export const CrossIcon = ({ title }: CrossIconProps) => (
  <svg width={16} height={16}>
    <title>{title}</title>
    <g
      stroke="#979797"
      strokeWidth={2}
      fill="none"
      fillRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M1 1l13.2 13.2M14.2 1L1 14.2" />
    </g>
  </svg>
);
