import styled from "styled-components/macro";

export const Wrapper = styled.div`
  display: flex;
  margin: 30px 0 0 0;
  flex-direction: column;
  overflow: auto;
`;

export const ConversationList = styled.div`
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
`;

export const Title = styled.div`
  display: flex;
  justify-content: space-between;
  color: #565656;
  font-size: 15px;
  margin: 10px 24px 10px 24px;
`;

export const AddButton = styled.span`
  cursor: pointer;
  font-size: 0.75em;
  align-self: center;
  cursor: pointer;
`;
