import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import SnackbarMessages from "./SnackbarMessages";
import EmailConfirmation from "./EmailConfirmation";
import { useForm, ErrorMessage } from "react-hook-form";
import {
  TextField,
  Button,
  Typography,
  CircularProgress,
  Paper
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginAction } from "../actions/authActions/loginAction";
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
      animation: "drop 1s ease"
    },
    buttons: {
      border: "solid 2px #8b70d2",
      marginRight: "5px",
      color: "#8b70d2",
      "&:hover": {
        backgroundColor: "#8b70d2 !important",
        border: "solid 2px white",
        color: "white"
      },
      title: {
        color: "red",
        fontFamily: "Righteous"
      },
      disable: {
        cursor: "not-allowed !important",
        opacity: 0.5,
        backgroundColor: "red"
      }
    }
  }));
  const classes = useStyles();
  const { formContainer, buttons, title, disable } = classes;
  /////////////////////////////////////////////////////////////
  const authReducer = useSelector(state => state.authReducer);
  const messagesReducer = useSelector(state => state.messagesReducer);
  //////////////////////////////////////////////////////////////////
  const dispatch = useDispatch();
  const logDispatch = () => dispatch(loginAction({ email, password, props }));
  const clearMessagesDispatch = () => dispatch(clearMessages());
  const { token, isLoading, verifyCaptcha } = authReducer;
  const { messageCode, message } = messagesReducer;
  ////////////////////////////////////////////////////////////////////////
  const history = useHistory();
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
  const { register, handleSubmit, errors, clearError } = useForm();
  ////////////////////////////////////////////////////////////

  const loginSubmit = () => {
    logDispatch();
  };

  const clearAllErrors = () => {
    clearError();
    clearMessagesDispatch();
  };
  /////////////////////////////////////////////////////////////////
  return token ? (
    <Redirect to="/" />
  ) : (
    <>
      <Paper className={formContainer}>
        <form onSubmit={handleSubmit(loginSubmit)}>
          <Typography className={title} variant="h6">
            Log In
          </Typography>
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
              onFocus={() => clearAllErrors()}
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
              onFocus={() => clearAllErrors()}
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
      </Paper>
      {messageCode === 463 && <EmailConfirmation />}
      <SnackbarMessages />
      {/* {messageCode === 500 && history.push("/error")}}{<SnackbarMessages />}*/}
    </>
  );
};

export default Login;
