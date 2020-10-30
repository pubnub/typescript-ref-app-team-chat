import React from "react";
import renderWithTheme from "main/testing/render-with-theme";
import { FlexRow } from "foundations/components/layout";

describe("FlexRow", () => {
  test("default variant matches the snapshot", () => {
    const { container } = renderWithTheme(<FlexRow>Flex Row</FlexRow>);
    expect(container.firstChild).toMatchSnapshot();
  });
});
