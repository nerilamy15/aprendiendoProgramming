import React, { useEffect } from "react";
import Posts from "./Posts";
import { Typography, Paper, CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts } from "../actions/fetchPostsAction";

const Home = () => {
  /////////////////////////////////////////////////////////////
  const useStyles = makeStyles(() => ({
    homeContainer: {
      margin: "15vh auto",
      width: "300px",
      height: " 100px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      animation: "drop 1s ease"
    },
    cardsContainer: {
      marginTop: 100
    }
  }));
  const classes = useStyles();
  const { homeContainer, cardsContainer } = classes;
  //////////////////////////////////////////////////////////////////
  const userInfo = useSelector(state => state.authReducer);
  const { user } = userInfo;

  const postsState = useSelector(state => state.postReducer);
  const dispatch = useDispatch();
  const fetchPostsDispatch = () => dispatch(fetchPosts());
  const { posts } = postsState;
  console.log(posts);
  useEffect(() => {
    fetchPostsDispatch();
  }, []);

  return (
    <>
      {user && (
        <Paper className={homeContainer}>
          <Typography
            className="textCenter"
            variant="h5"
            color="secondary"
          >{`Welcome ${user}`}</Typography>
        </Paper>
      )}
      {!posts ? (
        <CircularProgress size={50} />
      ) : (
        <Posts posts={posts} container={cardsContainer} />
      )}
    </>
  );
};

export default Home;
