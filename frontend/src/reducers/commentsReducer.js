import {
  LOADING,
  SUCCESS_COMMENT,
  FAIL_COMMENT,
  FETCH_COMMENTS,
  FAIL_FETCH_COMMENTS,
  COMMENTS_LOADING
} from "../actions/types";

const initialState = {
  commentsLoading: false,
  loading: false
};

const commentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: true
      };
    case COMMENTS_LOADING:
      return {
        ...state,
        commentsLoading: true
      };
    case SUCCESS_COMMENT:
      return {
        ...state,
        ...action.payload,
        loading: false
      };
    case FAIL_COMMENT:
      return {
        ...state,
        loading: false
      };
    case FETCH_COMMENTS:
      return {
        commentsLoading: false,
        ...state,
        ...action.payload
      };
    case FAIL_FETCH_COMMENTS:
      return {
        ...state
      };
    default:
      return state;
  }
};

export default commentsReducer;
