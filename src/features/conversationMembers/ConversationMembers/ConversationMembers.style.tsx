import styled from "styled-components/macro";
import { motion } from "framer-motion";

export const Wrapper = styled(motion.section)`
  height: 100%;
  display: none;
  flex-direction: column;
  max-width: 290px;
  width: 100%;
  @media ${props => props.theme.breakpoint.mediaQuery.small} {
    margin-left: 0;
    max-width: none;
    position: fixed;
    z-index: 300;
    background-color: #ffffff;
  }
`;

export const Title = styled.div`
  display: flex;
`;

export const Header = styled.div`
  font-size: 15px;
  color: #585858;
  font-family: "Roboto", sans-serif;
  font-weight: 300;
  font-weight: 500;
  line-height: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 24px 24px 24px 24px;
`;

export const CloseIcon = styled.span`
  cursor: pointer;
  @media ${props => props.theme.breakpoint.mediaQuery.small} {
    display: none;
  }
`;

export const ScrollableView = styled.span`
  overflow-y: scroll;
`;

export const BackIconWrapper = styled.div`
  cursor: pointer;
  display: none;
  @media ${props => props.theme.breakpoint.mediaQuery.small} {
    display: flex;
    margin-right: 25px;
  }
`;

export const getAnimatedWrapperVariants = (isSmall: boolean) => ({
  open: {
    width: "100%",
    display: "flex"
  },
  closed: {
    width: isSmall ? "100%" : "0",
    transitionEnd: {
      display: "none"
    }
  }
});
