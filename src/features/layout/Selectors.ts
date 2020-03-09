import { createSelector } from "reselect";
import { AppState } from "main/storeTypes";
import { View } from "./LayoutReducer";

const getLayoutSlice = (state: AppState) => state.layout;

export const getView = createSelector(
  [getLayoutSlice],
  (app: ReturnType<typeof getLayoutSlice>) => {
    return app.views[0];
  }
);

export const getViews = createSelector(
  [getLayoutSlice],
  (app: ReturnType<typeof getLayoutSlice>) => {
    return app.views;
  }
);

export const getViewStates = createSelector(
  [getViews],
  (views: ReturnType<typeof getViews>) => {
    return {
      Menu: views.includes(View.Menu),
      ConversationMembers: views.includes(View.ConversationMembers),
      JoinConversation: views.includes(View.JoinConversation),
      CurrentConversation: views.includes(View.CurrentConversation)
    };
  }
);
