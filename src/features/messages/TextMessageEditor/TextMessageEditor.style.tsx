import styled from "styled-components/macro";

export const Wrapper = styled.div`
  flex-grow: 1;
`;

export const Container = styled.div`
  height: auto;
  display: flex;
  align-items: flex-end;
`;

export const TextArea = styled.textarea`
  flex-grow: 1;
  border: none;
  resize: none;
  overflow: auto;
  max-height: 150px;
  padding: 0;
  margin-left: 15px;
  background-color: #f0f3f7;

  &::placeholder {
    color: #979797;
  }

  &:focus {
    outline: none;
  }
  font-size: 15px;
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  color: #5a5a5a;
`;
