import { SUCCESS_SUBMIT, FAIL_SUBMIT } from "../actions/types";

const initialState = {
  animal: null,
  color: null,
  result: null
};

const userInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case SUCCESS_SUBMIT:
      return {
        ...state
      };
    case FAIL_SUBMIT:
      return {
        ...state
      };
    default:
      return state;
  }
};

export default userInfoReducer;
