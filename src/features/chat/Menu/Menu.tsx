import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { Breakpoint } from "features/layout/layoutModel";
import { getPanelStates, getBreakpoint } from "features/layout/selectors";
import { MyUserDetails } from "features/currentUser/MyUserDetails/MyUserDetails";
import { MyConversations } from "features/joinedConversations/MyConversations/MyConversations";
import { Wrapper, AnimatedWrapper } from "./Menu.style";

const Menu = () => {
  const panel = useRef<HTMLElement>(null);
  const panels = useSelector(getPanelStates);
  const breakpoint = useSelector(getBreakpoint);
  const Panel = breakpoint === Breakpoint.Small ? Wrapper : AnimatedWrapper;

  return (
    <Panel ref={panel} pose={panels.Left ? "open" : "closed"}>
      <MyUserDetails />
      <MyConversations />
    </Panel>
  );
};

export { Menu };
