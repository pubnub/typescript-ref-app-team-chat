import React from "react";
import renderWithTheme from "main/testing/render-with-theme";
import { Textarea } from "foundations/components/presentation";

describe("Textarea", () => {
  test("default matches the snapshot", () => {
    const { container } = renderWithTheme(<Textarea />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
