import styled from "styled-components/macro";
import { motion } from "framer-motion";

export const Wrapper = styled(motion.section)`
  display: flex;
  flex-direction: column;
  position: fixed;
  z-index: 0;
  margin: ${({ theme }) => theme.space[0]};
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.backgrounds.content};
  border: ${({ theme }) =>
    `${theme.borders.light} ${theme.colors.borderLight}`};
  ${({ theme }) => theme.mediaQueries.medium} {
    position: static;
  }
`;

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  margin: ${({ theme }) => theme.space[5]};
  margin-top: ${({ theme }) => theme.space[0]};
  height: 100%;
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
