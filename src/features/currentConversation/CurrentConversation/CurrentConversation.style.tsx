import styled from "styled-components/macro";
import { motion } from "framer-motion";

export const Wrapper = styled(motion.section)`
  display: flex;
  flex-direction: column;
  background-color: #f0f3f7;
  width: 100%;
  @media ${props => props.theme.breakpoint.mediaQuery.small} {
    margin: 0;
    position: fixed;
    z-index: 200;
    height: 100%;
  }
`;

export const Body = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  margin: 0px 15px 15px 15px;
`;

export const animatedWrapperVariants = {
  open: {
    display: "flex"
  },
  closed: {
    transitionEnd: {
      display: "none"
    }
  }
};
