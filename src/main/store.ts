import { createStore, applyMiddleware, compose } from "redux";
import ReduxThunk from "redux-thunk";
import rootReducer from "./rootReducer";
import { AppStore, AppThunkContext } from "./storeTypes";
import preloadedState from "./preloadedState";

// Setup Redux Dev Tools
export const composeEnhancers =
  (process.env.NODE_ENV === "development" &&
    window &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

// Note: we do not attempt to make the proper types by passing
// types to the parameters of createStore.  The type definitions there are tricky
// to work with and possibly buggy as of Redux 4.0.4.
// Instead, we create a definition of the final store we want and declare the
// CreateAppStore to return that type of store.

/**
 * Create a redux store configured for this application
 */
export const createAppStore = (thunkContext: AppThunkContext): AppStore => {
  const storeEnhancer = composeEnhancers(
    applyMiddleware(ReduxThunk.withExtraArgument(thunkContext))
  );

  return createStore(rootReducer, preloadedState, storeEnhancer);
};
