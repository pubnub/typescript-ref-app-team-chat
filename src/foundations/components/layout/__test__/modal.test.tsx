import React from "react";
import renderWithTheme from "main/testing/render-with-theme";
import { Modal } from "foundations/components/layout";

describe("Modal", () => {
  test("closed variant matches the snapshot", () => {
    renderWithTheme(<Modal>Modal content</Modal>);
    expect(document.body).toMatchSnapshot();
  });

  test("opened variant matches the snapshot", () => {
    renderWithTheme(<Modal open>Modal content</Modal>);
    expect(document.body).toMatchSnapshot();
  });
});
