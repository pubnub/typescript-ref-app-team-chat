import React from "react";
import {
  Heading,
  HeadingVariants,
  HeadingSizes
} from "foundations/components/presentation";
import renderWithTheme from "main/testing/render-with-theme";

describe("Heading", () => {
  test("default variant matches the snapshot", () => {
    const { container } = renderWithTheme(<Heading>Heading</Heading>);
    expect(container.firstChild).toMatchSnapshot();
  });

  test("inverse variant matches the snapshot", () => {
    const { container } = renderWithTheme(
      <Heading variant={HeadingVariants.INVERSE}>Heading</Heading>
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test("big size matches the snapshot", () => {
    const { container } = renderWithTheme(
      <Heading size={HeadingSizes.BIG}>Heading</Heading>
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
