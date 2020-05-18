import styled from "styled-components/macro";
import { motion } from "framer-motion";

export const Overlay = styled.div<{ displayed: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: ${({ displayed }) => (displayed ? "flex" : "none")};
  z-index: 200;
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.backgrounds.panel};
  ${({ theme }) => theme.mediaQueries.medium} {
    padding: 10% 15%;
    background-color: rgba(0, 0, 0, 0.5);
  }
  ${({ theme }) => theme.mediaQueries.large} {
    padding: 10% 25%;
  }
`;

export const Modal = styled(motion.section)`
  z-index: 300;
  box-shadow: ${({ theme }) => theme.shadows[1]};
  border-radius: ${({ theme }) => theme.radii.square};
  width: 100%;
  height: 100%;
  padding: ${({ theme }) => theme.space[0]};
  text-align: center;
  flex-direction: column;
  background: ${({ theme }) => theme.backgrounds.panel};
  ${({ theme }) => theme.mediaQueries.medium} {
    border-radius: ${({ theme }) => theme.radii.strong};
    padding: ${({ theme }) => theme.space[8]};
  }
`;

export const getAnimatedModalVariants = (isMedium: boolean) => ({
  open: {
    y: "0%",
    display: "flex"
  },
  closed: {
    y: isMedium ? "-200%" : "50%",
    transitionEnd: {
      display: "none"
    }
  }
});
