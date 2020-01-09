import { SUCCESS_SUBMIT, FAIL_SUBMIT } from "./types";
import { returnMessages } from "./messagesActions";
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
    .then(res => {
      dispatch({
        type: SUCCESS_SUBMIT,
        payload: res.data.successCode
      });
      let message = res.data.message;
      let messageCode = res.data.code;
      dispatch(returnMessages(messageCode, message));
      console.log(res, message, messageCode);
    })
    .catch(err => {
      let messageCode = err.response ? err.response.data.code : 500;
      //let message = err.response && err.response.data.error;
      dispatch(returnMessages(messageCode));
      dispatch({
        type: FAIL_SUBMIT
      });
    });
};
