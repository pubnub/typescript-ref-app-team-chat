import styled from "styled-components/macro";
import { motion } from "framer-motion";

export const Overlay = styled.div<{ displayed: boolean }>`
  position: fixed;
  display: ${props => (props.displayed ? "flex" : "none")};
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 400;

  @media ${props => props.theme.breakpoint.mediaQuery.small} {
    background-color: #ffffff;
  }
`;

export const Modal = styled(motion.section)`
  width: 48%;
  height: 80%;
  position: absolute;
  left: 80%;
  top: 50%;
  left: 50%;
  z-index: 500;
  padding: 16px 35px;
  text-align: center;
  transform: translate(-50%, -50%);
  flex-direction: column;
  background-color: white;
  border-radius: 15px;
  box-shadow: 3px 11px 17px 10px #717171;

  @media ${props => props.theme.breakpoint.mediaQuery.small} {
    padding: 0 0;
    width: 100%;
    height: 100%;
    border-radius: 0;
  }
`;

export const getAnimatedModalVariants = (isSmall: boolean) => ({
  open: {
    top: "50%",
    display: "flex"
  },
  closed: {
    top: isSmall ? "50%" : "-200%",
    transitionEnd: {
      display: "none"
    }
  }
});
