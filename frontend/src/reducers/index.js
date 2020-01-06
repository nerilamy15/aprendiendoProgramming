import { combineReducers } from "redux";
import errorsReducer from "./errorsReducer";
import authReducer from "./authReducer";
import userInfoReducer from "./userInfoReducer";

const allReducers = combineReducers({
  errorsReducer,
  authReducer,
  userInfoReducer
});

export default allReducers;
