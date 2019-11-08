import { Store } from "redux";
import { RootState } from "./rootReducer";
import { AppActions } from "./AppActions";

/**
 * AppState describes the shape of the global Redux store in this application
 */
export type AppState = RootState;

/**
 * Describes a function that describes what we are able to dispatch to the
 * store in this application.
 */
export interface AppDispatch {
  <T extends AppActions>(action: T): T;
  <R>(anyThunk: ThunkAction<R>): R;
}

/**
 * This should be defined by the Redux SDK
 */
interface PubNubThunkContext {
  api: any;
}

/**
 * Describe thunk middleware context
 */
export interface AppThunkContext {
  pubnub: PubNubThunkContext;
}

/**
 * Describe a Thunk with application specific types.
 *
 * This is primarily used for describing the return value of a thunk action
 * creator function.  By declaring return values of this type, the types
 * of the dispatch, getState and extra argument parameters to the thunk can
 * be inferred and typechecked by TypeScript.
 *
 * This type is determining which types of actions (including thunks) which
 * can be dispatched from within a thunk declared with this type, which is
 * different that the set of actions which can be received by a reducer.
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
