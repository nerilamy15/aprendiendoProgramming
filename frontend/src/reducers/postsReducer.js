import {
  LOADING,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAIL,
  POSTS_LOADING,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAIL,
  DELETE_POST,
  FAIL_DELETE_POST,
  LIKE_SUCCESS,
  DISLIKE_SUCCESS,
  FETCH_POST_SUCCESS,
  FETCH_POST_FAIL,
  FETCH_OLDEST_POSTS,
  FETCH_POST_MOST_LIKES
} from "../actions/types";

const initialState = {
  loading: false,
  postsLoading: false
};

const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state
      };
    case POSTS_LOADING:
      return {
        ...state,
        postsLoading: true
      };
    case FETCH_POSTS_SUCCESS:
    case FETCH_OLDEST_POSTS:
    case FETCH_POST_MOST_LIKES:
      return {
        ...state,
        postsLoading: false,
        ...action.payload
      };
    case FETCH_POSTS_FAIL:
    case FETCH_POST_FAIL:
      return {
        ...state,
        postsLoading: false
      };
    case FETCH_POST_SUCCESS: {
      return {
        ...state,
        ...action.payload,
        postsLoading: false
      };
    }
    case CREATE_POST_SUCCESS:
      return {
        ...state,
        ...action.payload,
        loading: false
      };
    case DELETE_POST:
      return {
        ...state,
        postsLoading: false
      };
    case FAIL_DELETE_POST:
      return {
        ...state,
        postsLoading: false
      };
    case CREATE_POST_FAIL:
      return {
        ...state,
        postsLoading: false
      };
    case LIKE_SUCCESS: {
      return {
        ...state
      };
    }
    case DISLIKE_SUCCESS: {
      return {
        ...state
      };
    }
    default:
      return state;
  }
};

export default postsReducer;
