import React from "react";
import renderWithTheme from "main/testing/render-with-theme";
import { fireEvent } from "@testing-library/react";
import { Dropdown } from "foundations/components/layout";
import { Icons } from "foundations/components/presentation";

describe("Picker", () => {
  test("matches the snapshot", () => {
    const { container } = renderWithTheme(
      <Dropdown
        icon={Icons.Add}
        title="show picker"
        render={() => <div></div>}
      ></Dropdown>
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test("content is hidden by default", () => {
    const { getByText } = renderWithTheme(
      <div>
        <Dropdown
          icon={Icons.Add}
          title="show picker"
          render={() => <p>content</p>}
        ></Dropdown>
      </div>
    );
    // should not be showing the content
    expect(() => {
      getByText("content");
    }).toThrow();
  });

  test("content is shown after clicking icon", () => {
    const { getByText, getByTitle } = renderWithTheme(
      <div>
        <Dropdown
          icon={Icons.Add}
          title="show picker"
          render={() => <p>content</p>}
        ></Dropdown>
      </div>
    );
    const icon = getByTitle("show picker");
    fireEvent.click(icon);
    // should not be showing the content
    expect(getByText("content")).toBeTruthy();
  });

  test("content is hidden after clicking outside", () => {
    const { getByText, getByTitle } = renderWithTheme(
      <div>
        <p>outside</p>
        <Dropdown
          icon={Icons.Add}
          title="show picker"
          render={() => <p>content</p>}
        ></Dropdown>
      </div>
    );
    const outside = getByText("outside");
    const icon = getByTitle("show picker");
    fireEvent.click(icon);
    fireEvent.click(outside);
    // should not be showing the content
    expect(() => {
      getByText("content");
    }).toThrow();
  });

  test("render prop hides content", () => {
    const { getByText, getByTitle } = renderWithTheme(
      <div>
        <Dropdown
          icon={Icons.Add}
          title="show picker"
          render={dismiss => {
            return (
              <button
                onClick={() => {
                  dismiss();
                }}
              >
                content
              </button>
            );
          }}
        ></Dropdown>
      </div>
    );
    const icon = getByTitle("show picker");
    fireEvent.click(icon);
    const childButton = getByText("content");
    fireEvent.click(childButton);
    // should not be showing the content
    expect(() => {
      getByText("content");
    }).toThrow();
  });
});
