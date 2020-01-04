import { GET_ERRORS, CLEAR_ERRORS } from "../actions/types";

const initialState = {
  errorCode: null,
  error: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return {
        //...action.payload
        errorCode: action.payload.errorCode,
        error: action.payload.error
      };
    case CLEAR_ERRORS:
      return {
        errorCode: null,
        error: null
      };
    default:
      return state;
  }
}
