import axios from "axios";
import { returnMessages } from "./messagesActions";

import { CREATE_POST_SUCCESS, CREATE_POST_FAIL, POSTS_LOADING } from "./types";

/*export const createPost = ({ name, email, post, token }) => dispatch => {
  dispatch({ type: POSTS_LOADING });
  axios
    .post(
      "http://localhost:5001/createPost",
      {
        name,
        email,
        post
      },
      {
        headers: { "auth-token": token }
      }
    )
    .then(res => {
      dispatch({
        type: CREATE_POST_SUCCESS
      });
      console.log(res);
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
export const createPost = ({ name, email, post, token }) => async dispatch => {
  await dispatch({ type: POSTS_LOADING });

  try {
    let response = await axios.post(
      "http://localhost:5001/createPost",
      {
        name,
        email,
        post
      },
      {
        headers: { "auth-token": token }
      }
    );
    let data = response.data;
    dispatch({
      type: CREATE_POST_SUCCESS
    });
    console.log(data);
  } catch (err) {
    let errorCode = err.response ? err.response.data.code : 500;
    let error = err.response && err.response.data.error;
    dispatch(returnMessages(errorCode, error));
    dispatch({
      type: CREATE_POST_FAIL
    });
  }
};
