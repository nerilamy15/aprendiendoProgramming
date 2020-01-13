import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createPost } from "../actions/createPostAction";
import { fetchPosts } from "../actions/fetchPostsAction";
import { fetchOldestPosts } from "../actions/fetchOldestPostsAction";
import { TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

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
      border: "solid 2px #8b70d2",
      position: "absolute",
      left: 165,
      bottom: -50,
      color: "#8b70d2",
      backgroundColor: "white",
      "&:hover": {
        backgroundColor: "#8b70d2 !important",
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
  const userInfo = useSelector(state => state.authReducer);
  const { name, email, token, isAuthenticated } = userInfo;
  /////////////////////////////////////////////////////////
  const dispatch = useDispatch();
  const history = useHistory();
  const reloadPosts = () => dispatch(fetchPosts());
  const createPostDispatch = () =>
    dispatch(createPost({ name, email, post, token }));

  const createNewPost = async () => {
    await createPostDispatch();
    reloadPosts();
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
          label="Lorem ipsum dolor..."
          multiline
          rows="4"
          variant="outlined"
          name="post"
          value={post}
          onChange={handleChange}
        />
        <Button className={buttons} onClick={() => submit()}>
          Post it
        </Button>
      </div>
    </>
  );
};

export default PostTextArea;
