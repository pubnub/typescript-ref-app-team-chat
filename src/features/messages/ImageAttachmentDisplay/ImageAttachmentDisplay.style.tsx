import styled from "styled-components/macro";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column-reverse;
  white-space: pre-wrap;
  border-radius: ${({ theme }) => theme.radii.strong};
  width: fit-content;
  text-align: left;
  background: ${({ theme }) => theme.backgrounds.message};
  box-shadow: ${({ theme }) => theme.shadows[1]};
`;

export const Media = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center center;
  border-radius: ${({ theme }) => theme.radii.strong};
`;
