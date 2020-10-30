import React, { FunctionComponent } from "react";
import Styled from "styled-components/macro";
import { motion, Transition } from "framer-motion";
import { background, BackgroundProps } from "styled-system";

interface DrawerProps extends BackgroundProps {
  /** Control the open state of the Drawer */
  open?: boolean;
  /** Starting screen edge for the slide-in animation */
  edge?: "left" | "right";
  /** Should the Drawer appear in a wide variant */
  wide?: boolean;
  /** Modify the default transition parameters. Framer-motion is used internally */
  transition?: Transition;
}

const Wrapper = Styled(motion.section)<DrawerProps>`
  background: ${({ theme }) => theme.backgrounds.panel};
  ${background}
  flex: 0 0 auto;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  z-index: 100;

  ${({ theme }) => theme.mediaQueries.medium} {
    position: relative;
    width: ${p => (p.wide ? p.theme.sizes[5] : p.theme.sizes[4])};
  }
`;

const WrapperVariants = (edgeSign: string) => ({
  open: {
    x: "0%",
    display: "flex"
  },
  closed: {
    x: edgeSign + "100%",
    transitionEnd: {
      display: "none"
    }
  }
});

export const Drawer: FunctionComponent<DrawerProps> = ({
  open = false,
  edge = "left",
  children,
  ...rest
}) => {
  const edgeSign = edge === "left" ? "-" : "+";

  return (
    <Wrapper
      initial="closed"
      animate={open ? "open" : "closed"}
      variants={WrapperVariants(edgeSign)}
      {...rest}
    >
      {children}
    </Wrapper>
  );
};
