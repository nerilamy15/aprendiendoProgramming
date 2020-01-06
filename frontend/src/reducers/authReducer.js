import {
  USER_LOADING,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  MAIL_CONFIRMED,
  MAILCONFIRMED_FAIL
} from "../actions/types";

const initialState = {
  verificarMail: false,
  isAuthenticated: false,
  isLoading: false,
  token: null,
  role: null,
  user: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload.name,
        token: action.payload.token,
        role: action.payload.role
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        ...action.payload
      };
    case LOGIN_FAIL:
    case REGISTER_FAIL:
    case MAILCONFIRMED_FAIL:
      return {
        ...state,
        ...action.payload
      };
    case LOGOUT_SUCCESS:
      localStorage.clear();
      return {
        ...state,
        token: null,
        role: null,
        isAuthenticated: false,
        isLoading: false,
        user: null,
        verificarMail: false
      };
    case MAIL_CONFIRMED:
      return {
        ...state,
        verificarMail: true
      };
    default:
      return state;
  }
};

export default authReducer;
