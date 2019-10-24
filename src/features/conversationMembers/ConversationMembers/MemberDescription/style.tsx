import styled from "styled-components/macro";

export const Wrapper = styled.div`
  padding: 12px 24px;
  display: flex;
  align-items: center;
  :hover {
    background-color: #f0f3f7;
  }
`;

export const PresenceDot = styled.span<{ presence: boolean }>`
  font-size: 0px;
  border: 5px solid;
  border-radius: 50%;
  height: 0px;
  width: 0px;
  border-color: ${props => (props.presence ? "#B8E986" : "#E9EEF4")};
  margin-left: 10px;
  vertical-align: 6px;
`;

export const Avatar = styled.div`
  width: 36px;
  height: 36px;
`;

export const About = styled.div`
  padding-left: 20px;
  flex-grow: 1;
`;

export const UserName = styled.div<{ muted: boolean }>`
  font-size: 15px;
  color: ${props => (props.muted ? "#DDDDDD" : "#585858")};
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  line-height: 20px;
`;

export const UserTitle = styled.div<{ muted: boolean }>`
  font-size: 13px;
  color: ${props => (props.muted ? "#EBEBEB" : "#9b9b9b")};
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  line-height: 20px;
`;
