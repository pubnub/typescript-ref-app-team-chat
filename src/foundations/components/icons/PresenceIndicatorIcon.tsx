import React, { useContext } from "react";
import { ThemeContext } from "styled-components";

interface PresenceIndicatorIconProps {
  title: string;
  active: boolean;
  size: number;
}

export const PresenceIndicatorIcon = ({
  title,
  active,
  size
}: PresenceIndicatorIconProps) => {
  const theme = useContext(ThemeContext);
  return (
    <svg width={size} height={size}>
      <title>{title}</title>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={size / 2}
        fill={active ? theme.colors.success : theme.colors.inactive}
        fillRule="evenodd"
      />
    </svg>
  );
};
