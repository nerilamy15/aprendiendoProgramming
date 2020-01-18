import axios from "axios";
import { returnMessages, snackOpen } from "../messagesActions";
import { fetchPosts } from "./fetchPostsAction";

import { CREATE_POST_SUCCESS, CREATE_POST_FAIL, LOADING } from "../types";

/*export const createPost = ({
  name,
  email,
  post,
  token,
  id,
  avatar
}) => dispatch => {
  dispatch({ type: LOADING });
  axios
    .post(
      "http://localhost:5001/createPost",
      {
        name,
        email,
        post,
        avatar,
        id
      },
      {
        headers: { "auth-token": token }
      }
    )
    .then(res => {
      dispatch({
        type: CREATE_POST_SUCCESS
      });
      dispatch(snackOpen());
      dispatch(fetchPosts());
    })
    .catch(err => {
      let errorCode = err.response ? err.response.data.code : 500;
      let error = err.response && err.response.data.error;
      dispatch(returnMessages(errorCode, error));
      dispatch({
        type: CREATE_POST_FAIL
      });
    });
};*/
///////////////////////////////////////////////////////////////
export const createPost = ({
  name,
  email,
  post,
  id,
  token,
  avatar
}) => async dispatch => {
  dispatch({ type: LOADING });
  try {
    let response = await axios.post(
      "http://localhost:5001/createPost",
      {
        name,
        email,
        post,
        id,
        avatar
      },
      {
        headers: { "auth-token": token }
      }
    );
    dispatch({
      type: CREATE_POST_SUCCESS
    });
    let message = response.data.message;
    let messageCode = response.data.code;
    dispatch(returnMessages(messageCode, message));
    console.log(response, message, messageCode);
    dispatch(snackOpen());
    dispatch(fetchPosts());
  } catch (err) {
    let errorCode = err.response ? err.response.data.code : 500;
    let error = err.response && err.response.data.error;
    dispatch(returnMessages(errorCode, error));
    dispatch({
      type: CREATE_POST_FAIL
    });
    errorCode === 500 && dispatch(snackOpen());
  }
};
