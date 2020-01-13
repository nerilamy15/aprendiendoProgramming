import axios from "axios";
import { returnMessages } from "./messagesActions";

import { DISLIKE_SUCCESS, DISLIKE_SUCCESS_FAIL } from "./types";

/*export const dislikePost = ({ token, postId }) => dispatch => {
  axios
    .post(
      `http://localhost:5001/posts/${postId}/dislike`,
      {
        postId
      },
      {
        headers: { "auth-token": token }
      }
    )
    .then(res => {
      dispatch({
        type: DISLIKE_SUCCESS
      });
      console.log(res);
    })
    .catch(err => {
      let errorCode = err.response ? err.response.data.code : 500;
      let error = err.response && err.response.data.error;
      dispatch(returnMessages(errorCode, error));
      dispatch({
        type: DISLIKE_SUCCESS_FAIL
      });
    });
};*/

export const dislikePost = ({ token, postId }) => async dispatch => {
  try {
    let response = await axios.post(
      `http://localhost:5001/posts/${postId}/dislike`,
      {
        postId
      },
      {
        headers: { "auth-token": token }
      }
    );

    let data = response;
    dispatch({
      type: DISLIKE_SUCCESS
    });
    console.log(data);
  } catch (err) {
    let errorCode = err.response ? err.response.data.code : 500;
    let error = err.response && err.response.data.error;
    dispatch(returnMessages(errorCode, error));
    dispatch({
      type: DISLIKE_SUCCESS_FAIL
    });
  }
};
