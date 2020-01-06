import axios from "axios";
import { returnErrors } from "./errorActions";

import { USER_LOADING, LOGIN_SUCCESS, LOGIN_FAIL } from "./types";

export const loginAction = ({ email, password, props }) => dispatch => {
  dispatch({ type: USER_LOADING });
  axios
    .post("http://localhost:5001/login", {
      email,
      password
    })
    .then(res =>
      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          token: res.data.token,
          name: res.data.user.name,
          role: res.data.user.role
        }
      })
    )
    .catch(err => {
      let errorCode = err.response ? err.response.data.code : 500;
      let error = err.response && err.response.data.error;
      dispatch(returnErrors(errorCode, error));
      dispatch({
        type: LOGIN_FAIL,
        payload: {
          errorCode,
          error
        }
      });
    });
};
