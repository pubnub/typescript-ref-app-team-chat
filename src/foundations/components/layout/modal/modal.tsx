import React, { FunctionComponent } from "react";
import { createPortal } from "react-dom";
import Styled from "styled-components/macro";
import { motion } from "framer-motion";

interface ModalProps {
  /** Control the open state of the Modal */
  open?: boolean;
}

const Overlay = Styled.div`
  background: ${({ theme }) => theme.backgrounds.panel};
  bottom: 0;
  height: 100%;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  width: 100%;
  z-index: 200;

  ${({ theme }) => theme.mediaQueries.medium} {
    padding: 10vh 15%;
    background-color: rgba(0, 0, 0, 0.5);
  }

  ${({ theme }) => theme.mediaQueries.large} {
    padding: 10vh 25%;
  }
`;

const Dialog = Styled(motion.section)`
  background: ${({ theme }) => theme.backgrounds.panel};
  border-radius: ${({ theme }) => theme.radii.square};
  display: flex;
  flex-direction: column;
  max-height: 100%;
  padding: ${({ theme }) => theme.space[0]};
  width: 100%;
  z-index: 300;

  ${({ theme }) => theme.mediaQueries.medium} {
    border-radius: ${({ theme }) => theme.radii.strong};
    box-shadow: ${({ theme }) => theme.shadows[2]};
    padding: ${({ theme }) => theme.space[8]};
  }
`;

export const Modal: FunctionComponent<ModalProps> = ({
  open,
  children,
  ...rest
}) => {
  const WrappingElement = document.querySelector("body");

  return open && WrappingElement
    ? createPortal(
        <Overlay>
          <Dialog initial={{ y: "-200%" }} animate={{ y: 0 }} {...rest}>
            {children}
          </Dialog>
        </Overlay>,
        WrappingElement
      )
    : null;
};
