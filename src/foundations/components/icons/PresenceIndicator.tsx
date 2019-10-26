import React from "react";

const PresenceIndicator = (
  props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
) => (
  <svg width={18} height={18} {...props}>
    <title>{"Oval"}</title>
    <circle
      cx={73}
      cy={73}
      r={7}
      transform="translate(-64 -64)"
      fill={props.fill}
      stroke="#FFF"
      strokeWidth={3}
      fillRule="evenodd"
    />
  </svg>
);

export { PresenceIndicator };
