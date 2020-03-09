import React, { useRef, useContext } from "react";
import { useSelector } from "react-redux";
import { getViewStates } from "features/layout/Selectors";
import { MyUserDetails } from "features/currentUser/MyUserDetails/MyUserDetails";
import { MyConversations } from "features/joinedConversations/MyConversations/MyConversations";
import { Wrapper, getAnimatedWrapperVariants } from "./Menu.style";
import { ThemeContext } from "styled-components";
import { useMediaQuery } from "foundations/hooks/useMediaQuery";

const Menu = () => {
  const view = useRef<HTMLElement>(null);
  const views = useSelector(getViewStates);
  const themeContext = useContext(ThemeContext);
  const isSmall = useMediaQuery(themeContext.breakpoint.mediaQuery.small);

  return (
    <Wrapper
      ref={view}
      animate={views.Menu ? "open" : "closed"}
      variants={getAnimatedWrapperVariants(isSmall)}
    >
      <MyUserDetails />
      <MyConversations />
    </Wrapper>
  );
};

export { Menu };
