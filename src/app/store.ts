import { createStore, applyMiddleware, compose, Store } from "redux";
import ReduxThunk, { ThunkAction, ThunkDispatch } from "redux-thunk";
import rootReducer from "app/rootReducer";
import { AppActions } from "app/AppActions";
import preloadedState from "mock-data/dummy-data";

/**
 * The shape of the global store
 */
export type RootState = Readonly<ReturnType<typeof rootReducer>>;

/**
 * Describe thunk configuraiton
 */
type extaArgumentFromThunkMiddlewareConfig = void;

/**
 * Describe a dispatch function that only allows application specific types
 */
type Dispatch = ThunkDispatch<
  RootState,
  extaArgumentFromThunkMiddlewareConfig,
  AppActions
>;

/**
 * Describe a Thunk with application specific types
 */
type ThunkReturnType = void;
export type ActionThunk = ThunkAction<
  ThunkReturnType,
  RootState,
  extaArgumentFromThunkMiddlewareConfig,
  AppActions
>;

/**
 * Describe the store
 */
type AppStore = Store<RootState, AppActions> & {
  dispatch: Dispatch;
};

export const composeEnhancers =
  (process.env.NODE_ENV === "development" &&
    window &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

// configure middlewares
const middlewares = [ReduxThunk];
// compose enhancers
const storeEnhancer = composeEnhancers(applyMiddleware(...middlewares));

const store: AppStore = createStore(rootReducer, preloadedState, storeEnhancer);
export default store;
