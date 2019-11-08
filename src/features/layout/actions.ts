import { Breakpoint, Layout, setLayout, setBreakpoint } from "./store";
import { getBreakpoint, getLayout } from "./selectors";

import { ThunkAction } from "main/storeTypes";

export function setLayoutDefault() {
  return setLayout(Layout.Default);
}

export function setLayoutLeft() {
  return setLayout(Layout.Left);
}

export function setLayoutOverlay() {
  return setLayout(Layout.Overlay);
}

export function setLayoutRight() {
  return setLayout(Layout.Right);
}

export const resize = (width: number): ThunkAction => {
  let targetBreakpoint = Breakpoint.Small;
  if (width > 1200) {
    targetBreakpoint = Breakpoint.Large;
  } else if (width > 480) {
    targetBreakpoint = Breakpoint.Medium;
  }

  return (dispatch, getState) => {
    const previousBreakpoint = getBreakpoint(getState());
    if (targetBreakpoint === previousBreakpoint) {
      return;
    }
    const previousLayout = getLayout(getState());
    if (targetBreakpoint !== Breakpoint.Small) {
      if (
        (previousLayout === Layout.Left || previousLayout === Layout.Right) &&
        previousBreakpoint === Breakpoint.Small
      ) {
        dispatch(setLayout(Layout.Default));
      }
    }
    dispatch(setBreakpoint(targetBreakpoint));
  };
};
