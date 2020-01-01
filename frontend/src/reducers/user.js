import { SUCCESS_SUBMIT } from "../actions/types";

const initialState = {
  error: null,
  animal: null,
  color: null,
  result: null
};

const userInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case SUCCESS_SUBMIT:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};

export default userInfoReducer;
