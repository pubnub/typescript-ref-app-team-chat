import React from "react";
import { LinkMessage } from "foundations/components/chat";
import renderWithTheme from "main/testing/render-with-theme";
import { link } from "./attachments";

const isLink = (element: HTMLElement): element is HTMLAnchorElement => {
  return element.tagName === "A";
};

describe("Link Message", () => {
  test("example link matches the snapshot", () => {
    const { container } = renderWithTheme(<LinkMessage {...link} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it("includes the orignal link", () => {
    const { getByText } = renderWithTheme(<LinkMessage {...link} />);
    const title = getByText(link.title);
    // should be a link
    expect(isLink(title)).toBe(true);
    // links without terminating / have it added
    expect(isLink(title) && title.href).toMatch(new RegExp(`${link.url}\\/?`));
  });
});
