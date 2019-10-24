import styled from "styled-components/macro";

export const Wrapper = styled.div`
  border-radius: 15px;
  background-color: #f0f3f7;
  height: 30px;
  margin: 15px 24px 15px 24px;
  padding: 5px 15px 5px 15px;
  display: flex;
`;

export const IconWrapper = styled.div`
  padding: 2px;
`;

export const Input = styled.input`
  color: #9b9b9b;
  width: 100%;
  font-size: 13px;
  font-family: "Roboto", sans-serif;
  font-weight: 400;

  background: transparent;
  border: none;
  :focus {
    outline-width: 0;
    color: #9b9b9b;
  }
`;
