import React from "react";
import renderWithTheme from "main/testing/render-with-theme";
import { Button } from "foundations/components/presentation";

describe("Button", () => {
  test("default matches the snapshot", () => {
    const { container } = renderWithTheme(<Button>Button</Button>);
    expect(container.firstChild).toMatchSnapshot();
  });

  test("hover background the snapshot", () => {
    const { container } = renderWithTheme(
      <Button hoverBg="red">Button</Button>
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
