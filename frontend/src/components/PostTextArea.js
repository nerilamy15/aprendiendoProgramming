import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createPost } from "../actions/postsActions/createPostAction";
import { fetchPosts } from "../actions/postsActions/fetchPostsAction";
import { TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SnackbarMessages from "./SnackbarMessages";

const PostTextArea = props => {
  const useStyles = makeStyles(() => ({
    TextAreaContainer: {
      margin: "20vh auto",
      width: 400,
      animation: "drop 1s ease",
      display: "flex",
      flexDirection: "column",
      position: "relative"
    },
    buttons: {
      border: /*"solid 2px #8b70d2",*/ "solid 2px #8b70d2",
      position: "absolute",
      left: 165,
      bottom: -50,
      // color: "#8b70d2",
      backgroundColor: "white",
      "&:hover": {
        backgroundColor: /*#8b70d2 */ "#8b70d2 !important",
        border: "solid 2px white",
        color: "white"
      }
    },
    textArea: {
      backgroundColor: "white"
    }
  }));
  const classes = useStyles();
  const { TextAreaContainer, buttons, textArea } = classes;
  /////////////////////////////////////////////////////////
  const [post, setPost] = useState("");
  /////////////////////////////////////////////////////////
  const handleChange = e => {
    setPost(e.target.value);
  };
  /////////////////////////////////////////////////////////
  const authReducer = useSelector(state => state.authReducer);
  const messagesReducer = useSelector(state => state.messagesReducer);
  const { messageCode } = messagesReducer;
  const { name, email, token, isAuthenticated, avatar, id } = authReducer;
  /////////////////////////////////////////////////////////
  const dispatch = useDispatch();
  const history = useHistory();

  const createNewPost = () => {
    dispatch(createPost({ name, email, post, token, avatar, id }));
    setPost("");
  };

  const submit = () => {
    isAuthenticated ? createNewPost() : history.push("/login");
  };

  return (
    <>
      <div className={TextAreaContainer}>
        <TextField
          className={textArea}
          label="Your Post..."
          multiline
          rows="4"
          variant="outlined"
          name="post"
          value={post}
          onChange={handleChange}
        />
        <Button color="primary" className={buttons} onClick={() => submit()}>
          Post it
        </Button>
      </div>
    </>
  );
};

export default PostTextArea;
