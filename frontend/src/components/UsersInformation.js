import React, { useEffect } from "react";
import FatalError from "./FatalError";
import SuccessMessage from "./SuccessMessage";
import UsersTable from "./UsersTable";
import { Redirect } from "react-router-dom";
import { Typography, Button, CircularProgress } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "../actions/fetchUsersAction";
import { clearMessages } from "../actions/messagesActions";

const UsersInformation = () => {
  const userData = useSelector(state => state.authReducer);
  const backEndMessages = useSelector(state => state.messagesReducer);
  const userInfo = useSelector(state => state.fetchUsersReducer);
  const dispatch = useDispatch();
  const clearMessagesDispatch = () => dispatch(clearMessages());
  const fetchUsersDispatch = () => dispatch(fetchUsers({ token }));
  /////////////////////////////////////////////////////////////////
  const { messageCode } = backEndMessages;
  const { token, role } = userData;
  const { users, isLoading } = userInfo;
  /////////////////////////////////////////////////////////////////////
  useEffect(() => {
    fetchUsersDispatch();
  }, []);
  /////////////////////////////////////////////////////////////////////
  return role !== "admin" ? (
    <Redirect to="/user" />
  ) : (
    <>
      <div onMouseOver={clearMessagesDispatch} className="formContainer">
        <Typography variant="h6">usersInfo</Typography>
        <Button onClick={fetchUsersDispatch}>Fetch Users</Button>
      </div>
      <div className="marginBottom">
        {messageCode === 500 && <FatalError />}
        {messageCode === 236 && <SuccessMessage />}
      </div>

      {isLoading || !users ? (
        <div className="marginLeft">
          <CircularProgress size={100} />
        </div>
      ) : (
        <UsersTable
          users={users}
          token={token}
          clearMessages={clearMessagesDispatch}
          messageCode={messageCode}
          reloadTable={fetchUsersDispatch}
        />
      )}
    </>
  );
};

export default UsersInformation;
