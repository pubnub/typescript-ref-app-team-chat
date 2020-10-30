import React from "react";
import { ImageMessage } from "foundations/components/chat";
import renderWithTheme from "main/testing/render-with-theme";
import { image } from "./attachments";

describe("Images Message", () => {
  test("example matches the snapshot", () => {
    const { container } = renderWithTheme(<ImageMessage image={image} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
