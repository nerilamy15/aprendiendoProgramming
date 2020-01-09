import React, { useState } from "react";
import FatalError from "./FatalError";
import EmailConfirmation from "./EmailConfirmation";
import { useForm } from "react-hook-form";
import {
  TextField,
  Button,
  Typography,
  CircularProgress
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginAction } from "../actions/loginAction";
import { clearMessages } from "../actions/messagesActions";

const Login = props => {
  /////////////////////////////////////////////////////////////
  const useStyles = makeStyles(() => ({
    formContainer: {
      margin: "15vh auto",
      width: "300px",
      height: " 275px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      animation: "drop 1s ease",
      boxShadow: "0 0.5px 0 0 #ffffff inset, 0 1px 2px 0 #b3b3b3"
    },
    buttons: {
      border: "solid 2px #8b70d2",
      marginRight: "5px",
      color: "#8b70d2",
      "&:hover": {
        backgroundColor: "#8b70d2 !important",
        border: "solid 2px white",
        color: "white",
        backgroundColor: "#8b70d2"
      },
      title1: {
        fontFamily: "Helvetica"
      }
    }
  }));
  const classes = useStyles();
  const { formContainer, buttons } = classes;
  /////////////////////////////////////////////////////////////
  const userInfo = useSelector(state => state.authReducer);
  const backEndMessages = useSelector(state => state.messagesReducer);
  const dispatch = useDispatch();
  const logDispatch = () => dispatch(loginAction({ email, password, props }));
  const clearMessagesDispatch = () => dispatch(clearMessages());
  const { token, isLoading } = userInfo;
  const { messageCode, message } = backEndMessages;

  ///////////////////////////////////////////////////////////////////
  const formDefaultValues = {
    email: "",
    password: ""
  };
  const [formValues, setFormValues] = useState(formDefaultValues);
  const { email, password } = formValues;
  //////////////////////////////////////////////////////////////////////

  const handleChange = e => {
    const target = e.target;
    setFormValues(prevState => ({
      ...prevState,
      [target.name]: target.value
    }));
  };
  /////////////////////////////////////////////////////////////
  const { register, handleSubmit, errors } = useForm();
  ////////////////////////////////////////////////////////////

  const loginSubmit = () => {
    logDispatch();
  };

  /////////////////////////////////////////////////////////////////
  return token ? (
    <Redirect to="/" />
  ) : (
    <>
      <div className={formContainer}>
        <form onSubmit={handleSubmit(loginSubmit)}>
          <Typography variant="h6">Log In</Typography>
          <div
            className="g-recaptcha"
            data-sitekey="6LewnM0UAAAAABVb0aqhDQbSah_dcD9NpbyXBxVV"
          ></div>

          <div>
            <TextField
              color="secondary"
              inputRef={register({
                required: { value: true, message: "email cannot be empty" }
              })}
              onChange={handleChange}
              label="Email"
              type="email"
              name="email"
              onFocus={clearMessagesDispatch}
              error={messageCode === 462 || errors.email}
              helperText={
                (messageCode === 462 && message) || errors?.email?.message
              }
              margin="normal"
              value={email}
            ></TextField>
          </div>
          <div>
            <TextField
              color="secondary"
              inputRef={register({
                required: { value: true, message: "password cannot be empty" }
              })}
              label="Password"
              onChange={handleChange}
              onFocus={clearMessagesDispatch}
              error={messageCode === 462 || errors.password}
              type="password"
              name="password"
              helperText={
                (messageCode === 462 && message) || errors?.password?.message
              }
              margin="normal"
              value={password}
            ></TextField>
          </div>
          <div className="paddingTop">
            <Button className={buttons} type="submit">
              Log In{" "}
              {isLoading && (
                <div className="spinnerMarginLeft">
                  <CircularProgress size={15} />
                </div>
              )}
            </Button>
            <Button className={buttons} href="/register">
              Register
            </Button>
          </div>
        </form>
        {messageCode === 463 && <EmailConfirmation />}
      </div>
      <div>{messageCode === 500 && <FatalError />}</div>
    </>
  );
};

export default Login;
