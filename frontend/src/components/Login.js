import React, { useState, useEffect } from "react";
import FatalError from "./FatalError";
import EmailConfirmation from "./EmailConfirmation";
import { useForm } from "react-hook-form";
import { TextField, Button, Typography } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginAction } from "../actions/loginAction";
import { clearErrors } from "../actions/errorActions";

const Login = props => {
  /////////////////////////////////////////////////////////////
  const userInfo = useSelector(state => state.authReducer);
  const backEndErrors = useSelector(state => state.errorsReducer);
  const dispatch = useDispatch();
  const logDispatch = () => dispatch(loginAction({ email, password, props }));
  const clearErrorsDispatch = () => dispatch(clearErrors());
  const { token } = userInfo;
  const { errorCode, error } = backEndErrors;

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
  //////////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////////
  const { register, handleSubmit, errors } = useForm();

  ////////////////////////////////////////////////////////////

  const loginSubmit = () => {
    logDispatch();
  };

  return token ? (
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
            helperText={(errorCode === 462 && error) || errors?.email?.message}
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
            error={errorCode === 462 || errors.password}
            type="password"
            name="password"
            helperText={
              (errorCode === 462 && error) || errors?.password?.message
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
      {errorCode === 463 && <EmailConfirmation />}
    </div>
  );
};

export default Login;
