import React from "react";
import SnackbarMessages from "./SnackbarMessages";
//import { useForm } from "react-hook-form";
import { TextField, Button, CircularProgress } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { clearMessages } from "../actions/messagesActions";
import { editUser } from "../actions/userActions/editUserAction";

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

  const authReducer = useSelector(state => state.authReducer);
  const messagesReducer = useSelector(state => state.messagesReducer);
  const { token, isLoading } = authReducer;
  const { messageCode } = messagesReducer;
  const dispatch = useDispatch();
  const clearMessagesDispatch = () => dispatch(clearMessages());
  const editUserDispatch = () =>
    dispatch(editUser({ name, email, role, token, id }));
  ///////////////////////////////////////////
  const submit = async () => {
    editUserDispatch();
    await reloadAfterEdit();
    setFormOpen(!formOpen);
    ////////////////////////////////////////////
  };
  return (
    <>
      <div className={!formOpen ? "hidden" : "marginLeft editTable"}>
        <form onSubmit={submit}>
          <div>
            <TextField
              label="Username"
              onChange={handleChange}
              fullWidth
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
              fullWidth
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
              fullWidth
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
      <div>{messageCode === 500 && <SnackbarMessages />}</div>
    </>
  );
};

export default EditForm;
