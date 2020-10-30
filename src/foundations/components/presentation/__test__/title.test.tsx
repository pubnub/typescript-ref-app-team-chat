import React from "react";
import renderWithTheme from "main/testing/render-with-theme";
import {
  Title,
  HeadingVariants,
  HeadingSizes,
  LabelVariants,
  LabelSizes
} from "foundations/components/presentation";

describe("Title", () => {
  test("default matches the snapshot", () => {
    const { container } = renderWithTheme(
      <Title heading="Heading" label="Label"></Title>
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test("with capitalization matches the snapshot", () => {
    const { container } = renderWithTheme(
      <Title heading="Heading" label="Label" capitalize></Title>
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test("with heading props matches the snapshot", () => {
    const { container } = renderWithTheme(
      <Title
        heading="Heading"
        label="Label"
        headingProps={{
          variant: HeadingVariants.INVERSE,
          size: HeadingSizes.BIG
        }}
      ></Title>
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test("with label props matches the snapshot", () => {
    const { container } = renderWithTheme(
      <Title
        heading="Heading"
        label="Label"
        labelProps={{
          variant: LabelVariants.INVERSE,
          size: LabelSizes.SMALL
        }}
      ></Title>
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
