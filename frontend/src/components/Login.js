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
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginAction } from "../actions/loginAction";
import { clearMessages } from "../actions/messagesActions";

const Login = props => {
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
      <div className="formContainer loginForm">
        <form onSubmit={handleSubmit(loginSubmit)}>
          <Typography variant="h6">Log In</Typography>
          <div
            className="g-recaptcha"
            data-sitekey="6LewnM0UAAAAABVb0aqhDQbSah_dcD9NpbyXBxVV"
          ></div>

          <div>
            <TextField
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
            <Button type="submit">
              Log In{" "}
              {isLoading && (
                <div className="spinnerMarginLeft">
                  <CircularProgress size={15} />
                </div>
              )}
            </Button>
            <Button href="/register">Register</Button>
          </div>
        </form>
        {messageCode === 463 && <EmailConfirmation />}
      </div>
      <div>{messageCode === 500 && <FatalError />}</div>
    </>
  );
};

export default Login;
