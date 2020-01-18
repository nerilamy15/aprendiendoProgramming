import axios from "axios";
import { returnMessages, snackOpen } from "./messagesActions";
import { UPLOAD_IMAGE_SUCESS, UPLOAD_IMAGE_FAIL, DATA_LOADING } from "./types";

export const postImage = ({ id, avatar }) => async dispatch => {
  dispatch({ type: DATA_LOADING });
  try {
    let response = await axios.patch(
      `http://localhost:5001/user/${id}/profile/updateAvatar`,
      avatar,
      id,
      {
        headers: { "Content-Type": "multipart/form-data" }
      }
    );
    dispatch({
      type: UPLOAD_IMAGE_SUCESS
    });
    dispatch(snackOpen());
    let message = response.data.message;
    let messageCode = response.data.code;
    dispatch(returnMessages(messageCode, message));
    console.log(response);
  } catch (err) {
    let errorCode = err.response ? err.response.data.code : 500;
    let error = err.response && err.response.data.error;
    dispatch(returnMessages(errorCode, error));
    dispatch({
      type: UPLOAD_IMAGE_FAIL
    });
  }
};
