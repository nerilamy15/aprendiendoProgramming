import { SUCCESS_SUBMIT } from "./types";
import { returnErrors } from "./errorActions";
import axios from "axios";

const token = window.localStorage.getItem("token");

export const userInfo = ({ animal, color, result }) => dispatch => {
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
        payload: res
      })
    )
    .catch(err => {
      // dispatch(returnErrors(err.response.data.message, err.response.status));
      //console.log(err.response.data.message);
      //dispatch({
      //type: REGISTER_FAIL
      //});
      dispatch(err);
    });
};
