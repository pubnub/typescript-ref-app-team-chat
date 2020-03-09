import styled from "styled-components/macro";

export const Content = styled.div`
  padding: 15px;
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  border-radius: 0 15px 15px 15px;
  text-align: left;
  background-color: white;
  color: #5a5a5a;
  white-space: pre-wrap;
  font-size: 15px;
  width: fit-content;
  @media ${props => props.theme.breakpoint.mediaQuery.small} {
    font-size: 12px;
  }
`;
