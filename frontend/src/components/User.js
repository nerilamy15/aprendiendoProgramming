import React, { useState, useEffect } from "react";
import FatalError from "./FatalError";
import SuccessMessage from "./SuccessMessage";
import { useForm } from "react-hook-form";
import { TextField, Button, Typography } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { editProfile } from "../actions/editProfileAction";
import { clearMessages } from "../actions/messagesActions";
///////____________________________________________________________/////////////////
///////_____________ esto todavia no funciona bien________________/////////////////
///////____________________________________________________________________________
const User = props => {
  //////////////////////////////////////////////////////////////////////////////
  const formDefaultValues = {
    editedName: "",
    editedEmail: ""
  };
  const [formValues, setFormValues] = useState(formDefaultValues);
  const { editedName, editedEmail } = formValues;
  //////////////////////////////////////////////////////////////////////////////////

  const handleChange = e => {
    const target = e.target;
    setFormValues(prevState => ({
      ...prevState,
      [target.name]: target.value
    }));
  };
  ////////////////////////////////////////////////////////////////
  useEffect(() => {
    setFormValues({ editedName: user, editedEmail: email });
  }, []);
  ////////////////////////////////////////////////////////////////////
  const userData = useSelector(state => state.authReducer);
  const backEndMessages = useSelector(state => state.messagesReducer);
  const { token, user, email, id } = userData;

  const { messageCode } = backEndMessages;
  const dispatch = useDispatch();
  const editProfileDispatch = () => {
    dispatch(editProfile({ token, editedName, editedEmail, id }));
    setFormValues({ editedName: "", editedEmail: "" });
  };
  const clearMessagesDispatch = () => dispatch(clearMessages());
  /////////////////////////////////////////////////////////////////////////////////////////
  const { register, handleSubmit, errors } = useForm();
  ///////////////////////////////////////////////////////////////////////////////////
  return !token ? (
    <Redirect to="/" />
  ) : (
    <>
      <div className="formContainer extraHeight">
        <form onSubmit={handleSubmit(editProfileDispatch)}>
          <Typography>Edit your profile </Typography>
          <div>
            <TextField
              inputRef={register({
                required: { value: true, message: "field cannot be empty" }
              })}
              label="name"
              onChange={handleChange}
              onFocus={clearMessagesDispatch}
              type="text"
              name="editedName"
              value={editedName}
              margin="normal"
              error={errors.result}
              helperText={errors?.userDefault?.message}
            ></TextField>
          </div>
          <div>
            <TextField
              label="Email"
              onChange={handleChange}
              onFocus={clearMessagesDispatch}
              type="text"
              name="editedEmail"
              value={editedEmail}
              margin="normal"
              error={errors.result}
              helperText={errors?.emailDefault?.message}
            ></TextField>
          </div>
          <div className="form-group">
            <Button type="submit">Edit</Button>
            <Button
              onClick={() =>
                setFormValues(
                  { userDefault: "", emailDefault: "" },
                  props.history.push("/")
                )
              }
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
      <div>{messageCode === 500 && <FatalError />}</div>
      <div>{messageCode === 200 && <SuccessMessage />}</div>
    </>
  );
};

export default User;
