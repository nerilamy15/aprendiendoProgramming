import axios from "axios";
import { returnErrors } from "./errorActions";

import { MAIL_CONFIRMED, MAILCONFIRMED_FAIL } from "./types";

export const emailConfirmedAction = ({ props, userEmail }) => dispatch => {
  axios
    .patch(`http://localhost:5001/${userEmail}`, {
      isAuthenticated: true
    })
    .then(res => {
      dispatch({
        type: MAIL_CONFIRMED
      });
      props.history.push("/login");
    })
    .catch(err => {
      let errorCode = err.response ? err.response.data.code : 500;
      let error = err.response && err.response.data.error;
      dispatch(returnErrors(errorCode, error));
      dispatch({
        type: MAILCONFIRMED_FAIL,
        payload: {
          errorCode,
          error
        }
      });
    });
};
