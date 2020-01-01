import { GET_ERRORS, CLEAR_ERRORS } from "./types";

//return errors

export const returnErrors = (message, status) => {
  return {
    type: GET_ERRORS,
    payload: {
      message,
      status
    }
  };
};

//clear errors

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
