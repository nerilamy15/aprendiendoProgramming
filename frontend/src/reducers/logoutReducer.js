import { LOGOUT_SUCCESS } from "../actions/types";

const initialState = {
  verificarMail: false,
  isAuthenticated: false,
  isLoading: false,
  token: null,
  role: null,
  user: null
};

const logoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGOUT_SUCCESS:
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      return {
        ...state,
        token: null,
        role: null,
        isAuthenticated: false,
        isLoading: false,
        user: null,
        verificarMail: false
      };

    default:
      return state;
  }
};

export default logoutReducer;
