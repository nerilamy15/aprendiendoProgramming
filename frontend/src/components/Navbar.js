import React, { useEffect } from "react";
import { AppBar, Button, Toolbar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutAction } from "../actions/logoutAction";

const Navbar = () => {
  const useStyles = makeStyles(theme => ({
    root: {
      display: "flex",
      justifyContent: "space-evenly"
    },
    menuButton: {
      marginRight: theme.spacing(10),
      flexGrow: 1
    }
  }));

  const classes = useStyles();
  //////////////////////////////////////////////////////////////////////
  const userInfo = useSelector(state => state.authReducer);
  const { role, isAuthenticated } = userInfo;
  const dispatch = useDispatch();
  const logoutDispatch = () => dispatch(logoutAction());
  //////////////////////////////////////////////////////////////////////
  const user = (
    <Button>
      <Link to="/user">User</Link>
    </Button>
  );
  const admin = (
    <>
      <Button>
        <Link to="/user">User</Link>
      </Button>
      <Button>
        <Link to="/admin">Admin</Link>
      </Button>
    </>
  );
  const register = (
    <Button>
      <Link to="/register" color="inherit">
        Register
      </Link>
    </Button>
  );
  const signin = (
    <Button>
      <Link to="/login" color="inherit">
        LogIn
      </Link>
    </Button>
  );
  const logout = (
    <Button onClick={() => logoutDispatch()}>
      <Link to="/login">LogOut</Link>
    </Button>
  );
  /////////////////////////////////////////////////////////////////
  return (
    <>
      <div className={classes.root}>
        <AppBar position="fixed">
          <Toolbar color="primary">
            <Button className={classes.menuButton}>
              <Link to="/">Home</Link>
            </Button>
            {role === "basic" && user}
            {role === "admin" && admin}
            {!isAuthenticated && register}
            {isAuthenticated ? logout : signin}
          </Toolbar>
        </AppBar>
      </div>
    </>
  );
};

export default Navbar;
