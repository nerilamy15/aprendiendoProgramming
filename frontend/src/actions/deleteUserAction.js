import axios from "axios";
import { returnMessages } from "./messagesActions";

import { DELETE_USER, FAILDELETE_USER, DATA_LOADING } from "./types";

export const deleteUserAction = ({ token, id }) => dispatch => {
  dispatch({ type: DATA_LOADING });
  axios
    .delete(`http://localhost:5001/admin/user/${id}`, {
      headers: { "auth-token": token }
    })
    .then(res => {
      dispatch({
        type: DELETE_USER,
        payload: {
          users: res.data.deletedUser
        }
      });
      let message = res.data.message;
      let messageCode = res.data.code;
      dispatch(returnMessages(messageCode, message));
      console.log(res, message, messageCode, res.data.deletedUser);
    })

    .catch(err => {
      let errorCode = err.response ? err.response.data.code : 500;
      let error = err.response && err.response.data.error;
      dispatch(returnMessages(errorCode, error));
      dispatch({
        type: FAILDELETE_USER
      });
    });
};
