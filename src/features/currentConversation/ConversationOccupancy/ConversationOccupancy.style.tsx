import styled from "styled-components/macro";

export const Wrapper = styled.div<{ highlighted: boolean }>`
  display: flex;
  align-items: center;
  align-self: flex-start;
  cursor: pointer;
  flex-direction: column-reverse;
  margin-left: ${({ theme }) => theme.space[6]};
  color: ${({ theme, highlighted }) =>
    highlighted ? theme.colors.active : theme.colors.normalText};
  font-family: ${({ theme }) => theme.fonts.app};
  font-weight: ${({ theme }) => theme.fontWeights.light};
  font-size: ${({ theme }) => theme.fontSizes.regular};
  ${({ theme }) => theme.mediaQueries.medium} {
    flex-direction: row;
  }
`;

export const OccupancyNumber = styled.section`
  cursor: pointer;
  margin-right: ${({ theme }) => theme.space[0]};
  margin-top: ${({ theme }) => theme.space[0]};
  ${({ theme }) => theme.mediaQueries.medium} {
    margin-right: ${({ theme }) => theme.space[3]};
    margin-top: ${({ theme }) => theme.space[0]};
  }
  em {
    font-style: normal;
    font-family: ${({ theme }) => theme.fonts.app};
    font-weight: ${({ theme }) => theme.fontWeights.black};
  }
`;

export const IconWrapper = styled.span`
  cursor: pointer;
`;
