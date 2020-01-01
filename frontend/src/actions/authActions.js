import axios from "axios";
import { returnErrors } from "./errorActions";

import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL
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
      dispatch({
        type: AUTH_ERROR,
        payload: err.response.data.error
      });
    });
};

export const regUser = ({ name, email, password, props }) => dispatch => {
  const push = () => {
    props.history.push("/login");
  };
  axios
    .post("http://localhost:5001/register", {
      name,
      email,
      password
    })
    .then(res =>
      dispatch({
        type: REGISTER_SUCCESS,
        payload: {
          res,
          push: push()
        }
      })
    )
    .catch(err => {
      dispatch(returnErrors(err.response.data.error, err.response.status));
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.error
      });
    });
};

export const loggedout = () => {
  return {
    type: LOGOUT_SUCCESS
  };
};
