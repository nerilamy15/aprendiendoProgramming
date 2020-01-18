import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { snackClose } from "../actions/messagesActions";
import { makeStyles } from "@material-ui/core/styles";
import { Snackbar, SnackbarContent } from "@material-ui/core";

const SnackbarMessages = () => {
  const useStyles = makeStyles(theme => ({
    messageError: {
      display: "flex",
      justifyContent: "center",
      backgroundColor: "red"
    },
    messageSuccess: {
      display: "flex",
      justifyContent: "center",
      backgroundColor: "green"
    }
  }));

  const classes = useStyles();
  const { messageError, messageSuccess } = classes;
  ////////////////////////////////////////////////////////
  const dispatch = useDispatch();
  const messagesReducer = useSelector(state => state.messagesReducer);
  const authReducer = useSelector(state => state.authReducer);
  const { verifyCaptcha, isAuthenticated } = authReducer;
  const { messageCode, isOpen } = messagesReducer;
  ///////////////////////////////////////////////////////////////////////////

  let text;

  switch (messageCode) {
    case 230:
      text = "Account Created!";
      break;
    case 231:
      text = "Logged In!";
      break;
    case 232:
      text = "Email Confirmed!";
      break;
    case 233:
      text = "Profile Successfully Updated!";
      break;
    case 234:
      text = "Posted!";
      break;
    case 239:
      text = "Like!";
      break;
    case 240:
      text = "Dislike!";
      break;
    case 250:
      text = "Post Successfully deleted!";
      break;
    case 251:
      text = "Commented!";
      break;
    case 500:
      text = "Unexpected error, try again later";
      break;
    default:
      text = "default msg";
  }
  ////////////////////////////////////////////////////////////////////////////////////////
  let test = () => {
    if (!verifyCaptcha && !messageCode === 500) {
      text = "please enter the captcha";
    } else if (verifyCaptcha && !isAuthenticated) {
      text = "thank you :3";
    }
  };
  test();
  ////////////////////////////////////////////////////////////////////////////////////////
  let color;
  let test2 = () => {
    messageCode === 500 || verifyCaptcha === false
      ? (color = messageError)
      : (color = messageSuccess);
  };
  test2();
  /////////////////////////////////////////////////////////////////////////////////////

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        autoHideDuration={1500}
        open={isOpen}
        onClose={() => dispatch(snackClose())}
      >
        <SnackbarContent className={color} message={text}></SnackbarContent>
      </Snackbar>
    </>
  );
};

export default SnackbarMessages;
