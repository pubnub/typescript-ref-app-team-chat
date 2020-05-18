import styled from "styled-components/macro";
import { motion } from "framer-motion";

export const Wrapper = styled(motion.section)`
  flex-direction: column;
  z-index: 100;
  width: 100%;
  max-width: none;
  background: ${({ theme }) => theme.backgrounds.primary};
  ${({ theme }) => theme.mediaQueries.medium} {
    min-width: ${({ theme }) => theme.sizes[4]};
    max-width: ${({ theme }) => theme.sizes[4]};
  }
`;

export const Controls = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: absolute;
  top: 0;
  min-height: ${({ theme }) => theme.sizes[1]};
  padding: ${({ theme }) => `${theme.space[6]}`};
  width: 100%;
`;

export const CloseIcon = styled.span`
  cursor: pointer;
  ${({ theme }) => theme.mediaQueries.medium} {
    display: none;
  }
`;

export const Img = styled.img`
  align-self: flex-end;
  margin-top: auto;
  max-width: 100%;
`;

export const getAnimatedWrapperVariants = (
  isMedium: boolean,
  size: string
) => ({
  open: {
    x: "0%",
    display: "flex"
  },
  closed: {
    x: isMedium ? `-${size}` : "-100%",
    transitionEnd: {
      display: "none"
    }
  }
});
