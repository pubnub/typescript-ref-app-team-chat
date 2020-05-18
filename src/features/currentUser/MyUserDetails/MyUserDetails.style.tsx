import styled from "styled-components/macro";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 0px;
  text-transform: capitalize;
`;

export const UserName = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.regular};
  font-family: ${({ theme }) => theme.fonts.app};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  color: ${({ theme }) => theme.colors.onPrimary};
  padding-right: ${({ theme }) => theme.space[1]};
`;
