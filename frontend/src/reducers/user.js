import { SUCCESS_SUBMIT, FAIL_SUBMIT } from "../actions/types";

const initialState = {
  animal: null,
  color: null,
  result: null,
  successCode: null
};

const userInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case SUCCESS_SUBMIT:
      return {
        ...state,
        successCode: action.payload
      };
    case FAIL_SUBMIT:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};

export default userInfoReducer;
