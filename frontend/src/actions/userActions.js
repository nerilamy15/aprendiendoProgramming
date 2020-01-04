import { SUCCESS_SUBMIT, FAIL_SUBMIT } from "./types";
import { returnErrors } from "./errorActions";
import axios from "axios";

export const userInfo = ({ animal, color, result, token }) => dispatch => {
  axios
    .post(
      "http://localhost:5001/user",
      {
        animal,
        color,
        result
      },
      {
        headers: { "auth-token": token }
      }
    )
    .then(res =>
      dispatch({
        type: SUCCESS_SUBMIT,
        payload: res.data.successCode
      })
    )
    .catch(err => {
      let errorCode = err.response ? err.response.data.code : 500;
      let error = err.response && err.response.data.error;
      dispatch(returnErrors(errorCode));
      dispatch({
        type: FAIL_SUBMIT,
        payload: {
          errorCode
        }
      });
    });
};
