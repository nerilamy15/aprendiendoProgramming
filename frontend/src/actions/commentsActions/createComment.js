import axios from "axios";
import { returnMessages, snackOpen } from "../messagesActions";
import { fetchComments } from "./fetchComments";
import { LOADING, SUCCESS_COMMENT, FAIL_COMMENT } from "../types";

export const createComment = ({
  surName,
  comment,
  avatar,
  id,
  token
}) => async dispatch => {
  dispatch({ type: LOADING });
  try {
    let response = await axios.post(
      `http://localhost:5001/post/${id}/comments`,
      {
        surName,
        comment,
        avatar,
        id
      },
      {
        headers: { "auth-token": token }
      }
    );
    let data = response.data;
    dispatch({
      type: SUCCESS_COMMENT
      // payload: response.data.savedComment
    });
    let message = response.data.message;
    let messageCode = response.data.code;
    dispatch(returnMessages(messageCode, message));
    console.log(response, message, messageCode);
    dispatch(snackOpen());
    dispatch(fetchComments());
  } catch (err) {
    let errorCode = err.response ? err.response.data.code : 500;
    let error = err.response && err.response.data.error;
    dispatch(returnMessages(errorCode, error));
    dispatch({
      type: FAIL_COMMENT
    });
    errorCode === 500 && dispatch(snackOpen());
  }
};
