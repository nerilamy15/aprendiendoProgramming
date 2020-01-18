import axios from "axios";
import { returnMessages, snackOpen } from "../messagesActions";

import {
  EDITPROFILE_FAIL,
  DATA_LOADING,
  EDITUSER_SUCCESS,
  EDIT_USER
} from "../types";

/*export const editProfile = ({
  token,
  editedUserName,
  editedEmail,
  id
}) => dispatch => {
  dispatch({ type: DATA_LOADING });
  axios
    .patch(
      `http://localhost:5001/user/${id}`,
      {
        editedUserName,
        editedEmail
      },
      {
        headers: { "auth-token": token }
      }
    )
    .then(res => {
      dispatch({
        type: EDITUSER_SUCCESS,
        payload: {
          userName: res.data.user.userName,
          email: res.data.user.email
        }
      });
      let message = res.data.message;
      let messageCode = res.data.code;
      dispatch(returnMessages(messageCode, message));
      console.log(message, messageCode, res.data.user);
    })
    .catch(err => {
      let errorCode = err.response ? err.response.data.code : 500;
      let error = err.response && err.response.data.error;
      dispatch(returnMessages(errorCode, error));
      dispatch({
        type: EDITPROFILE_FAIL
      });
    });
};*/

export const editProfile = ({
  token,
  editedUserName,
  editedEmail,
  id
}) => async dispatch => {
  dispatch({ type: DATA_LOADING });
  try {
    let response = await axios.put(
      `http://localhost:5001/user/${id}`,
      {
        editedUserName,
        editedEmail
      },
      {
        headers: { "auth-token": token }
      }
    );
    let userName = response.data.user.userName;
    let email = response.data.user.email;
    dispatch({
      type: EDITUSER_SUCCESS,
      payload: {
        userName,
        email
      }
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
      type: EDITPROFILE_FAIL
    });
  }
};
