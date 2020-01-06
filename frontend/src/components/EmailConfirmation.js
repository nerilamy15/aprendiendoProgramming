import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { emailConfirmedAction } from "../actions/emailConfirmedAction";

const EmailConfirmation = props => {
  const userInfo = useSelector(state => state.authReducer);
  const dispatch = useDispatch();
  const { verificarMail, userEmail } = userInfo;

  const emailConfirmed = () => {
    setTimeout(
      () => dispatch(emailConfirmedAction({ props, userEmail })),
      2000
    );
  };
  return !userEmail || !verificarMail ? (
    <div className="container extra">
      <a
        onClick={emailConfirmed}
        href="https://www.google.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Your email needs to be confirmed before you can login
      </a>
    </div>
  ) : (
    <Redirect to="/login" />
  );
};

export default EmailConfirmation;
