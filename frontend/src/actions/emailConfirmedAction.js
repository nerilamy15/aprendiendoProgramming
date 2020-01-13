import axios from "axios";
import { returnMessages } from "./messagesActions";

import {
  MAIL_CONFIRMED,
  MAILCONFIRMED_FAIL,
  WAITING_MAILCONFIRMATION
} from "./types";

/*export const emailConfirmedAction = ({ props, email }) => dispatch => {
  dispatch({ type: WAITING_MAILCONFIRMATION });
  axios
    .patch(`http://localhost:5001/${email}`, {
      isAuthenticated: true
    })
    .then(() => {
      dispatch({
        type: MAIL_CONFIRMED
      });
      props.history.push("/login");
    })
    .catch(err => {
      let errorCode = err.response ? err.response.data.code : 500;
      let error = err.response && err.response.data.error;
      dispatch(returnMessages(errorCode, error));
      dispatch({
        type: MAILCONFIRMED_FAIL,
        payload: {
          errorCode,
          error
        }
      });
    });
};*/

export const emailConfirmedAction = ({ props, email }) => async dispatch => {
  dispatch({ type: WAITING_MAILCONFIRMATION });
  try {
    let response = await axios.patch(`http://localhost:5001/${email}`, {
      isAuthenticated: true
    });
    dispatch({
      type: MAIL_CONFIRMED
    });
    // props.history.push("/login");
  } catch (err) {
    let errorCode = err.response ? err.response.data.code : 500;
    let error = err.response && err.response.data.error;
    dispatch(returnMessages(errorCode, error));
    dispatch({
      type: MAILCONFIRMED_FAIL,
      payload: {
        errorCode,
        error
      }
    });
  }
};
