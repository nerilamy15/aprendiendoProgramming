import React, { useState } from "react";
import FatalError from "./FatalError";
//import { useForm } from "react-hook-form";
import { TextField, Button, CircularProgress } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { clearMessages } from "../actions/messagesActions";
import { editUser } from "../actions/editUserAction";

const EditForm = ({
  name,
  email,
  role,
  id,
  handleChange,
  formOpen,
  setFormOpen,
  reloadAfterEdit
}) => {
  ///////////////////////////////////////////

  const userInfo = useSelector(state => state.authReducer);
  const backEndMessages = useSelector(state => state.messagesReducer);
  const { token, isLoading } = userInfo;
  const { messageCode, message } = backEndMessages;
  const dispatch = useDispatch();
  const clearMessagesDispatch = () => dispatch(clearMessages());
  const editUserDispatch = () =>
    dispatch(editUser({ name, email, role, token, id }));
  ///////////////////////////////////////////
  const submit = () => {
    editUserDispatch();
    reloadAfterEdit();
    setFormOpen(!formOpen);
    ////////////////////////////////////////////
  };
  return (
    <>
      <div className={!formOpen ? "marginLeft hidden" : "marginLeft"}>
        <form onSubmit={submit}>
          <div>
            <TextField
              label="Username"
              onChange={handleChange}
              type="text"
              name="name"
              value={name}
              margin="normal"
              onFocus={clearMessagesDispatch}
            ></TextField>
          </div>
          <div>
            <TextField
              type="email"
              label="Email"
              onChange={handleChange}
              name="email"
              margin="normal"
              value={email}
            >
              >
            </TextField>
          </div>
          <div>
            <TextField
              type="text"
              label="Role"
              onChange={handleChange}
              name="role"
              margin="normal"
              value={role}
            >
              >
            </TextField>
          </div>
          <div>
            <Button type="submit">
              Edit
              {isLoading && (
                <CircularProgress className="spinnerMarginLeft" size={15} />
              )}
            </Button>
            <Button onClick={() => setFormOpen(!formOpen)}>Cancel</Button>
          </div>
        </form>
      </div>
      <div>{messageCode === 500 && <FatalError />}</div>
    </>
  );
};

export default EditForm;
