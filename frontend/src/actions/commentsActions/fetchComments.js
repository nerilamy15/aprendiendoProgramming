import axios from "axios";
import { FETCH_COMMENTS, FETCH_POSTS_FAIL, COMMENTS_LOADING } from "../types";
import { returnMessages } from "../messagesActions";

export const fetchComments = () => async dispatch => {
  try {
    let response = await axios.get(`http://localhost:5001/comments`);
    //let data = response.data.comments;
    dispatch({
      type: FETCH_COMMENTS,
      payload: {
        comments: response.data.comments
      }
    });
    console.log(response);
  } catch (err) {
    let errorCode = err.response ? err.response.data.code : 500;
    let error = err.response && err.response.data.error;
    dispatch(returnMessages(errorCode, error));
    dispatch({
      type: FETCH_POSTS_FAIL
    });
  }
};
