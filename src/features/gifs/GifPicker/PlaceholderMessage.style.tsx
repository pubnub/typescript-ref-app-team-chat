import styled from "styled-components/macro";

export const Message = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 390px;
  color ${({ theme }) => theme.colors.importantText};
  
  img, video {
    border-radius: ${({ theme }) => theme.radii.strong};
    cursor: pointer;
    margin-bottom:  ${({ theme }) => theme.space[1]};
  }
`;
