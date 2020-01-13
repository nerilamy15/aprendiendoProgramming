import axios from "axios";
import { FETCH_POSTS_SUCCESS, FETCH_POSTS_FAIL, POSTS_LOADING } from "./types";
import { returnMessages } from "./messagesActions";

export const fetchPosts = () => dispatch => {
  dispatch({ type: POSTS_LOADING });
  axios
    .get(`http://localhost:5001/posts`)
    .then(res => {
      dispatch({
        type: FETCH_POSTS_SUCCESS,
        payload: {
          posts: res.data.posts
        }
      });
      console.log(res);
    })
    .catch(err => {
      let errorCode = err.response ? err.response.data.code : 500;
      let error = err.response && err.response.data.error;
      dispatch(returnMessages(errorCode, error));
      dispatch({
        type: FETCH_POSTS_FAIL
      });
    });
};

/*export const fetchPosts = () => async dispatch => {
  dispatch({ type: POSTS_LOADING });
  try {
    let response = await axios.get(`http://localhost:5001/posts`);
    let data = response.data.posts;
    dispatch({
      type: FETCH_POSTS_SUCCESS,
      payload: {
        posts: data
      }
    });
    console.log(response);
  } catch (err) {
    let errorCode = err.response ? err.response.data.code : 500;
    let error = err.response && err.response.data.error;
    dispatch(returnMessages(errorCode, error));
    dispatch({
      type: FETCH_POSTS_FAIL
    });
  }
};*/
