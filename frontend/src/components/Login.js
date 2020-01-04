import React, { useState } from "react";
import FatalError from "./FatalError";
import { useForm } from "react-hook-form";
import { TextField, Button, Typography } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loadUser, mailConfirmed } from "../actions/authActions";
import { clearErrors } from "../actions/errorActions";

const Login = props => {
  /////////////////////////////////////////////////////////////
  const authRedux = useSelector(state => state.auth);
  const regError = useSelector(state => state.error);
  const dispatch = useDispatch();
  const logDispatch = () => dispatch(loadUser({ email, password, props }));
  const clearErrorsDispatch = () => dispatch(clearErrors());
  const mailConfirmedDispatch = () => dispatch(mailConfirmed());
  const { token, verificarMail } = authRedux;
  const { errorCode } = regError;
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

  const loginSubmit = async e => {
    //e.preventDefault();
    logDispatch();
  };

  return !verificarMail ? (
    <div className="container extra">
      <a
        onClick={mailConfirmedDispatch}
        href="https://www.google.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Verifica tu mail
      </a>
    </div>
  ) : token ? (
    <Redirect to="/" />
  ) : (
    <div className="container extra">
      <form onSubmit={handleSubmit(loginSubmit)}>
        <Typography>Log In</Typography>
        <div>
          <TextField
            inputRef={register({
              required: { value: true, message: "email cannot be empty" }
            })}
            onChange={handleChange}
            label="Email"
            type="email"
            name="email"
            onFocus={clearErrorsDispatch}
            error={errorCode === 462 || errors.email}
            helperText={
              (errorCode === 462 && "email or password incorrect") ||
              errors?.email?.message
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
            onFocus={clearErrorsDispatch}
            error={errorCode === 463 || errors.password}
            type="password"
            name="password"
            helperText={
              (errorCode === 463 && "email or password incorrect") ||
              errors?.password?.message
            }
            margin="normal"
            value={password}
          ></TextField>
        </div>
        <div>
          <Button type="submit">Log In</Button>
          <Button href="/register">Register</Button>
        </div>
      </form>
      <div>{errorCode === 500 && <FatalError />}</div>
    </div>
  );
};

export default Login;
