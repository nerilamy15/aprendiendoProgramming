import React, { useState, useEffect } from "react";
import { TextField, Button, Typography } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loadUser } from "../actions/authActions";

const Login = props => {
  /////////////////////////////////////////////////////////////
  const authRedux = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const logDispatch = () => dispatch(loadUser({ email, password, props }));
  const { role, error, token } = authRedux;
  console.log(authRedux);
  console.log(role);
  ///////////////////////////////////////////////////////////////////
  const formDefaultValues = {
    email: "",
    password: ""
  };
  const [formValues, setFormValues] = useState(formDefaultValues);
  const { email, password } = formValues;
  //////////////////////////////////////////////////////////////////////
  console.log(error);
  const handleChange = e => {
    const target = e.target;
    setFormValues(prevState => ({
      ...prevState,
      [target.name]: target.value
    }));
  };
  /////////////////////////////////////////////////////////////

  const onSubmit = async e => {
    e.preventDefault();
    logDispatch();
    /*
     
      role === "admin" ? props.history.push("/admin") : props.history.push("/");
      toogleDispatch();
    
    */
  };
  /////////////////////////////////////////////////////////////////////////
  //const token = localStorage.getItem("token");
  /////////////////////////////////////////////////////////////////////////

  return token ? (
    <Redirect to="/" />
  ) : (
    <div className="container" style={{ marginTop: 20 }}>
      <form onSubmit={onSubmit}>
        <Typography>Log In</Typography>
        <div>
          <TextField
            onChange={handleChange}
            label="Email"
            type="email"
            name="email"
            placeholder="EMAIL"
            value={email}
          ></TextField>
        </div>
        <div>
          <TextField
            label="Password"
            onChange={handleChange}
            type="password"
            placeholder="PASSWORD"
            name="password"
            value={password}
          ></TextField>
        </div>
        <div>
          <Button type="submit">Log In</Button>
          <Button href="/register">Register</Button>
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

export default Login;
