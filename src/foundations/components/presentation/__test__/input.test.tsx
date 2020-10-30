import React from "react";
import renderWithTheme from "main/testing/render-with-theme";
import { Input } from "foundations/components/presentation";

describe("Input", () => {
  test("default matches the snapshot", () => {
    const { container } = renderWithTheme(<Input />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
