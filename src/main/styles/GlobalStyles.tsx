import { createGlobalStyle } from "styled-components";
import { Theme } from "../Theme";

const GlobalStyles = createGlobalStyle<{ theme: Theme }>`
 body {
  font-family: ${({ theme }) => theme.fonts.app};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  margin: ${({ theme }) => theme.space[0]};
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
* {
  box-sizing: border-box;
}
body,
html,
#root {
  height: 100%;
}
`;

export default GlobalStyles;
