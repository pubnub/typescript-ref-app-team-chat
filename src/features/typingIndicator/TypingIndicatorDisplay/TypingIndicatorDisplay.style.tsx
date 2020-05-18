import styled from "styled-components/macro";

export const Wrapper = styled.div`
  padding-left: ${({ theme }) => theme.space[6]};
  padding-bottom: ${({ theme }) => theme.space[1]};
  font-size: ${({ theme }) => theme.fontSizes.small};
  font-family: ${({ theme }) => theme.fonts.app};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  color: ${({ theme }) => theme.colors.importantText};
`;
