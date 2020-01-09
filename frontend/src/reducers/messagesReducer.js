import { GET_MESSAGES, CLEAR_MESSAGES } from "../actions/types";

const initialState = {
  messageCode: null,
  message: null
};

const messagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MESSAGES:
      return {
        ...state,
        ...action.payload
      };
    case CLEAR_MESSAGES:
      return {
        messageCode: null,
        message: null
      };
    default:
      return state;
  }
};

export default messagesReducer;
