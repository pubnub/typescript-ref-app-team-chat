import styled from "styled-components/macro";

export const Wrapper = styled.div<{ selected: boolean; emphasized: boolean }>`
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  height: ${({ theme }) => theme.sizes[2]};
  padding: ${({ theme }) => `${theme.space[1]} ${theme.space[6]}`};
  font-family: ${({ theme }) => theme.fonts.app};
  font-weight: ${({ theme, emphasized }) =>
    emphasized ? theme.fontWeights.black : theme.fontWeights.regular};
  font-size: ${({ theme }) => theme.fontSizes.regular};
  text-transform: capitalize;
  color: ${({ theme }) => theme.colors.onPrimary};
  background: ${({ theme, selected }) =>
    selected ? theme.backgrounds.primaryActive : "transparent"};
  :hover {
    background: ${({ theme, selected }) =>
      selected
        ? theme.backgrounds.primaryActive
        : theme.backgrounds.primaryHover};
  }
`;

export const Body = styled.div`
  display: flex;
`;

export const Name = styled.div`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  margin: ${({ theme }) => `${theme.space[0]} ${theme.space[6]}`};
  line-height: ${({ theme }) => theme.sizes[1]};
`;

export const MessageCount = styled.span`
  margin: ${({ theme }) => theme.space[3]};
  :hover {
    display: none;
  }
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
  color: ${({ theme }) => theme.colors.selectedText};
  text-align: center;
  background: ${({ color }) => color};
`;
