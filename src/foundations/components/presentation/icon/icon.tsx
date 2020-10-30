import React, { SVGProps } from "react";
import Styled from "styled-components/macro";
import { color } from "styled-system";
import { ReactComponent as Add } from "foundations/svg/add.svg";
import { ReactComponent as Back } from "foundations/svg/back.svg";
import { ReactComponent as Cross } from "foundations/svg/cross.svg";
import { ReactComponent as Emoji } from "foundations/svg/emoji.svg";
import { ReactComponent as Giphy } from "foundations/svg/giphy.svg";
import { ReactComponent as Leave } from "foundations/svg/leave.svg";
import { ReactComponent as Logo } from "foundations/svg/logo.svg";
import { ReactComponent as People } from "foundations/svg/people.svg";
import { ReactComponent as Presence } from "foundations/svg/presence.svg";
import { ReactComponent as Search } from "foundations/svg/search.svg";
import { ReactComponent as Send } from "foundations/svg/send.svg";

interface IconWrapperProps {
  /** Show pointer cursor on hover */
  clickable?: boolean;
}

interface IconProps extends IconWrapperProps, SVGProps<SVGSVGElement> {
  /** Icon file to display */
  icon: Icons;
  /** Human readable name */
  title?: string;
}

export enum Icons {
  Add = "Add",
  Back = "Back",
  Cross = "Cross",
  Emoji = "Emoji",
  Giphy = "Giphy",
  Leave = "Leave",
  Logo = "Logo",
  People = "People",
  Presence = "Presence",
  Search = "Search",
  Send = "Send"
}

const IconComponents: {
  [key in Icons]: typeof Add;
} = {
  Add,
  Back,
  Cross,
  Emoji,
  Giphy,
  Leave,
  Logo,
  People,
  Presence,
  Search,
  Send
};

const Wrapper = Styled.object<IconWrapperProps>`
  cursor: ${p => p.clickable && "pointer"};

  svg {
    // Block display is needed to remove whitespace underneath inline elements
    display: block;
    ${color}
  }
`;

// This component could be simplified further with dynamic SVG file imports:
// https://stackoverflow.com/questions/61339259/how-to-dynamically-import-svg-and-render-it-inline
// Unfortunately at the time of implementation there's an issue with create-react-app that prevents this solution:
// https://github.com/facebook/create-react-app/issues/5276
// ie. "ReactComponent" comes in as undefined when used inside of a dynamic import

export const Icon = ({ icon, clickable, color, ...rest }: IconProps) => {
  const IconFile = IconComponents[icon];

  return (
    <Wrapper {...{ color, clickable }}>
      <IconFile {...rest} />
    </Wrapper>
  );
};
