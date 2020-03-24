import styled from "styled-components/macro";
import { opacify } from "polished";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-shrink: 0;
  padding: 12px 90px 12px 24px;

  @media ${props => props.theme.breakpoint.mediaQuery.small} {
    padding: 4px 16px 4px 16px;
  }

  :hover {
    background-color: #eaeef3;
  }

  :first-child {
    margin-top: auto;
  }
`;

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
`;

export const Header = styled.div`
  margin: 5px 0;
`;

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

export const Avatar = styled.div`
  width: 36px;
  height: 36px;
`;

export const SenderName = styled.span`
  font-size: 15px;
  color: #585858;
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  line-height: 20px;
  text-transform: capitalize;
`;

export const TimeSent = styled.span`
  font-size: 11px;
  font-family: "Roboto", sans-serif;
  font-weight: 300;
  margin-left: 10px;
  color: ${opacify(0.87, "#3F3F3F")};
`;
