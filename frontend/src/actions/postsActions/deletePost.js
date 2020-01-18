import axios from "axios";
import { returnMessages, snackOpen } from "../messagesActions";
import { fetchPosts } from "./fetchPostsAction";

import { DELETE_POST, FAIL_DELETE_POST, POSTS_LOADING } from "../types";

export const deletePost = ({ token, postId }) => async dispatch => {
  try {
    let response = await axios.delete(`http://localhost:5001/posts/${postId}`, {
      headers: { "auth-token": token }
    });
    dispatch({
      type: DELETE_POST
    });
    let message = response.data.message;
    let messageCode = response.data.code;
    dispatch(returnMessages(messageCode, message));
    dispatch(snackOpen());
    dispatch(fetchPosts());
  } catch (err) {
    let errorCode = err.response ? err.response.data.code : 500;
    let error = err.response && err.response.data.error;
    dispatch(returnMessages(errorCode, error));
    dispatch({
      type: FAIL_DELETE_POST
    });
  }
};
