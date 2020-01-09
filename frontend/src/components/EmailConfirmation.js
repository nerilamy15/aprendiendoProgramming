import React from "react";
import { CircularProgress } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { emailConfirmedAction } from "../actions/emailConfirmedAction";
import FatalError from "./FatalError";

const EmailConfirmation = props => {
  const userInfo = useSelector(state => state.authReducer);
  const backEndMessages = useSelector(state => state.messagesReducer);
  const { messageCode } = backEndMessages;
  const dispatch = useDispatch();
  const { verificarMail, userEmail, isLoading } = userInfo;

  const emailConfirmed = () => {
    setTimeout(
      () => dispatch(emailConfirmedAction({ props, userEmail })),
      2000
    );
  };
  return !userEmail || !verificarMail ? (
    <>
      <div className="formContainer loginForm">
        <a
          onClick={emailConfirmed}
          href="https://www.google.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Your email needs to be confirmed before you can login
        </a>
        {isLoading && (
          <div>
            <CircularProgress size={40} />
          </div>
        )}
      </div>
      <div>{messageCode === 500 && <FatalError />}</div>
    </>
  ) : (
    <Redirect to="/login" />
  );
};

export default EmailConfirmation;
