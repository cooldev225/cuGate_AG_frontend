import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import auth from "./auth";
const reducers = (history: any) =>
  combineReducers({
    router: connectRouter(history),
    auth,
  });
export default reducers;
