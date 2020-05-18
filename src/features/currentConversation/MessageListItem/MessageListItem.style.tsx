import styled from "styled-components/macro";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-shrink: 0;
  padding: ${({ theme }) => `${theme.space[1]} ${theme.space[5]}`};
  ${({ theme }) => theme.mediaQueries.medium} {
    padding: ${({ theme }) => `${theme.space[1]} ${theme.space[6]}`};
  }
  :hover {
    background-color: ${({ theme }) => theme.backgrounds.contentHover};
  }
  :first-child {
    margin-top: auto;
  }
  :last-child {
    padding-bottom: ${({ theme }) => theme.space[4]};
  }
`;

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: ${({ theme }) => theme.space[5]};
`;

export const Header = styled.div`
  margin: ${({ theme }) => theme.space[0]};
  margin-bottom: ${({ theme }) => theme.space[1]};
`;

export const Content = styled.div`
  white-space: pre-wrap;
  width: fit-content;
  padding: ${({ theme }) => theme.space[5]};
  font-size: ${({ theme }) => theme.fontSizes.small};
  font-family: ${({ theme }) => theme.fonts.app};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  border-radius: ${({ theme }) => theme.radii.strong};
  border-top-left-radius: ${({ theme }) => theme.radii.square};
  text-align: left;
  background: ${({ theme }) => theme.backgrounds.message};
  color: ${({ theme }) => theme.colors.messageText};
  ${({ theme }) => theme.mediaQueries.medium} {
    font-size: ${({ theme }) => theme.fontSizes.regular};
  }
`;

export const Avatar = styled.div`
  width: ${({ theme }) => theme.sizes[1]};
  height: ${({ theme }) => theme.sizes[1]};
`;

export const SenderName = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.medium};
  font-family: ${({ theme }) => theme.fonts.app};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  text-transform: capitalize;
  color: ${({ theme }) => theme.colors.importantText};
`;

export const TimeSent = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.small};
  font-family: ${({ theme }) => theme.fonts.app};
  font-weight: ${({ theme }) => theme.fontWeights.light};
  margin-left: ${({ theme }) => theme.space[3]};
  color: ${({ theme }) => theme.colors.importantText};
`;
