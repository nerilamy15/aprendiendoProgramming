import React from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { dislikePost } from "../actions/dislikePostAction";
import { likePost } from "../actions/likePostAction";
import { fetchPosts } from "../actions/fetchPostsAction";
import relativeTime from "dayjs/plugin/relativeTime";
import SentimentDissatisfiedOutlinedIcon from "@material-ui/icons/SentimentDissatisfiedOutlined";
import SentimentSatisfiedOutlinedIcon from "@material-ui/icons/SentimentSatisfiedOutlined";
import { Typography, Button, Card, CardContent } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const Post = ({ postId, name, post, date, likes, dislikes, token }) => {
  const useStyles = makeStyles(() => ({
    cardContainer: {
      marginBottom: 30,
      animation: "drop 1s ease"
    },
    cardDetails: {
      marginLeft: 130
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
        textDecoration: "none"
      }
    },
    createdAt: {
      marginTop: 10
    },
    btns: {
      paddingBottom: 10
    },
    userName: {
      marginBottom: 10
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
    userName
  } = classes;
  /////////////////////////////////////////////////////////
  dayjs.extend(relativeTime);
  /////////////////////////////////////////////////////////
  const dispatch = useDispatch();

  // const dislikePostAction = () => dispatch(dislikePost({ postId, token }));
  // const likePostAction = () => dispatch(likePost({ postId, token }));

  const like = async () => {
    await dispatch(likePost({ postId, token }));
    dispatch(fetchPosts({ token }));
  };

  const dislike = async () => {
    await dispatch(dislikePost({ postId, token }));
    dispatch(fetchPosts({ token }));
  };

  return (
    <>
      <Card className={cardContainer}>
        <CardContent className={cardDetails}>
          <div className={userName}>
            <Typography
              className={noHover}
              component={Link}
              to={`/users/${name}`}
              target="_blank"
              variant="h6"
              color="primary"
            >
              {name}
            </Typography>
          </div>
          <Typography variant="body2">{post}</Typography>
          <div className={createdAt}>
            <Typography variant="caption">{dayjs(date).fromNow()}</Typography>
          </div>
        </CardContent>
        <div className={btns}>
          <Button className={noHover} onClick={() => like()}>
            <SentimentSatisfiedOutlinedIcon className={greenLike} />
          </Button>
          <span className={greenLike}>{likes}</span>
          <Button className={noHover} onClick={() => dislike()}>
            <SentimentDissatisfiedOutlinedIcon className={redDislike} />
          </Button>
          <span className={redDislike}>{dislikes}</span>
        </div>
      </Card>
    </>
  );
};

export default Post;
