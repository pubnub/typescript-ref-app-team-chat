import { Store } from "redux";
import { PubnubThunkContext } from "pubnub-redux";
import { RootState } from "./rootReducer";
import { AppActions } from "./AppActions";

/**
 * AppState describes the shape of the global Redux store in this application
 */
export type AppState = RootState;

/**
 * Describes what we are able to dispatch to the store in this application.
 *
 * This can be different that the actions which can be received by reducers
 * in the application.
 */
export interface AppDispatch {
  <T extends AppActions>(action: T): T;
  <R>(anyThunk: ThunkAction<R>): R;
}

/**
 * Describe thunk middleware context
 */
export type AppThunkContext = PubnubThunkContext;

/**
 * Describe a Thunk with application specific types.
 *
 * This is primarily used for describing the return value of a thunk action
 * creator function.  By declaring return values of this type, the types
 * of the dispatch, getState and extra argument parameters to the thunk can
 * be inferred and typechecked by TypeScript.
 */
export type ThunkAction<ThunkReturn = void> = (
  dispatch: AppDispatch,
  getState: () => AppState,
  context: AppThunkContext
) => ThunkReturn;

/**
 * AppStore Describes the global redux store for this application.
 *
 * We redefine the dispatch function to only accept valid dispatches
 * for our application.
 */
export type AppStore = Store<AppState, AppActions> & {
  dispatch: AppDispatch;
};
