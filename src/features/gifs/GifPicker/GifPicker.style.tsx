import styled from "styled-components/macro";
import { Wrapper as Gif } from "../Gif/Gif.style";
import attribution from "features/messages/GiphyMessageDisplay/attribution.png";

export const Wrapper = styled.div`
  border: ${({ theme }) => `${theme.borders.light} ${theme.colors.borderDark}`};
  border-radius: ${({ theme }) => theme.radii.light};
  padding: ${({ theme }) => theme.space[1]};
  background-color: ${({ theme }) => theme.backgrounds.panel};

  width: ${({ theme }) => `calc( 200px + ${theme.space[1]} * 2)`};

  @media screen and (min-width: 475px) {
    width: ${({ theme }) => `calc( 400px + ${theme.space[1]} * 3)`};
  }

  ${({ theme }) => theme.mediaQueries.medium} {
    width: ${({ theme }) => `calc( 200px + ${theme.space[1]} * 2)`};
  }

  @media screen and (min-width: 750px) {
    width: ${({ theme }) => `calc( 400px + ${theme.space[1]} * 3)`};
  }
`;

export const Search = styled.input`
  width: 100%;
  border: ${({ theme }) => `${theme.borders.light} ${theme.colors.borderDark}`};
  border-radius: ${({ theme }) => theme.radii.light};
  height: ${({ theme }) => theme.sizes[1]};
  padding: ${({ theme }) => theme.space[1]};
  color: ${({ theme }) => theme.colors.importantText};
  background-size: auto 18px;
  background-position: center right;
  background-repeat: no-repeat;

  background-image: unset;

  @media screen and (min-width: 475px) {
    background-image: url(${attribution});
  }

  ${({ theme }) => theme.mediaQueries.medium} {
    background-image: unset;
  }

  @media screen and (min-width: 750px) {
    background-image: url(${attribution});
  }

  :focus {
    outline: none;
  }
`;

export const Scroll = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  height: 400px;
  margin-top: ${({ theme }) => theme.space[1]};
`;

export const Results = styled.div`
  display: flex;

  ${Gif} > * {
    border-radius: ${({ theme }) => theme.radii.strong};
    cursor: pointer;
  }

  ${Gif}:not(:last-child) {
    margin-bottom: ${({ theme }) => theme.space[1]};
  }
`;

export const Column = styled.div`
  width: 200px;
  :not(:last-child) {
    margin-right: ${({ theme }) => theme.space[1]};
  }
`;

export const Group = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${({ theme }) => theme.space[1]};
`;

export const Marker = styled.div``;

export const Attribution = styled.img`
  margin-top: ${({ theme }) => theme.space[1]};
  height: 18px;

  @media screen and (min-width: 475px) {
    display: none;
  }

  ${({ theme }) => theme.mediaQueries.medium} {
    display: block;
  }

  @media screen and (min-width: 750px) {
    display: none;
  }
`;
