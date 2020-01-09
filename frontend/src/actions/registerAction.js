import axios from "axios";
import { returnMessages } from "./messagesActions";

import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADING } from "./types";

export const registerAction = ({
  name,
  email,
  password,
  props
}) => dispatch => {
  dispatch({ type: USER_LOADING });
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
      dispatch(returnMessages(errorCode, error));
      dispatch({
        type: REGISTER_FAIL
      });
    });
};
