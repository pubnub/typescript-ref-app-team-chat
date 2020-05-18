import styled from "styled-components/macro";

export const Wrapper = styled.div`
  display: flex;
  align-items: flex-end;
  position: relative;
  bottom: 0;
  border-radius: ${({ theme }) => theme.radii.messageEditor};
  border: ${({ theme }) => `${theme.borders.light} ${theme.colors.borderDark}`};
  padding: ${({ theme }) => theme.space[2]};
`;
