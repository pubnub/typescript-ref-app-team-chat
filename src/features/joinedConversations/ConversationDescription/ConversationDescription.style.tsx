import styled from "styled-components/macro";

export const Wrapper = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  flex-direction: column;
  min-height: ${({ theme }) => theme.sizes[3]};
  font-family: ${({ theme }) => theme.fonts.app};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: ${({ theme }) => theme.fontSizes.regular};
  text-transform: capitalize;
  color: ${({ theme }) => theme.colors.importantText};
  :hover {
    background: ${({ theme }) => theme.backgrounds.contentHover};
  }
`;

export const Body = styled.div`
  display: flex;
  max-height: ${({ theme }) => theme.sizes[1]};
  padding: ${({ theme }) => `${theme.space[0]} ${theme.space[1]}`};
`;

export const Name = styled.div`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

export const Description = styled.div`
  color: ${({ theme }) => theme.colors.normalText};
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: ${({ theme }) => theme.space[5]};
  justify-content: space-between;
`;

export const IconWrapper = styled.div`
  padding: ${({ theme }) => `${theme.space[4]} ${theme.space[0]}`};
`;

export const ConversationIcon = styled.div<{ color: string }>`
  border-radius: ${({ theme }) => theme.radii.medium};
  width: ${({ theme }) => theme.sizes[1]};
  height: ${({ theme }) => theme.sizes[1]};
  line-height: ${({ theme }) => theme.sizes[1]};
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.app};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  font-size: ${({ theme }) => theme.fontSizes.regular};
  color: ${({ theme }) => theme.colors.onPrimary};
  background: ${({ color }) => color};
`;
