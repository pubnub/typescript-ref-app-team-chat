import React, { useContext } from "react";
import { ThemeContext } from "styled-components";

interface SendIconProps {
  title: string;
}

export const SendIcon = ({ title }: SendIconProps) => {
  const theme = useContext(ThemeContext);
  return (
    <svg width={18} height={18} viewBox="0 0 18 18">
      <title>{title}</title>
      <path
        fill="none"
        stroke={theme.colors.onPrimary}
        strokeMiterlimit={10}
        d="M.53,13.46V11.31c0-.74.29-1.1,1-1.15,2.17-.17,4.33-.31,6.5-.46l1.16-.11a.68.68,0,0,0,.67-.67.63.63,0,0,0-.55-.73c-1-.1-2-.16-3-.24L1.45,7.59a.84.84,0,0,1-.88-.82,40.83,40.83,0,0,1,0-5.07,1.36,1.36,0,0,1,2.07-1c2.5,1.26,5,2.54,7.48,3.82l6.14,3.14c.52.26,1,.59,1,1.23s-.45,1-1,1.26Q9.53,13.57,2.8,17A1.46,1.46,0,0,1,.53,15.64C.52,14.91.53,14.19.53,13.46Z"
      />
    </svg>
  );
};
