import {
  USER_LOADING,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  WAITING_MAILCONFIRMATION,
  MAIL_CONFIRMED,
  MAILCONFIRMED_FAIL,
  VERIFYCAPTCHA_SUCCESS,
  VERIFYCAPTCHA_FAIL,
  EDITUSER_SUCCESS
} from "../actions/types";

const initialState = {
  verificarMail: false,
  isAuthenticated: false,
  isLoading: false,
  verifyCaptcha: false,
  token: null,
  role: null,
  name: null,
  id: null,
  email: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOADING:
    case WAITING_MAILCONFIRMATION:
      return {
        ...state,
        isLoading: true
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        ...action.payload
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isLoading: false,
        verifyCaptcha: false
      };
    case VERIFYCAPTCHA_SUCCESS:
      return {
        ...state,
        verifyCaptcha: true
      };
    case VERIFYCAPTCHA_FAIL:
      return {
        ...state
      };
    case LOGIN_FAIL:
    case REGISTER_FAIL:
    case MAILCONFIRMED_FAIL:
      return {
        ...state,
        isLoading: false
      };
    case LOGOUT_SUCCESS:
      localStorage.clear();
      return {
        token: null,
        role: null,
        isAuthenticated: false,
        isLoading: false,
        name: null,
        verificarMail: false
      };
    case MAIL_CONFIRMED:
      return {
        ...state,
        isLoading: false,
        verificarMail: true
      };
    case EDITUSER_SUCCESS:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};

export default authReducer;
