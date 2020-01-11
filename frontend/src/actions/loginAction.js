import axios from "axios";
import { returnMessages } from "./messagesActions";

import { USER_LOADING, LOGIN_SUCCESS, LOGIN_FAIL } from "./types";

export const loginAction = ({ email, password, props }) => dispatch => {
  dispatch({ type: USER_LOADING });
  axios
    .post("http://localhost:5001/login", {
      email,
      password
    })
    .then(res => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          token: res.data.token,
          name: res.data.user.name,
          role: res.data.user.role,
          id: res.data.user._id,
          email: res.data.user.email
        }
      });
      let message = res.data.message;
      let messageCode = res.data.code;
      dispatch(returnMessages(messageCode, message));
      console.log(res, message, messageCode);
    })

    .catch(err => {
      console.log(err.response);
      let errorCode = err.response ? err.response.data.code : 500;
      let error = err.response && err.response.data.error;
      dispatch(returnMessages(errorCode, error));
      dispatch({
        type: LOGIN_FAIL
      });
    });
};
