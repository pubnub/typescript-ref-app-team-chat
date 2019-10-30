import styled from "styled-components/macro";

export const Wrapper = styled.div`
  flex-grow: 1;
  flex-direction: column;
  overflow-y: scroll;
  height: 100%;

  > div {
    &:first-child {
      margin-top: 16px;
    }
    &:last-child {
      margin-bottom: 16px;
    }
  }
`;
