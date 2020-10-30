import React from "react";
import renderWithTheme from "main/testing/render-with-theme";
import { ScrollView } from "foundations/components/layout";

describe("Scroll View", () => {
  test("default variant matches the snapshot", () => {
    const { container } = renderWithTheme(<ScrollView>Scroll View</ScrollView>);
    expect(container.firstChild).toMatchSnapshot();
  });
});
