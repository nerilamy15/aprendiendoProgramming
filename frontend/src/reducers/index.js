import { combineReducers } from "redux";
import error from "./error";
import auth from "./auth";
import userInfoReducer from "./user";

const allReducers = combineReducers({
  error,
  auth,
  userInfoReducer
});

export default allReducers;
