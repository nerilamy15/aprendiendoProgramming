import axios from "axios";
import { returnErrors } from "./errorActions";

import { REGISTER_SUCCESS, REGISTER_FAIL } from "./types";

export const registerAction = ({
  name,
  email,
  password,
  props
}) => dispatch => {
  axios
    .post("http://localhost:5001/register", {
      name,
      email,
      password
    })
    .then(res => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: { userEmail: res.data.user.email }
      });
      console.log(res);
      props.history.push("/emailConfirmation");
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
