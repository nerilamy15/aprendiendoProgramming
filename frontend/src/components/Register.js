import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
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
  const { error, token } = regRedux;
  const dispatch = useDispatch();
  const clearErrorsDispatch = () => dispatch(clearErrors());
  ///////////////////////////////////////////
  const onSubmit = e => {
    e.preventDefault();
    // attempt to reg new user

    dispatch(regUser({ name, email, password, props }));

    clearErrorsDispatch();
  };
  //////////////////////////////////////////////////////////////

  return token ? (
    <Redirect to="/" />
  ) : (
    <div className="container" style={{ marginTop: 20 }}>
      <form onSubmit={onSubmit}>
        <Typography>Register</Typography>
        <div>
          <TextField
            label="Username"
            onChange={handleChange}
            type="text"
            name="name"
            value={name}
          ></TextField>
        </div>
        <div>
          <TextField
            onChange={handleChange}
            type="email"
            label="Email"
            name="email"
            value={email}
          ></TextField>
        </div>
        <div>
          <TextField
            onChange={handleChange}
            label="Password"
            type="password"
            name="password"
            value={password}
          ></TextField>
        </div>
        <div>
          <Button type="submit">Register</Button>
        </div>
        {error ? (
          <div class="alert alert-danger" role="alert">
            {error}
          </div>
        ) : null}
      </form>
    </div>
  );
};

export default Register;
