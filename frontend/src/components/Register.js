import React, { useState } from "react";
import FatalError from "./FatalError";
import Captcha from "./Captcha";
import { useForm } from "react-hook-form";
import {
  TextField,
  Button,
  Typography,
  CircularProgress
} from "@material-ui/core";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { registerAction } from "../actions/registerAction";
import { clearMessages } from "../actions/messagesActions";

const Register = props => {
  ///////////////////////////////////////////////////////////////
  const FormDefaultValues = {
    name: "",
    email: "",
    password: ""
  };
  const [formValues, setFormValues] = useState(FormDefaultValues);
  let { name, email, password } = formValues;
  //////////////////////////////////////////////////////////
  const handleChange = e => {
    const target = e.target;
    setFormValues(prevState => ({
      ...prevState,
      [target.name]: target.value
    }));
  };
  ////////////////////////////////////////////

  const userInfo = useSelector(state => state.authReducer);
  const backEndMessages = useSelector(state => state.messagesReducer);
  const { token, isLoading, verifyCaptcha } = userInfo;
  const { messageCode, message } = backEndMessages;
  const dispatch = useDispatch();
  const clearMessagesDispatch = () => dispatch(clearMessages());
  ///////////////////////////////////////////
  const { register, handleSubmit, errors } = useForm();
  /////////////////////////////////////////////////////////

  const registerSubmit = () => {
    !verifyCaptcha === true
      ? alert("you forgot the captcha")
      : dispatch(registerAction({ name, email, password, props }));
  };
  //////////////////////////////////////////////////////////////

  return token ? (
    <Redirect to="/" />
  ) : (
    <>
      <div className="formContainer extraHeight">
        <form onSubmit={handleSubmit(registerSubmit)}>
          <Typography variant="h6">Register</Typography>
          <div>
            <TextField
              inputRef={register({
                required: { value: true, message: "name cannot be empty" },
                minLength: {
                  value: 6,
                  message: "name must be at least 6 characteres long"
                }
              })}
              label="Username"
              onChange={handleChange}
              type="text"
              name="name"
              value={name}
              margin="normal"
              onFocus={clearMessagesDispatch}
              error={messageCode === 461 || errors.name}
              helperText={
                (messageCode === 461 && message) || errors?.name?.message
              }
            ></TextField>
          </div>
          <div>
            <TextField
              inputRef={register({
                required: { value: true, message: "email cannot be empty" },
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "invalid email"
                }
              })}
              onChange={handleChange}
              type="email"
              label="Email"
              name="email"
              margin="normal"
              value={email}
              error={messageCode === 460 || errors.email}
              onFocus={clearMessagesDispatch}
              helperText={
                (messageCode === 460 && message) || errors?.email?.message
              }
            >
              >
            </TextField>
          </div>
          <div>
            <TextField
              inputRef={register({
                required: { value: true, message: "password cannot be empty" },
                minLength: {
                  value: 6,
                  message: "password must be at least 6 characteres long"
                }
              })}
              onChange={handleChange}
              label="Password"
              type="password"
              name="password"
              margin="normal"
              error={errors.password}
              onFocus={clearMessagesDispatch}
              value={password}
              helperText={errors?.password?.message}
            ></TextField>
          </div>
          <div className="paddingTop">
            <Button type="submit">
              Register
              {isLoading && (
                <div className="spinnerMarginLeft">
                  <CircularProgress size={15} />
                </div>
              )}
            </Button>
          </div>
        </form>
        <Captcha />
      </div>
      <div>{messageCode === 500 && <FatalError />}</div>
    </>
  );
};

export default Register;
