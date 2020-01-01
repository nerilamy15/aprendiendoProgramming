import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_AUTH,
  ADMIN_AUTH
} from "../actions/types";

const initialState = {
  token: null,
  isAuthenticated: null,
  isLoading: false,
  role: null,
  user: null,
  error: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case USER_LOADED:
      //window.localStorage.setItem("token", action.payload.token);
      //window.localStorage.setItem("role", action.payload.role);
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
        isAuthenticated: true,
        isLoading: false,
        push: action.payload.push
      };
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case REGISTER_FAIL:
    case LOGIN_FAIL:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload
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
    case ADMIN_AUTH:
      return {
        ...action.payload
      };
    case USER_AUTH:
      return {
        ...action.payload
      };
    default:
      return state;
  }
};

export default authReducer;
