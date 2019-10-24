import React from "react";

const SvgComponent = (
  props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
) => (
  <svg width={16} height={16} {...props}>
    <title>{"iconClose"}</title>
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

export default SvgComponent;
