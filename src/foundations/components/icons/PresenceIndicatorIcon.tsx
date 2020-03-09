import React from "react";

interface PresenceIndicatorIconProps {
  title: string;
  active: boolean;
}

export const PresenceIndicatorIcon = ({
  title,
  active
}: PresenceIndicatorIconProps) => (
  <svg width={18} height={18}>
    <title>{title}</title>
    <circle
      cx={73}
      cy={73}
      r={7}
      transform="translate(-64 -64)"
      fill={active ? "#B8E986" : "#E9EEF4"}
      stroke="#FFF"
      strokeWidth={3}
      fillRule="evenodd"
    />
  </svg>
);
