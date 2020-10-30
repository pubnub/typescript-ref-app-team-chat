import React from "react";
import renderWithTheme from "main/testing/render-with-theme";
import { StyledBox } from "foundations/components/layout";

describe("StyledBox", () => {
  test("default variant matches the snapshot", () => {
    const { container } = renderWithTheme(<StyledBox>Scroll View</StyledBox>);
    expect(container.firstChild).toMatchSnapshot();
  });

  test("with some props matches the snapshot", () => {
    const { container } = renderWithTheme(
      <StyledBox height={200} width={200} margin={1} padding={1}>
        Scroll View
      </StyledBox>
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
