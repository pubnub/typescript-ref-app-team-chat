import styled from "styled-components/macro";

export const Content = styled.div`
  white-space: pre-wrap;
  border-radius: ${({ theme }) => theme.radii.strong};
  border-top-left-radius: ${({ theme }) => theme.radii.square};
  padding: ${({ theme }) => theme.space[4]};
  width: fit-content;
  line-height: 1.5;
  font-size: ${({ theme }) => theme.fontSizes.regular};
  font-family: ${({ theme }) => theme.fonts.app};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  text-align: left;
  background: ${({ theme }) => theme.backgrounds.message};
  box-shadow: ${({ theme }) => theme.shadows[0]};
  color: ${({ theme }) => theme.colors.messageText};
`;
