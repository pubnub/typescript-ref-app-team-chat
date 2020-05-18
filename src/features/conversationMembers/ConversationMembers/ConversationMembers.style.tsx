import styled from "styled-components/macro";
import { motion } from "framer-motion";

export const Wrapper = styled(motion.section)`
  display: none;
  flex-direction: column;
  position: fixed;
  z-index: 100;
  margin-left: ${({ theme }) => theme.space[0]};
  width: 100%;
  max-width: none;
  height: 100%;
  background: ${({ theme }) => theme.backgrounds.panel};
  ${({ theme }) => theme.mediaQueries.medium} {
    position: relative;
    min-width: ${({ theme }) => theme.sizes[5]};
    max-width: ${({ theme }) => theme.sizes[5]};
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

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  min-height: ${({ theme }) => theme.sizes[3]};
  padding: ${({ theme }) => theme.space[6]};
  padding-bottom: 0;
  color: ${({ theme }) => theme.colors.importantText};
  font-size: ${({ theme }) => theme.fontSizes.regular};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const ConversationIcon = styled.div<{ color: string }>`
  border-radius: ${({ theme }) => theme.radii.medium};
  width: ${({ theme }) => theme.sizes[1]};
  height: ${({ theme }) => theme.sizes[1]};
  line-height: ${({ theme }) => theme.sizes[1]};
  font-family: ${({ theme }) => theme.fonts.app};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  font-size: ${({ theme }) => theme.fontSizes.regular};
  color: ${({ theme }) => theme.colors.onPrimary};
  text-align: center;
  background: ${({ color }) => color};
`;

export const Details = styled.div`
  height: ${({ theme }) => theme.sizes[1]};
  padding-left: ${({ theme }) => theme.space[6]};
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Channel = styled.div`
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  font-size: ${({ theme }) => theme.fontSizes.medium};
  color: ${({ theme }) => theme.colors.importantText};
`;

export const Title = styled.div`
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  font-size: ${({ theme }) => theme.fontSizes.medium};
  color: ${({ theme }) => theme.colors.importantText};
  padding: ${({ theme }) => `${theme.space[1]} ${theme.space[6]}`};
`;

export const CloseIcon = styled.span`
  cursor: pointer;
`;

export const ScrollableView = styled.span`
  overflow-y: scroll;
`;

export const BackIconWrapper = styled.div`
  cursor: pointer;
  display: flex;
  margin-right: ${({ theme }) => theme.space[7]};
  justify-self: flex-start;
  ${({ theme }) => theme.mediaQueries.medium} {
    display: none;
  }
`;

export const getAnimatedWrapperVariants = (
  isMedium: boolean,
  size: string
) => ({
  open: {
    x: isMedium ? "0px" : "0%",
    display: "flex"
  },
  closed: {
    x: isMedium ? size : "-100%",
    transitionEnd: {
      display: "none"
    }
  }
});
