import { createGlobalStyle } from "styled-components";
import { Theme } from "../Theme";

const GlobalStyles = createGlobalStyle<{ theme: Theme }>`
  body {
    color: ${({ theme }) => theme.colors.importantText};
    font-family: ${({ theme }) => theme.fonts.app};
    font-size: ${({ theme }) => theme.fontSizes.regular};
    font-weight: ${({ theme }) => theme.fontWeights.regular};
    margin: ${({ theme }) => theme.space[0]};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  * {
    box-sizing: border-box;
    margin: 0;
  }

  body,
  html,
  #root {
    height: 100%;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`;

export default GlobalStyles;
