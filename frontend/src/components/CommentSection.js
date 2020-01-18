import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchComments } from "../actions/commentsActions/fetchComments";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {
  Typography,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Avatar,
  Button
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
////////////////////////////////////////////////////////////////////////

const CommentSection = ({ postId }) => {
  const useStyles = makeStyles(() => ({
    commentContainer: {
      display: "flex",
      borderBottom: "1px solid #3b4248"
    },
    commentAvatar: {},
    commentDetails: {
      display: "flex",
      flexDirection: "column",
      marginLeft: 15
    },
    noHover: {
      "&:hover": {
        backgroundColor: "transparent",
        textDecoration: "none",
        color: "#3b4248"
      }
    }
  }));
  const classes = useStyles();
  const { commentContainer, commentAvatar, commentDetails, noHover } = classes;
  ///////////////////////////////////////////////////////////////////
  dayjs.extend(relativeTime);
  ///////////////////////////////////////////////////////////////////
  const commentReducer = useSelector(state => state.commentsReducer);
  const { comments } = commentReducer;
  console.log(comments);

  ////////////////////////////////////////////////////////////////////////
  const dispatch = useDispatch();
  ////////////////////////////////////////////////////////////////////////
  const getComments = () => {
    dispatch(fetchComments());
  };

  ////////////////////////////////////////////////////////////////////////
  return (
    <>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography onClick={() => getComments()}>Open Comments</Typography>
        </ExpansionPanelSummary>

        <Button onClick={() => console.log(`this is this post ID: ${postId}`)}>
          TESTING ID
        </Button>
        {comments &&
          comments
            .filter(comment => comment.id == postId)
            .map(comment => (
              <ExpansionPanelDetails className={commentContainer}>
                <Avatar alt="avatar" src={comment.avatar} />
                <div className={commentDetails}>
                  <Typography
                    className={noHover}
                    color="primary"
                    variant="body2"
                    component={Link}
                    to={`/users/${comment.name}`}
                    target="_blank"
                  >
                    {comment.name}
                  </Typography>
                  <Typography variant="body1">{comment.comment}</Typography>
                  <Typography variant="caption">
                    {dayjs(comment.createdAt).fromNow()}
                  </Typography>
                </div>
                <hr />
              </ExpansionPanelDetails>
            ))}
      </ExpansionPanel>
    </>
  );
};

export default CommentSection;
