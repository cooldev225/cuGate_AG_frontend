import { createStore, applyMiddleware, compose } from "redux";
import Thunk from "redux-thunk";
import reducers from "./reducers";
import { routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";

export const history = createBrowserHistory();

const middleware = [Thunk, routerMiddleware(history)];
export const configureStore = (preloadedState: any) => {
  const store = createStore(
    reducers(history),
    preloadedState,
    compose(applyMiddleware(...middleware))
  );
  return store;
};
