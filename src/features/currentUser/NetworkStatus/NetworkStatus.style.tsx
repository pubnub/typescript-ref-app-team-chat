import styled from "styled-components/macro";

export const Wrapper = styled.span<{ size: number }>`
  height: ${({ size }) => size}px;
  width: ${({ size }) => size}px;
  display: flex;
`;
