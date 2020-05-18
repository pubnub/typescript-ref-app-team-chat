import styled from "styled-components/macro";

export const Wrapper = styled.div`
  left: ${({ theme }) => theme.space[5]};
  right: ${({ theme }) => theme.space[5]};
  bottom: ${({ theme }) => theme.space[5]};
  margin: ${({ theme }) => theme.space[6]};
  margin-top: ${({ theme }) => theme.space[0]};
  margin-bottom: ${({ theme }) => theme.space[3]};
`;
