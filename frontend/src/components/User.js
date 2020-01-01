import React, { useState, useEffect } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userInfo } from "../actions/userActions";

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
  const authRedux = useSelector(state => state.auth);
  const { role, token, error } = authRedux;
  const dispatch = useDispatch();
  const userInfoDispatch = () => dispatch(userInfo({ animal, color, result }));
  /////////////////////////////////////////////////////////////////////////////////////////
  const onSubmit = async e => {
    e.preventDefault();
    userInfoDispatch();
    setFormValues(formDefaultValues);
    /* try{
            const data = await axios.post('http://localhost:5001/user', {
                animal,
                color,
                result 
            },
             {
                headers : {"auth-token" : token}
            });
            console.log(data);
            setFormValues(formDefaultValues);
        }catch(err){
            console.log(err.response)
            setErrors(err.response.data)
        } */
  };
  ///////////////////////////////////////////////////////////////////////////
  const errorMessages = (
    <div class="alert alert-danger" role="alert">
      {error}
    </div>
  );
  ///////////////////////////////////////////////////////////////////////////////////////////
  return !token ? (
    <Redirect to="/" />
  ) : (
    <>
      <h1 className="text-center mb-5">User Page</h1>
      <div className="container">
        <form onSubmit={onSubmit}>
          <h2 className="text-center">Random Info</h2>
          <div className="form-group">
            <label className="control-label">Animal</label>
            <input
              onChange={handleChange}
              className="form-control"
              type="text"
              placeholder="ANIMAL"
              name="animal"
              value={animal}
            ></input>
          </div>
          <div className="form-group">
            <label className="control-label">Color</label>
            <input
              onChange={handleChange}
              className="form-control"
              type="text"
              placeholder="COLOR"
              name="color"
              value={color}
            ></input>
          </div>
          <div className="form-group d-flex justify-content-sm-around mt-2">
            <p>{valueA}</p>
            <p>+</p>
            <p>{valueB}</p>
            <p>=</p>
            <div class="col-xs-2">
              <input
                onChange={handleChange}
                className="form-control text-center"
                type="text"
                name="result"
                value={result}
              ></input>
            </div>
          </div>
          <div className="form-group">
            <button className="btn btn-primary btn-lg" type="submit">
              Submit
            </button>
          </div>
          {error ? errorMessages : null}
        </form>
      </div>
    </>
  );
};

export default User;
