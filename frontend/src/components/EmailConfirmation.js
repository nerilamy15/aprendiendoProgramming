import React from "react";
import { CircularProgress, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { emailConfirmedAction } from "../actions/emailConfirmedAction";
import FatalError from "./FatalError";

const EmailConfirmation = props => {
  /////////////////////////////////////////////////////////////
  const useStyles = makeStyles(() => ({
    formContainer: {
      margin: "15vh auto",
      width: "200px",
      height: " 200px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      animation: "drop 1s ease"
    },
    spinner: {
      marginTop: "10px"
    }
  }));
  const classes = useStyles();
  const { formContainer, spinner } = classes;
  /////////////////////////////////////////////////////////////////////
  const userInfo = useSelector(state => state.authReducer);
  const backEndMessages = useSelector(state => state.messagesReducer);
  const { messageCode } = backEndMessages;
  const dispatch = useDispatch();
  const { verificarMail, email, isLoading } = userInfo;

  const emailConfirmed = () => {
    setTimeout(() => dispatch(emailConfirmedAction({ props, email })), 2000);
  };
  return !email || !verificarMail ? (
    <>
      <Paper className={formContainer}>
        <a
          onClick={emailConfirmed}
          href="https://www.google.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Your email needs to be confirmed before you can login
        </a>
        {isLoading && <CircularProgress className={spinner} size={40} />}
      </Paper>
      <div>{messageCode === 500 && <FatalError />}</div>
    </>
  ) : (
    <Redirect to="/login" />
  );
};

export default EmailConfirmation;
