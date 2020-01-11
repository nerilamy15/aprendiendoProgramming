import {
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAIL,
  POSTS_LOADING
} from "../actions/types";

const initialState = {
  postsLoading: false
};

const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case POSTS_LOADING:
      return {
        ...state,
        postsLoading: true
      };
    case FETCH_POSTS_SUCCESS:
      return {
        ...state,
        postsLoading: false,
        ...action.payload
      };
    case FETCH_POSTS_FAIL:
      return {
        ...state,
        postsLoading: false
      };
    default:
      return state;
  }
};

export default postsReducer;
