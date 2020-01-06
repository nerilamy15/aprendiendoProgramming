import React, { useState } from "react";
import FatalError from "./FatalError";
import SuccessMessage from "./SuccessMessage";
import { useForm } from "react-hook-form";
import { TextField, Button, Typography, Box, flexbox } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userInfo } from "../actions/userActions";
import { clearErrors } from "../actions/errorActions";

const User = props => {
  //////////////////////////////////////////////////////////////////////////////
  const formDefaultValues = {
    animal: "",
    color: "",
    result: ""
  };
  const [formValues, setFormValues] = useState(formDefaultValues);
  const { animal, color, result } = formValues;
  /////////////////////////////////////////////////////////////////////////
  let valueA = 10;
  let valueB = 20;

  ///////////////////////////////////////////////////////////////////////////////////

  const handleChange = e => {
    const target = e.target;
    setFormValues(prevState => ({
      ...prevState,
      [target.name]: target.value
    }));
  };
  ////////////////////////////////////////////////////////////////////
  const userInfo = useSelector(state => state.authReducer);
  const backEndErrors = useSelector(state => state.errorsReducer);
  const userRedux = useSelector(state => state.userInfoReducer);
  const { successCode } = userRedux;
  const { token } = userInfo;
  const { errorCode } = backEndErrors;
  const dispatch = useDispatch();
  const userInfoDispatch = () =>
    dispatch(userInfo({ animal, color, result, token }));
  const clearErrorsDispatch = () => dispatch(clearErrors());
  /////////////////////////////////////////////////////////////////////////////////////////
  const { register, handleSubmit, errors } = useForm();
  ///////////////////////////////////////////////////////////////////////////////////
  const userInformation = () => {
    userInfoDispatch();
    setFormValues(formDefaultValues);
  };
  ///////////////////////////////////////////////////////////////////////////
  return !token ? (
    <Redirect to="/" />
  ) : (
    <>
      <div className="container extra">
        <form onSubmit={handleSubmit(userInformation)}>
          <Typography>Random Info</Typography>
          <div>
            <TextField
              inputRef={register({
                required: { value: true, message: "animal cannot be empty" }
              })}
              label="Animal"
              onChange={handleChange}
              type="text"
              name="animal"
              value={animal}
              margin="normal"
              onFocus={clearErrorsDispatch}
              error={errors.animal}
              helperText={errors?.animal?.message}
            ></TextField>
          </div>
          <div>
            <TextField
              inputRef={register({
                required: { value: true, message: "Color cannot be empty" }
              })}
              label="Color"
              onChange={handleChange}
              type="text"
              name="color"
              value={color}
              margin="normal"
              onFocus={clearErrorsDispatch}
              error={errors.color}
              helperText={errors?.animal?.message}
            ></TextField>
          </div>
          <div>
            <div className="flex">
              <div className="flex result">
                <p>{valueA}</p>
                <p>+</p>
                <p>{valueB}</p>
                <p>=</p>
              </div>
              <TextField
                inputRef={register({
                  required: { value: true, message: "field cannot be empty" }
                })}
                onChange={handleChange}
                type="text"
                name="result"
                value={result}
                error={errors.result}
                helperText={errors?.result?.message}
              ></TextField>
            </div>
          </div>
          <div className="form-group">
            <Button type="submit">Submit</Button>
          </div>
          <div>{errorCode === 500 && <FatalError />}</div>
          <div>{successCode && <SuccessMessage />}</div>
        </form>
      </div>
    </>
  );
};

export default User;
