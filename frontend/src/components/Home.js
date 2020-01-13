import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Posts from "./Posts";
import PostTextArea from "./PostTextArea";
import {
  Typography,
  Paper,
  CircularProgress,
  Grid,
  Popover,
  Button,
  Fade
} from "@material-ui/core";
import SortRoundedIcon from "@material-ui/icons/SortRounded";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts } from "../actions/fetchPostsAction";
import { fetchOldestPosts } from "../actions/fetchOldestPostsAction";
import { fetchPostMostLikes } from "../actions/fetchPostMostLikesAction";

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
    },
    cardsAndSort: {
      position: "relative"
    },
    sortMenu: {
      position: "absolute",
      top: -50,
      right: -22
    },
    sortBtnsContainer: {
      display: "flex",
      flexDirection: "column",
      backgroundColor: "transparent"
    },
    sortBtns: {
      color: "grey",
      color: "white",
      background: "linear-gradient(to top, #209cff 0%, #68e0cf 100%)",
      borderRadius: 0
    },
    spinner: {
      textAlign: "center"
    }
  }));
  const classes = useStyles();
  const {
    homeContainer,
    cardsContainer,
    cardsAndSort,
    sortMenu,
    sortBtnsContainer,
    sortBtns,
    spinner
  } = classes;
  //////////////////////////////////////////////////////////////////
  const [anchorEl, setAnchorEl] = useState(false);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(!anchorEl);
  };

  const open = Boolean(anchorEl);

  //////////////////////////////////////////////////////////////////
  const userInfo = useSelector(state => state.authReducer);
  const backEndMessages = useSelector(state => state.messagesReducer);
  const { user, token } = userInfo;
  const { messageCode, message } = backEndMessages;

  const postsState = useSelector(state => state.postReducer);
  const dispatch = useDispatch();
  const fetchPostsDispatch = () => dispatch(fetchPosts());
  const { posts, postsLoading } = postsState;
  /////////////////////////////////////////////////////////////////
  const oldestSort = () => {
    dispatch(fetchOldestPosts());
    handleClose();
  };

  const newestSort = () => {
    dispatch(fetchPosts());
    handleClose();
  };

  const mostLikes = () => {
    dispatch(fetchPostMostLikes());
    handleClose();
  };
  /////////////////////////////////////////////////////////////////
  useEffect(() => {
    fetchPostsDispatch();
  }, []);

  const history = useHistory();

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Paper>asdasda</Paper>
        </Grid>
        <Grid item xs={6}>
          <PostTextArea />
          {user && (
            <Paper className={homeContainer}>
              <Typography
                className="textCenter"
                variant="h5"
                color="secondary"
              >{`Welcome ${user}`}</Typography>
            </Paper>
          )}
          {!posts || postsLoading ? (
            <div className={spinner}>
              <CircularProgress size={100} />
            </div>
          ) : (
            <div className={cardsAndSort}>
              <Button onClick={handleClick} className={sortMenu}>
                <SortRoundedIcon></SortRoundedIcon>
              </Button>
              <Popover
                open={open}
                onClose={handleClose}
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left"
                }}
                transformOrigin={{
                  vertical: "center",
                  horizontal: "center"
                }}
              >
                <div className={sortBtnsContainer}>
                  <Button className={sortBtns} onClick={() => mostLikes()}>
                    Most Favorite
                  </Button>
                  <Button className={sortBtns} onClick={() => newestSort()}>
                    Newest
                  </Button>
                  <Button className={sortBtns} onClick={() => oldestSort()}>
                    Oldest
                  </Button>
                </div>
              </Popover>
              <Posts posts={posts} container={cardsContainer} token={token} />
            </div>
          )}
        </Grid>
        <Grid item xs={3}>
          <Paper>asdasda</Paper>
        </Grid>
      </Grid>
      {messageCode === 500 && history.push("/error")}}
    </>
  );
};

export default Home;
