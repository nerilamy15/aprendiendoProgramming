import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { deletePost } from "../actions/postsActions/deletePost";
import { editUser } from "../actions/userActions/editUserAction";
import { dislikePost } from "../actions/postsActions/dislikePostAction";
import { likePost } from "../actions/postsActions/likePostAction";
import { fetchPosts } from "../actions/postsActions/fetchPostsAction";
import relativeTime from "dayjs/plugin/relativeTime";
import SentimentDissatisfiedOutlinedIcon from "@material-ui/icons/SentimentDissatisfiedOutlined";
import SentimentSatisfiedOutlinedIcon from "@material-ui/icons/SentimentSatisfiedOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import AddCommentOutlinedIcon from "@material-ui/icons/AddCommentOutlined";
import CommentSection from "./CommentSection";
import SnackbarMessages from "./SnackbarMessages";
import {
  Typography,
  Button,
  Card,
  CardContent,
  Tooltip,
  Modal,
  Backdrop,
  Fade,
  TextField
} from "@material-ui/core";
import CommentModal from "./CommentModal";
import { makeStyles } from "@material-ui/core/styles";

const Post = ({
  postId,
  writer,
  post,
  date,
  likes,
  dislikes,
  token,
  avatar
}) => {
  const useStyles = makeStyles(() => ({
    cardContainer: {
      marginBottom: 30,
      animation: "drop 1s ease",
      transition: "0.5s ease all",
      border: "2px dotted  #3b4248",
      boxShadow: "none"
    },
    cardDetails: {
      marginLeft: 0
    },
    greenLike: {
      color: "green"
    },
    redDislike: {
      color: "red"
    },
    noHover: {
      "&:hover": {
        backgroundColor: "transparent",
        textDecoration: "none",
        color: "#3b4248"
      }
    },
    createdAt: {
      marginTop: 8
    },
    btns: {
      paddingBottom: 10,
      paddingTop: 10,
      display: "flex",
      justifyContent: "space-between"
    },
    postUserName: {
      fontFamily: "Righteous",
      marginBottom: 0
    },
    hiddenTest: {
      display: "none"
    },
    imgAndDetails: {
      display: "flex"
    },
    imgBorder: {
      borderRight: "2px dotted  #3b4248",
      borderBottom: "2px dotted  #3b4248"
    }
  }));
  const classes = useStyles();
  const {
    cardDetails,
    greenLike,
    redDislike,
    noHover,
    cardContainer,
    createdAt,
    btns,
    postUserName,
    hiddenTest,
    imgAndDetails,
    imgBorder
  } = classes;
  /////////////////////////////////////////////////////////
  dayjs.extend(relativeTime);
  /////////////////////////////////////////////////////////
  const authReducer = useSelector(state => state.authReducer);
  const { role, userName, name } = authReducer;
  /////////////////////////////////////////////////////////
  const [open, setOpen] = useState(false);

  const handleModal = () => {
    setOpen(!open);
  };

  /////////////////////////////////////////////////////////
  const dispatch = useDispatch();

  const like = () => {
    //dispatch(likePost({ postId, token }));
    console.log(`like the post with ID:${postId}`);
    //dispatch(fetchPosts({ token }));
  };

  const dislike = () => {
    //dispatch(dislikePost({ postId, token }));
    // dispatch(fetchPosts({ token }));
    console.log(`dislike the post with ID:${postId}`);
  };

  return (
    <>
      <div>
        <CommentModal modalOpen={open} handleModal={handleModal} id={postId} />
        <Card className={cardContainer}>
          <div className={imgAndDetails}>
            <img
              className={imgBorder}
              src={avatar}
              alt="avatar"
              width={100}
              height={100}
            />
            <CardContent className={cardDetails}>
              <div className={postUserName}>
                <Typography
                  className={noHover}
                  component={Link}
                  to={`/users/${writer}`}
                  target="_blank"
                  variant="h6"
                  color="primary"
                >
                  {writer}
                </Typography>
                <Typography variant="body2">{post}</Typography>
                <div className={createdAt}>
                  <Typography variant="caption">
                    {dayjs(date).fromNow()}
                  </Typography>
                </div>
              </div>
            </CardContent>
          </div>
          <div className={btns}>
            <div>
              <Tooltip title="Like!">
                <Button className={noHover} onClick={() => like()}>
                  <SentimentSatisfiedOutlinedIcon className={greenLike} />
                </Button>
              </Tooltip>
              <span className={greenLike}>{likes}</span>
              <Tooltip title="Dislike!">
                <Button className={noHover} onClick={() => dislike()}>
                  <SentimentDissatisfiedOutlinedIcon className={redDislike} />
                </Button>
              </Tooltip>
              <span className={redDislike}>{dislikes}</span>
            </div>
            <div></div>
            <div>
              <Tooltip title="Add a comment!">
                <Button className={noHover} onClick={handleModal}>
                  <AddCommentOutlinedIcon />
                </Button>
              </Tooltip>
              <Tooltip title="Edit!">
                <Button
                  className={
                    writer === userName || writer === name
                      ? noHover
                      : hiddenTest
                  }
                >
                  <EditOutlinedIcon className={redDislike} />
                </Button>
              </Tooltip>
              <Tooltip title="Delete!">
                <Button
                  className={
                    writer === userName || writer === name
                      ? noHover
                      : hiddenTest
                  }
                  onClick={() => dispatch(deletePost({ token, postId }))}
                >
                  <DeleteOutlineOutlinedIcon className={redDislike} />
                </Button>
              </Tooltip>
            </div>
          </div>
          <CommentSection postId={postId} />
        </Card>
      </div>
    </>
  );
};

export default Post;
