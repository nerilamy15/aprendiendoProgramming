import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  MAIL_CONFIRMED
} from "../actions/types";

const initialState = {
  token: null,
  isAuthenticated: null,
  isLoading: false,
  role: null,
  user: null,
  verificarMail: false
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload.name,
        token: action.payload.token,
        role: action.payload.role
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: false,
        isLoading: false,
        verificarMail: false,
        push: action.payload.push
      };
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case REGISTER_FAIL:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        ...action.payload
      };
    case LOGOUT_SUCCESS:
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      return {
        ...state,
        token: null,
        role: null,
        isAuthenticated: false,
        isLoading: false,
        user: null
      };
    case MAIL_CONFIRMED:
      window.location.reload();
      return {
        ...state,
        verificarMail: true
      };
    default:
      return state;
  }
};

export default authReducer;
