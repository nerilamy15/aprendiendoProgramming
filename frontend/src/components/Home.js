import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Posts from "./Posts";
import PostTextArea from "./PostTextArea";
import SnackbarMessages from "./SnackbarMessages";
import {
  Typography,
  Paper,
  CircularProgress,
  Grid,
  Popover,
  Button,
  Fade,
  Menu,
  MenuItem
} from "@material-ui/core";
import SortRoundedIcon from "@material-ui/icons/SortRounded";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts } from "../actions/postsActions/fetchPostsAction";
import { fetchOldestPosts } from "../actions/postsActions/fetchOldestPostsAction";
import { fetchPostMostLikes } from "../actions/postsActions/fetchPostMostLikesAction";

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
      top: -60,
      right: -20,
      "&:hover": {
        backgroundColor: "transparent"
      }
    },
    sortBtnsContainer: {
      marginLeft: 50
    },
    sortBtns: {
      color: "white",
      backgroundColor: "#3b4248",
      borderRadius: 0,
      "&:hover": {
        backgroundColor: "3b4248",
        color: "#8b70d2"
      }
    },
    menu: {
      backgroundColor: "#3b4248"
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
    menu,
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

  //////////////////////////////////////////////////////////////////
  const authReducer = useSelector(state => state.authReducer);
  const messagesReducer = useSelector(state => state.messagesReducer);
  const { user, token } = authReducer;
  const { messageCode, message } = messagesReducer;

  const postReducer = useSelector(state => state.postReducer);
  const dispatch = useDispatch();
  const fetchPostsDispatch = () => dispatch(fetchPosts());
  const { posts, postsLoading } = postReducer;
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
                <SortRoundedIcon fontSize="large" />
              </Button>
              <Menu
                className={sortBtnsContainer}
                open={anchorEl}
                onClose={handleClose}
                anchorEl={anchorEl}
              >
                <div>
                  <MenuItem className={menu}>
                    <Button className={sortBtns} onClick={() => mostLikes()}>
                      Most Favorite
                    </Button>
                  </MenuItem>
                  <MenuItem className={menu}>
                    <Button className={sortBtns} onClick={() => newestSort()}>
                      Newest
                    </Button>
                  </MenuItem>
                  <MenuItem className={menu}>
                    <Button className={sortBtns} onClick={() => oldestSort()}>
                      Oldest
                    </Button>
                  </MenuItem>
                </div>
              </Menu>
              <Posts posts={posts} container={cardsContainer} token={token} />
            </div>
          )}
        </Grid>
        <Grid item xs={3}>
          <Paper>asdasda</Paper>
        </Grid>
      </Grid>
      {<SnackbarMessages />}
      {messageCode === 500 && history.push("/error")}}
    </>
  );
};

export default Home;
