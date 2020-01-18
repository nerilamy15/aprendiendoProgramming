import axios from "axios";
import { returnMessages, snackOpen } from "../messagesActions";

import { DISLIKE_SUCCESS, DISLIKE_SUCCESS_FAIL } from "../types";

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
    dispatch({
      type: DISLIKE_SUCCESS
    });
    let message = response.data.message;
    let messageCode = response.data.code;
    dispatch(returnMessages(messageCode, message));
    dispatch(snackOpen());
    console.log(response.data.message, response.data.dislikes);
  } catch (err) {
    let errorCode = err.response ? err.response.data.code : 500;
    let error = err.response && err.response.data.error;
    dispatch(returnMessages(errorCode, error));
    dispatch({
      type: DISLIKE_SUCCESS_FAIL
    });
  }
};
