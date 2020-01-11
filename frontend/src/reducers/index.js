import { combineReducers } from "redux";
import messagesReducer from "./messagesReducer";
import authReducer from "./authReducer";
import fetchUsersReducer from "./fetchUsersReducer";
import postReducer from "./postsReducer";

const allReducers = combineReducers({
  messagesReducer,
  authReducer,
  fetchUsersReducer,
  postReducer
});

export default allReducers;
