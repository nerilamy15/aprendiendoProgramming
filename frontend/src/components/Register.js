import React, { useState } from "react";
import FatalError from "./FatalError";
import { useForm } from "react-hook-form";
import { TextField, Button, Typography } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { regUser } from "../actions/authActions";
import { clearErrors } from "../actions/errorActions";

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
  ///////////////////////////////////////////
  const regRedux = useSelector(state => state.auth);
  const regError = useSelector(state => state.error);
  const { token } = regRedux;
  const { errorCode } = regError;
  const dispatch = useDispatch();
  const clearErrorsDispatch = () => dispatch(clearErrors());
  ///////////////////////////////////////////
  const { register, handleSubmit, errors } = useForm();
  //////////////////////////////////////////
  const registerSubmit = e => {
    //e.preventDefault();
    // attempt to reg new user
    dispatch(regUser({ name, email, password, props }));
    console.log(formValues);
  };
  //////////////////////////////////////////////////////////////

  return token ? (
    <Redirect to="/" />
  ) : (
    <div className="container extra">
      <form onSubmit={handleSubmit(registerSubmit)}>
        <Typography>Register</Typography>
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
            onFocus={clearErrorsDispatch}
            error={errorCode === 461 || errors.name}
            helperText={
              (errorCode === 461 && "username is already in use") ||
              errors?.name?.message
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
            error={errorCode === 460 || errors.email}
            onFocus={clearErrorsDispatch}
            helperText={
              (errorCode === 460 && "email is already in use") ||
              errors?.email?.message
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
            onFocus={clearErrorsDispatch}
            value={password}
            helperText={errors?.password?.message}
          ></TextField>
        </div>
        <div>
          <Button type="submit">Register</Button>
        </div>
      </form>
      <div>{errorCode === 500 && <FatalError />}</div>
    </div>
  );
};

export default Register;
