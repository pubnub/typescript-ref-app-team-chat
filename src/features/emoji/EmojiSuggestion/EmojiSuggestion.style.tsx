import styled from "styled-components/macro";

export const Popup = styled.div`
  position: relative;
`;

export const Suggestions = styled.section`
  position: absolute;
  bottom: 0;
  overflow-y: scroll;
  z-index: 100;
  max-height: ${({ theme }) => theme.sizes[4]};
  border: ${({ theme }) =>
    `${theme.borders.light} ${theme.colors.borderLight}`};
  border-radius: ${({ theme }) => theme.radii.light};
  color: ${({ theme }) => theme.colors.importantText};
`;

export const Heading = styled.div`
  border-top-left-radius: ${({ theme }) => theme.radii.light};
  border-top-right-radius: ${({ theme }) => theme.radii.light};
  border-bottom: ${({ theme }) =>
    `${theme.borders.light} ${theme.colors.borderLight}`};
  padding: ${({ theme }) => theme.space[1]};
  font-size: ${({ theme }) => theme.fontSizes.regular};
  background: ${({ theme }) => theme.backgrounds.panel};
`;

export const EmojiSearchTerm = styled.span`
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

export const Results = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  border-bottom-left-radius: ${({ theme }) => theme.radii.light};
  border-bottom-right-radius: ${({ theme }) => theme.radii.light};
  padding: ${({ theme }) => theme.space[1]};
  background: ${({ theme }) => theme.backgrounds.panel};
  ${({ theme }) => theme.mediaQueries.medium} {
    flex-direction: column;
    flex-wrap: nowrap;
  }
`;

export const Result = styled.span`
  cursor: pointer;
  flex-grow: 0;
  border-radius: ${({ theme }) => theme.radii.light};
  padding: ${({ theme }) => `${theme.space[1]} ${theme.space[2]}`};
  font-size: ${({ theme }) => theme.fontSizes.medium};
  &:hover {
    background-color: ${({ theme }) => theme.colors.active};
    color: ${({ theme }) => theme.colors.activeText};
  }
  ${({ theme }) => theme.mediaQueries.medium} {
    padding: ${({ theme }) => theme.space[2]};
    flex-grow: 1;
  }
`;

export const Emoji = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.regular};
`;

export const Colons = styled.span`
  padding-right: 0.5em;
  font-size: ${({ theme }) => theme.fontSizes.small};
`;
