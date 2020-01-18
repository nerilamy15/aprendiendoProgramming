import { combineReducers } from "redux";
import messagesReducer from "./messagesReducer";
import authReducer from "./authReducer";
import fetchUsersReducer from "./fetchUsersReducer";
import postReducer from "./postsReducer";
import commentsReducer from "./commentsReducer";

const allReducers = combineReducers({
  messagesReducer,
  authReducer,
  fetchUsersReducer,
  postReducer,
  commentsReducer
});

export default allReducers;
