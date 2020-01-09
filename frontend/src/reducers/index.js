import { combineReducers } from "redux";
import messagesReducer from "./messagesReducer";
import authReducer from "./authReducer";
import userInfoReducer from "./userInfoReducer";
import fetchUsersReducer from "./fetchUsersReducer";

const allReducers = combineReducers({
  messagesReducer,
  authReducer,
  userInfoReducer,
  fetchUsersReducer
});

export default allReducers;
