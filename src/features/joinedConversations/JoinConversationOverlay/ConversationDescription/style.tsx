import styled from "styled-components/macro";

export const Wrapper = styled.div`
  color: #565656;
  font-family: "Roboto", sans-serif;
  padding: 10px 20px 10px 20px;
  font-weight: 400;
  font-size: 13px;
  text-transform: capitalize;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  background-color: white;
  :hover {
    background-color: #f0f3f7;
  }
`;

export const Body = styled.div`
  display: flex;
`;

export const Name = styled.div`
  margin: 5px 20px;
  width: 123px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

export const Description = styled.div`
  margin: 5px 20px;
  color: #aeafae;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
`;

export const IconWrapper = styled.div`
  padding: 11px 0;
`;

export const ConversationIcon = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 10px;
  padding: 11px 13px;
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  font-size: 13px;
  background-color: #f0f3f7;
`;
