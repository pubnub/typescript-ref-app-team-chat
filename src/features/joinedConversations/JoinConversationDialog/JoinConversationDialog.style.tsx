import styled from "styled-components/macro";

export const ScrollView = styled.section`
  text-align: left;
  overflow-y: scroll;
  > div {
    border-top: ${({ theme }) =>
      `${theme.borders.light} ${theme.colors.neutral[1]}`};
    border-bottom: ${({ theme }) =>
      `${theme.borders.light} ${theme.colors.neutral[1]}`};
  }
`;

export const CloseButton = styled.div`
  cursor: pointer;
  color: ${({ theme }) => theme.colors.normalText};
  ${({ theme }) => theme.mediaQueries.medium} {
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: ${({ theme }) => `${theme.space[8]} ${theme.space[3]}`};
  ${({ theme }) => theme.mediaQueries.medium} {
    padding: ${({ theme }) => theme.space[0]};
    padding-bottom: ${({ theme }) => theme.space[8]};
  }
`;

export const Title = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.large};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  text-align: left;
  color: ${({ theme }) => theme.colors.importantText};
`;
