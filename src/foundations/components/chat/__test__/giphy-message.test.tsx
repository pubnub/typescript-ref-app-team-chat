import React from "react";
import { GiphyMessage } from "foundations/components/chat";
import renderWithTheme from "main/testing/render-with-theme";
import { gif } from "./attachments";
import { mockIntersectionObserver } from "./mockIntersectionObserver";

beforeAll(() => {
  mockIntersectionObserver();
});

describe("GiphyMessage", () => {
  test("example gif matches the snapshot", () => {
    const { container } = renderWithTheme(
      <GiphyMessage
        title={gif.title}
        url={gif.gif.url}
        author={gif.gif.user.username}
      />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it("includes the title", () => {
    const { getByText } = renderWithTheme(
      <GiphyMessage
        title={gif.title}
        url={gif.gif.url}
        author={gif.gif.user.username}
      />
    );
    expect(getByText(gif.title)).toBeTruthy();
  });

  it("credits the author", () => {
    const { getByText } = renderWithTheme(
      <GiphyMessage
        title={gif.title}
        url={gif.gif.url}
        author={gif.gif.user.username}
      />
    );
    expect(getByText(gif.gif.username, { exact: false })).toBeTruthy();
  });

  it("provides GIPHY attribution", () => {
    const { getByAltText } = renderWithTheme(
      <GiphyMessage
        title={gif.title}
        url={gif.gif.url}
        author={gif.gif.user.username}
      />
    );
    expect(getByAltText("powered by GIPHY")).toBeTruthy();
  });
});
