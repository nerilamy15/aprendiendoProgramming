import axios from "axios";
import { returnMessages } from "./messagesActions";

import { EDIT_USER, EDITUSER_FAIL, DATA_LOADING } from "./types";

export const editUser = ({ token, name, email, role, id }) => dispatch => {
  dispatch({ type: DATA_LOADING });
  axios
    .patch(
      `http://localhost:5001/admin/user/${id}`,
      {
        name,
        email,
        role
      },
      {
        headers: { "auth-token": token }
      }
    )
    .then(res => {
      dispatch({
        type: EDIT_USER,
        payload: {
          users: res.data.updatedUser
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
        type: EDITUSER_FAIL
      });
    });
};
