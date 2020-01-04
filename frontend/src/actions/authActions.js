import axios from "axios";
import { returnErrors } from "./errorActions";

import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  MAIL_CONFIRMED
} from "./types";

export const loadUser = ({ email, password, props }) => dispatch => {
  dispatch({ type: USER_LOADING });
  axios
    .post("http://localhost:5001/login", {
      email,
      password
    })
    .then(res =>
      dispatch({
        type: USER_LOADED,
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
        type: AUTH_ERROR,
        payload: {
          errorCode,
          error
        }
      });
    });
};

export const regUser = ({ name, email, password, props }) => dispatch => {
  axios
    .post("http://localhost:5001/register", {
      name,
      email,
      password
    })
    .then(res => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: {
          res
        }
      });
      props.history.push("/login");
    })
    .catch(err => {
      let errorCode = err.response ? err.response.data.code : 500;
      let error = err.response && err.response.data.error;
      dispatch(returnErrors(errorCode, error));
      dispatch({
        type: REGISTER_FAIL,
        payload: {
          errorCode,
          error
        }
      });
    });
};

export const mailConfirmed = () => {
  return {
    type: MAIL_CONFIRMED
  };
};

export const loggedout = () => {
  return {
    type: LOGOUT_SUCCESS
  };
};
