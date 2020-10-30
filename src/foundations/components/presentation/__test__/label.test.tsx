import React from "react";
import {
  Label,
  LabelVariants,
  LabelSizes
} from "foundations/components/presentation";
import renderWithTheme from "main/testing/render-with-theme";

describe("Label", () => {
  test("default variant matches the snapshot", () => {
    const { container } = renderWithTheme(<Label>Label</Label>);
    expect(container.firstChild).toMatchSnapshot();
  });

  test("inverse variant matches the snapshot", () => {
    const { container } = renderWithTheme(
      <Label variant={LabelVariants.INVERSE}>Label</Label>
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test("active variant matches the snapshot", () => {
    const { container } = renderWithTheme(
      <Label variant={LabelVariants.ACTIVE}>Label</Label>
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test("small size matches the snapshot", () => {
    const { container } = renderWithTheme(
      <Label size={LabelSizes.SMALL}>Label</Label>
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
