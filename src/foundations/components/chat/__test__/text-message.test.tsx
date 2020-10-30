import React from "react";
import { TextMessage } from "foundations/components/chat";
import renderWithTheme from "main/testing/render-with-theme";

describe("Text Message", () => {
  test("emoji only message matches the snapshot", () => {
    const { container } = renderWithTheme(<TextMessage text="😃😃😃" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test("regular text message matches the snapshot", () => {
    const { container } = renderWithTheme(
      <TextMessage text="This is a plain old text message." />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it("doesn't mutate the text", () => {
    const text = `This is a random number ${Math.random() * 10}`;
    const { getByText } = renderWithTheme(<TextMessage text={text} />);
    expect(getByText(text)).toBeTruthy();
  });
});
