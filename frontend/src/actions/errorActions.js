import { GET_ERRORS, CLEAR_ERRORS } from "./types";

//return errors

export const returnErrors = (errorCode, error) => {
  return {
    type: GET_ERRORS,
    payload: {
      errorCode,
      error
    }
  };
};

//clear errors

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
