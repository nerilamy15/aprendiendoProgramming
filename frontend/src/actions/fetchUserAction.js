import axios from "axios";
import { returnMessages } from "./messagesActions";

import { GET_USER, GET_USERFAIL, DATA_LOADING } from "./types";

export const fetchUserAction = ({ token, id }) => dispatch => {
  dispatch({ type: DATA_LOADING });
  axios
    .get(`http://localhost:5001/admin/user/${id}`, {
      headers: { "auth-token": token }
    })
    .then(res => {
      dispatch({
        type: GET_USER,
        payload: {
          users: res.data.user
        }
      });
      let message = res.data.message;
      let messageCode = res.data.code;
      dispatch(returnMessages(messageCode, message));
      console.log(res);
    })

    .catch(err => {
      let errorCode = err.response ? err.response.data.code : 500;
      let error = err.response && err.response.data.error;
      dispatch(returnMessages(errorCode, error));
      dispatch({
        type: GET_USERFAIL
      });
    });
};
