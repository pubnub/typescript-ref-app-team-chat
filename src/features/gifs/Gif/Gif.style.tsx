import styled from "styled-components/macro";

export const Placeholder = styled.div<{ width: number; height: number }>`
  background: ${({ theme }) => theme.backgrounds.primary};
  width: ${({ width }) => `${width}px`};
  height: ${({ height }) => `${height}px`};
`;

export const Wrapper = styled.div`
  display: flex;

  > * {
    max-width: 100%;
  }
`;
