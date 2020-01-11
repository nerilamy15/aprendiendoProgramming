import axios from "axios";
import { returnMessages } from "./messagesActions";

import { EDITPROFILE_FAIL, DATA_LOADING, EDITUSER_SUCCESS } from "./types";

export const editProfile = ({
  token,
  editedName,
  editedEmail,
  id
}) => dispatch => {
  dispatch({ type: DATA_LOADING });
  axios
    .patch(
      `http://localhost:5001/user/${id}`,
      {
        editedName,
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
          name: res.data.user.name,
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
};
