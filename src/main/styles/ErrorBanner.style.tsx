import styled from "styled-components/macro";

export const ErrorBanner = styled.div`
  text-align: center;
  justify-content: center;
  display: flex;
  padding: ${({ theme }) => theme.space[3]};
  background-color: ${({ theme }) => theme.colors.error};
  color: ${({ theme }) => theme.colors.activeText};
`;
