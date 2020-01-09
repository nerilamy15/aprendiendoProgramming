import React, { useState, useEffect } from "react";
import FatalError from "./FatalError";
import SuccessMessage from "./SuccessMessage";
import { useForm } from "react-hook-form";
import { TextField, Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { editProfile } from "../actions/editProfileAction";
import { clearMessages } from "../actions/messagesActions";
///////____________________________________________________________/////////////////
///////_____________ esto todavia no funciona bien________________/////////////////
///////____________________________________________________________________________
const User = props => {
  /////////////////////////////////////////////////////////////
  const useStyles = makeStyles(() => ({
    formContainer: {
      margin: "15vh auto",
      width: "300px",
      height: " 300px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      animation: "drop 1s ease",
      boxShadow: "0 0.5px 0 0 #ffffff inset, 0 1px 2px 0 #b3b3b3"
    },
    buttons: {
      border: "solid 2px #8b70d2",
      marginRight: "5px",
      color: "#8b70d2",
      marginTop: "20px",
      "&:hover": {
        backgroundColor: "#8b70d2 !important",
        border: "solid 2px white",
        color: "white",
        backgroundColor: "#8b70d2"
      }
    }
  }));
  const classes = useStyles();
  const { formContainer, buttons } = classes;
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
      <div className={formContainer}>
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
            <Button className={buttons} type="submit">
              Edit
            </Button>
            <Button
              className={buttons}
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
      <div>{messageCode === 270 && <SuccessMessage />}</div>
    </>
  );
};

export default User;
