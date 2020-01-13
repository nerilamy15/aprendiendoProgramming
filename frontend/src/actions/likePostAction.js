import axios from "axios";
import { returnMessages } from "./messagesActions";

import { LIKE_SUCCESS, LIKE_FAIL } from "./types";

/*export const likePost = ({ token, postId }) => dispatch => {
  axios
    .post(
      `http://localhost:5001/posts/${postId}/likes`,
      {
        postId
      },
      {
        headers: { "auth-token": token }
      }
    )
    .then(res => {
      dispatch({
        type: LIKE_SUCCESS
      });
      console.log(res);
    })
    .catch(err => {
      let errorCode = err.response ? err.response.data.code : 500;
      let error = err.response && err.response.data.error;
      dispatch(returnMessages(errorCode, error));
      dispatch({
        type: LIKE_FAIL
      });
    });
};*/

export const likePost = ({ token, postId }) => async dispatch => {
  try {
    let response = await axios.post(
      `http://localhost:5001/posts/${postId}/likes`,
      {
        postId
      },
      {
        headers: { "auth-token": token }
      }
    );
    dispatch({
      type: LIKE_SUCCESS
    });
    console.log(response.data.message);
  } catch (err) {
    let errorCode = err.response ? err.response.data.code : 500;
    let error = err.response && err.response.data.error;
    dispatch(returnMessages(errorCode, error));
    dispatch({
      type: LIKE_FAIL
    });
  }
};
