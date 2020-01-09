import axios from "axios";
import { returnMessages } from "./messagesActions";

import { EDIT_PROFILE, EDITPROFILE_FAIL, DATA_LOADING } from "./types";

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
        type: EDIT_PROFILE,
        payload: {
          users: res.data.updatedProfile
        }
      });
      let message = res.data.message;
      let messageCode = res.data.code;
      dispatch(returnMessages(messageCode, message));
      console.log(res, message, messageCode, res.data.updatedUser);
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
