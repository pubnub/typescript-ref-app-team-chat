import React from "react";
import renderWithTheme from "main/testing/render-with-theme";
import { waitFor } from "@testing-library/react";
import { Drawer } from "foundations/components/layout";

describe("Drawer", () => {
  test("closed matches the snapshot", () => {
    const { container } = renderWithTheme(<Drawer>Drawer content</Drawer>);
    expect(container.firstChild).toMatchSnapshot();
  });

  test("opened matches the snapshot", async () => {
    const { container } = renderWithTheme(<Drawer open>Drawer content</Drawer>);

    await waitFor(() => {
      expect(container.firstChild).toBeVisible();
      expect(container.firstChild).toHaveStyle({
        transform: "translateX(0%) translateZ(0)"
      });
    });

    expect(container.firstChild).toMatchSnapshot();
  });

  test("on right edge wide matches the snapshot", async () => {
    const { container } = renderWithTheme(
      <Drawer edge="right" wide open>
        Drawer content
      </Drawer>
    );

    await waitFor(() => {
      expect(container.firstChild).toBeVisible();
      expect(container.firstChild).toHaveStyle({
        transform: "translateX(0%) translateZ(0)"
      });
    });

    expect(container.firstChild).toMatchSnapshot();
  });
});
