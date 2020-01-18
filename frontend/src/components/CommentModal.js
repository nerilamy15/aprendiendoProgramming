import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createComment } from "../actions/commentsActions/createComment";
import { fetchComments } from "../actions/commentsActions/fetchComments";
import {
  TextField,
  Button,
  Modal,
  Backdrop,
  CircularProgress
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SnackbarMessages from "./SnackbarMessages";

const CommentModal = ({ modalOpen, handleModal, id }) => {
  const useStyles = makeStyles(() => ({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    paper: {
      width: 400,
      animation: "expand .3s ease",
      display: "flex",
      flexDirection: "column",
      position: "relative"
    },
    textArea: {
      backgroundColor: "white",
      borderRadius: 5
    },
    buttons: {
      border: "solid 2px #8b70d2",
      position: "absolute",
      right: 0,
      bottom: -50,
      backgroundColor: "white",
      "&:hover": {
        backgroundColor: "#8b70d2 !important",
        border: "solid 2px white",
        color: "white"
      },
      disable: {
        opacity: 0.5,
        cursor: "not-allowed !important"
      },
      spinner: {
        marginRight: 5
      }
    }
  }));
  const classes = useStyles();
  const { paper, modal, textArea, buttons, disable, spinner } = classes;
  /////////////////////////////////////////////////////////
  const authReducer = useSelector(state => state.authReducer);
  const commentsReducer = useSelector(state => state.commentsReducer);
  const messagesReducer = useSelector(state => state.messagesReducer);

  const { name, userName, token, avatar } = authReducer;
  const { loading } = commentsReducer;

  let surName = userName ? userName : name;
  ///////////////////////////////////////////////////////////
  const dispatch = useDispatch();
  ///////////////////////////////////////////////////////////
  const [comment, setComment] = useState("");
  ///////////////////////////////////////////////////////////
  const handleChange = e => {
    e.preventDefault();
    setComment(e.target.value);
  };

  const commentDispatch = () => {
    dispatch(createComment({ surName, comment, id, avatar, token }));
    handleModal();
  };
  ///////////////////////////////////////////////////////////
  return (
    <>
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={modal}
          open={modalOpen}
          onClose={handleModal}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500
          }}
        >
          <div className={paper}>
            <TextField
              className={textArea}
              multiline
              placeholder="Your Comment..."
              rows="4"
              variant="outlined"
              name="post"
              value={comment}
              onChange={handleChange}
            />
            <Button
              onClick={() => commentDispatch()}
              color="primary"
              className={loading ? `${buttons}${disable}` : buttons}
            >
              Comment
              {loading && <CircularProgress className={spinner} size={15} />}
            </Button>
          </div>
        </Modal>
      </div>
      {<SnackbarMessages />}
    </>
  );
};

export default CommentModal;
