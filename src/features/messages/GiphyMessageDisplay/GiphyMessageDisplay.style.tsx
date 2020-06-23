import styled from "styled-components/macro";
import { Wrapper as Gif } from "features/gifs/Gif/Gif.style";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  white-space: pre-wrap;
  border-radius: ${({ theme }) => theme.radii.strong};
  width: fit-content;
  text-align: left;
  background: ${({ theme }) => theme.backgrounds.message};
  box-shadow: ${({ theme }) => theme.shadows[1]};

  ${Gif} > * {
    border-radius: ${({ theme }) => theme.radii.strong};
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
  }
`;

export const ByLine = styled.div`
  display: flex;
  height: ${({ theme }) => theme.sizes[1]};
  padding: 0px ${({ theme }) => theme.space[4]};
  font-weight: ${({ theme }) => theme.fontWeights.light};
  align-items: center;
  justify-content: space-between;
`;

export const Source = styled.a`
  color: ${({ theme }) => theme.colors.active};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  text-decoration: none;
`;

export const Attribution = styled.img`
  height: ${({ theme }) => theme.space[4]};
`;
