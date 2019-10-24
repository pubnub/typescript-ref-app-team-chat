import {
  Breakpoint,
  Layout,
  setLayout,
  setBreakpoint
} from "features/layout/store";
import { getBreakpoint, getLayout } from "features/layout/selectors";

import { ActionThunk } from "app/store";

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

export const resize = (width: number): ActionThunk => {
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
