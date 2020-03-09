import styled from "styled-components/macro";
import { motion } from "framer-motion";

export const Wrapper = styled(motion.section)`
  flex-direction: column;
  max-width: 290px;
  width: 100%;
  @media ${props => props.theme.breakpoint.mediaQuery.small} {
    max-width: none;
    position: absolute;
    z-index: 100;
    background-color: #ffffff;
  }
`;

export const Img = styled.img`
  max-width: 100%;
  align-self: flex-end;
  margin-top: auto;
`;

export const getAnimatedWrapperVariants = (isSmall: boolean) => ({
  open: {
    width: "100%",
    display: "flex"
  },
  closed: {
    width: isSmall ? "100%" : "24px",
    transitionEnd: {
      display: "none"
    }
  }
});
