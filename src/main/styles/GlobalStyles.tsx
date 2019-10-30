import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

    body {
        font-family: 'Roboto', sans-serif;
        font-weight:400;
        margin: 0;
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
