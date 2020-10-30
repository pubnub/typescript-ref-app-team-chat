import React from "react";
import { Avatar, AvatarVariants } from "foundations/components/chat";
import renderWithTheme from "main/testing/render-with-theme";

describe("Avatar", () => {
  test("default variant matches the snapshot", () => {
    const { container } = renderWithTheme(<Avatar>AV</Avatar>);
    expect(container.firstChild).toMatchSnapshot();
  });

  test("round variant matches the snapshot", () => {
    const { container } = renderWithTheme(
      <Avatar variant={AvatarVariants.ROUND}>RA</Avatar>
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test("with string color/bg matches the snapshot", () => {
    const { container } = renderWithTheme(
      <Avatar color="red" bg="black">
        CA
      </Avatar>
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
