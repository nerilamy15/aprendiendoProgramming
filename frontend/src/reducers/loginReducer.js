import { LOGIN_SUCCESS, USER_LOADED } from "../actions/types";

const initialState = {
  isLoading: false,
  isAuthenticated: false,
  token: null,
  role: null,
  user: null
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload.name,
        token: action.payload.token,
        role: action.payload.role
      };
    default:
      return state;
  }
};

export default loginReducer;
