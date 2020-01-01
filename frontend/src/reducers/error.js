import { GET_ERRORS, CLEAR_ERRORS } from "../actions/types";

const initialState = {
  error: null,
  status: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return {
        error: action.payload.error,
        status: action.payload.status
      };
    case CLEAR_ERRORS:
      return {
        error: null,
        status: null
      };
    default:
      return state;
  }
}
