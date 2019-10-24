import { createSelector } from "reselect";
import { RootState } from "app/store";
import { Breakpoint, Layout } from "features/layout/store";

const getLayoutSlice = (state: RootState) => state.layout;

export const getBreakpoint = createSelector(
  [getLayoutSlice],
  (app: ReturnType<typeof getLayoutSlice>) => {
    return app.breakpoint;
  }
);

export const getLayout = createSelector(
  [getLayoutSlice],
  (app: ReturnType<typeof getLayoutSlice>) => {
    return app.layout;
  }
);

interface PanelStates {
  Left: boolean;
  Right: boolean;
  Overlay: boolean;
  Content: boolean;
  Top: boolean;
}

export const getPanelStates = createSelector(
  [getLayout, getBreakpoint],
  (
    layout: ReturnType<typeof getLayout>,
    breakpoint: ReturnType<typeof getBreakpoint>
  ) => {
    return {
      Left: layout === Layout.Left || breakpoint !== Breakpoint.Small,
      Right: layout === Layout.Right,
      Overlay: layout === Layout.Overlay,
      Content:
        breakpoint !== Breakpoint.Small ? true : layout === Layout.Default,
      Top: true
    };
  }
);
