import styled from "styled-components/macro";

export const Popup = styled.div`
  position: relative;
`;

export const Suggestions = styled.section`
  position: absolute;
  bottom: 0;
  z-index: 600;
  border: 1px solid lightgray;
  border-radius: 5px;
  max-height: 400px;
  overflow-y: scroll;
  min-width: 450px;
`;

export const Heading = styled.div`
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  border-bottom: 1px solid lightgray;
  padding: 5px;
  background-color: white;
  font-size: 14px;
`;

export const EmojiSearchTerm = styled.span`
  font-weight: bold;
`;

export const Results = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  padding: 5px;
  min-height: 20px;
  background-color: white;

  @media ${props => props.theme.breakpoint.mediaQuery.small} {
    flex-direction: row;
    flex-wrap: wrap;
  }
`;

export const Result = styled.span`
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  font-size: 18px;
  flex-grow: 1;

  &:hover {
    background-color: #ce1901;
    color: #ffffff;
  }

  @media ${props => props.theme.breakpoint.mediaQuery.small} {
    padding: 2px 6px;
    flex-grow: 0;
  }
`;

export const Emoji = styled.span`
  line-height: 18px;
`;

export const Colons = styled.span`
  font-size: 0.7em;
  padding-right: 0.5em;
`;
