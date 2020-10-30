import React from "react";
import { ThemeProvider } from "styled-components";
import { render } from "@testing-library/react";
import "jest-styled-components";
import "@testing-library/jest-dom";

import { appTheme } from "../Theme";

export default (Component: JSX.Element) => {
  return render(<ThemeProvider theme={appTheme}>{Component}</ThemeProvider>);
};
