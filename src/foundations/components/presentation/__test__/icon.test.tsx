import React from "react";
import { Icon, Icons } from "foundations/components/presentation";
import renderWithTheme from "main/testing/render-with-theme";

describe("Icon", () => {
  test("add icon matches the snapshot", () => {
    const { container } = renderWithTheme(
      <Icon icon={Icons.Add} title="Title" />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test("back icon matches the snapshot", () => {
    const { container } = renderWithTheme(
      <Icon icon={Icons.Back} title="Title" />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test("cross icon matches the snapshot", () => {
    const { container } = renderWithTheme(
      <Icon icon={Icons.Cross} title="Title" />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test("emoji icon matches the snapshot", () => {
    const { container } = renderWithTheme(
      <Icon icon={Icons.Emoji} title="Title" />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test("giphy icon matches the snapshot", () => {
    const { container } = renderWithTheme(
      <Icon icon={Icons.Giphy} title="Title" />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test("leave icon matches the snapshot", () => {
    const { container } = renderWithTheme(
      <Icon icon={Icons.Leave} title="Title" />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test("logo icon matches the snapshot", () => {
    const { container } = renderWithTheme(
      <Icon icon={Icons.Logo} title="Title" />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test("people icon matches the snapshot", () => {
    const { container } = renderWithTheme(
      <Icon icon={Icons.People} title="Title" />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test("presence icon matches the snapshot", () => {
    const { container } = renderWithTheme(
      <Icon icon={Icons.Presence} title="Title" />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test("search icon matches the snapshot", () => {
    const { container } = renderWithTheme(
      <Icon icon={Icons.Search} title="Title" />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test("send icon matches the snapshot", () => {
    const { container } = renderWithTheme(
      <Icon icon={Icons.Send} title="Title" />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test("clickable variant matches the snapshot", () => {
    const { container } = renderWithTheme(<Icon icon={Icons.Add} clickable />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
