import React, { useState } from "react";
import EditForm from "./EditForm";
import { Link } from "react-router-dom";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import {
  Paper,
  Button,
  Popper,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table
} from "@material-ui/core/";
import { useDispatch } from "react-redux";
import { deleteUserAction } from "../actions/deleteUserAction";

////////////////////////////////////////////////////////////////////////
const UsersTable = ({ users, token, messageCode, reloadTable }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const handleClick = event => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;
  /////////////////////////////////////////////////////////////////////////
  const FormDefaultValues = {
    name: "",
    email: "",
    role: "",
    identifier: id
  };
  const [formValues, setFormValues] = useState(FormDefaultValues);
  const { name, email, role, identifier } = formValues;
  ////////////////////////////////////////////////////////////////////////
  const dispatch = useDispatch();
  const deleteUserDispatch = id => dispatch(deleteUserAction({ token, id }));

  const removeUser = id => {
    deleteUserDispatch(id);
    reloadTable();
    setAnchorEl(!anchorEl);
  };

  //////////////////////////////////////////////////////////////////////////////////////////////
  const editUser = (id, name, email, role) => {
    const data = setFormValues({ name, email, role, identifier: id });
    setFormOpen(!formOpen);
  };
  console.log(formOpen);
  ////////////////////////////////////////////////////
  const handleChange = e => {
    const target = e.target;
    setFormValues(prevState => ({
      ...prevState,
      [target.name]: target.value
    }));
  };
  /////////////////////////////////////////////////////
  return (
    <>
      {formOpen ? (
        <EditForm
          name={name}
          email={email}
          role={role}
          id={identifier}
          handleChange={handleChange}
          formOpen={formOpen}
          setFormOpen={setFormOpen}
          reloadAfterEdit={reloadTable}
        />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">EDIT</TableCell>
                <TableCell align="center">DELETE</TableCell>
                <TableCell align="center">NAME</TableCell>
                <TableCell align="center">EMAIL</TableCell>
                <TableCell align="center">ROLE</TableCell>
                <TableCell align="center">PASSWORD</TableCell>
                <TableCell align="center">ID</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map(user => (
                <TableRow key={user._id}>
                  <TableCell>
                    <Button
                      onClick={() =>
                        editUser(user._id, user.name, user.email, user.role)
                      }
                    >
                      <EditOutlinedIcon></EditOutlinedIcon>
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      aria-describedby={id}
                      type="button"
                      onClick={handleClick}
                    >
                      <Popper
                        className="popper"
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        placement={"top"}
                      >
                        <p className="redBubble">
                          are you sure you want to delete it?
                        </p>
                        <div className="adminBtns">
                          <Button onClick={() => removeUser(user._id)}>
                            Confirm
                          </Button>
                          <Button onClick={() => setAnchorEl(!anchorEl)}>
                            Cancel
                          </Button>
                        </div>
                      </Popper>
                      <DeleteOutlineOutlinedIcon></DeleteOutlineOutlinedIcon>
                    </Button>
                  </TableCell>
                  <TableCell component="th" scope="row" align="center">
                    <Link to={`/admin/users/${user._id}`} target="_blank">
                      {user.name}
                    </Link>
                  </TableCell>
                  <TableCell component="th" scope="row" align="center">
                    {user.email}
                  </TableCell>
                  <TableCell component="th" scope="row" align="center">
                    {user.role}
                  </TableCell>
                  <TableCell component="th" scope="row" align="center">
                    {user.password}
                  </TableCell>
                  <TableCell component="th" scope="row" align="center">
                    {user._id}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default UsersTable;
