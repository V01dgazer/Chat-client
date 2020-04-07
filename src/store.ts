import { createStore, applyMiddleware, compose } from "redux";
import thunk, { ThunkMiddleware } from "redux-thunk";
import reducers from "./reducers";
import { loadState } from "./localStorage";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const persistedState = loadState();

export type AppState = ReturnType<typeof reducers>;

const store = createStore(
  reducers,
  persistedState,
  composeEnhancers(
    applyMiddleware(thunk as ThunkMiddleware<AppState, any>)
  )
);

export default store;
