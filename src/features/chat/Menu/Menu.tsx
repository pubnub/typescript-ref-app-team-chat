import React, { useRef, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getViewStates } from "features/layout/Selectors";
import { MyConversations } from "features/joinedConversations/MyConversations/MyConversations";
import {
  Wrapper,
  Controls,
  CloseIcon,
  getAnimatedWrapperVariants
} from "./Menu.style";
import { ThemeContext } from "styled-components";
import { useMediaQuery } from "foundations/hooks/useMediaQuery";
import { Branding } from "foundations/components/Branding";
import { CrossIcon } from "foundations/components/icons/CrossIcon";
import { menuViewHidden } from "features/layout/LayoutActions";

const Menu = () => {
  const view = useRef<HTMLElement>(null);
  const views = useSelector(getViewStates);
  const theme = useContext(ThemeContext);
  const isMedium = useMediaQuery(theme.mediaQueries.medium);
  const dispatch = useDispatch();

  return (
    <Wrapper
      ref={view}
      animate={views.Menu || isMedium ? "open" : "closed"}
      variants={getAnimatedWrapperVariants(isMedium, theme.sizes[4])}
    >
      <Controls>
        <CloseIcon onClick={() => dispatch(menuViewHidden())}>
          <CrossIcon
            color={theme.colors.onPrimary}
            title="close conversations"
          />
        </CloseIcon>
      </Controls>
      <Branding></Branding>
      <MyConversations />
    </Wrapper>
  );
};

export { Menu };
