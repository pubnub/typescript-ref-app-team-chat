import styled from "styled-components/macro";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
  margin: ${({ theme }) => theme.space[0]};
  margin-top: ${({ theme }) => theme.space[1]};
`;

export const ConversationList = styled.div`
  overflow-y: auto;
  overflow-y: overlay;
  display: flex;
  flex-direction: column;
`;

export const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: ${({ theme }) => `${theme.space[1]} ${theme.space[6]}`};
  font-size: ${({ theme }) => theme.fontSizes.medium};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.onPrimary};
`;

export const AddButton = styled.span`
  cursor: pointer;
  font-size: 0px;
  align-self: center;
  cursor: pointer;
`;
