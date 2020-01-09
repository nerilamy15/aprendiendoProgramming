import { GET_MESSAGES, CLEAR_MESSAGES } from "./types";

//return messages

export const returnMessages = (messageCode, message) => {
  return {
    type: GET_MESSAGES,
    payload: {
      messageCode,
      message
    }
  };
};

//clear messages

export const clearMessages = () => {
  return {
    type: CLEAR_MESSAGES
  };
};
