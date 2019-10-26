import React from "react";

const Add = (
  props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
) => (
  <svg width={20} height={20} {...props}>
    <title>{"iconAdd"}</title>
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

export { Add };
