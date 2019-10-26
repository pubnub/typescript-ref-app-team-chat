import styled from "styled-components/macro";

export const Wrapper = styled.div<{ selected: boolean; emphasized: boolean }>`
  color: ${props => (props.selected ? "white" : "#565656")};
  height: 56px;
  padding: 10px 20px 10px 20px;
  font-family: "Roboto", sans-serif;
  font-weight: ${props => (props.emphasized ? "500" : "400")};
  font-size: 13px;
  text-transform: capitalize;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  background-color: ${props => (props.selected ? "#6FA9F6" : "white")};
  :hover {
    background-color: ${props => (props.selected ? "#6FA9F6" : "#f0f3f7")};
  }
`;

export const Body = styled.div`
  display: flex;
`;

export const Name = styled.div`
  margin: 10px 20px;
  width: 123px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

export const MessageCount = styled.span`
  margin: 10px 10px;
  :hover {
    display: none;
  }
`;

export const IconWrapper = styled.div`
  padding: 11px 0;
`;

export const ConversationIcon = styled.div<{ selected: boolean }>`
  width: 36px;
  height: 36px;
  border-radius: 10px;
  padding: 11px 13px;
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  font-size: 13px;
  background-color: ${props => (props.selected ? "#6B9EEA" : "#f0f3f7")};
`;
