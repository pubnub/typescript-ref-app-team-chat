import { AppActions } from "main/AppActions";

export enum Breakpoint {
  Small,
  Medium,
  Large
}

export enum Layout {
  Left,
  Default,
  Right,
  Overlay
}

export const SET_LAYOUT = "SET_LAYOUT";

export interface setLayoutAction {
  type: typeof SET_LAYOUT;
  payload: Layout;
}

export const setLayout = (target: Layout): setLayoutAction => {
  return {
    type: SET_LAYOUT,
    payload: target
  };
};

export const SET_BREAKPOINT = "SET_BREAKPOINT";

export interface setBreakpointAction {
  type: typeof SET_BREAKPOINT;
  payload: Breakpoint;
}

export const setBreakpoint = (target: Breakpoint): setBreakpointAction => {
  return {
    type: SET_BREAKPOINT,
    payload: target
  };
};

interface LayoutState {
  breakpoint: Breakpoint;
  layout: Layout;
}

const initialState: LayoutState = {
  breakpoint: Breakpoint.Large,
  layout: Layout.Default
};

const LayoutStateReducer = (
  state: LayoutState = initialState,
  action: AppActions
): LayoutState => {
  switch (action.type) {
    case SET_LAYOUT:
      return { ...state, layout: action.payload };
    case SET_BREAKPOINT:
      return { ...state, breakpoint: action.payload };
  }
  return state;
};

export { LayoutStateReducer };
