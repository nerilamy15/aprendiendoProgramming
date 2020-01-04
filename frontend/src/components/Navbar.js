import React, { useEffect } from "react";
import { AppBar, Button, Toolbar, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loggedout } from "../actions/authActions";

const Navbar = () => {
  ///////////////////////////////////////////////////

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

  const authRedux = useSelector(state => state.auth);
  const { role, isAuthenticated } = authRedux;
  const dispatch = useDispatch();
  const logoutDispatch = () => dispatch(loggedout());
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

  const roleController = () => {
    if (role === "basic") {
      return user;
    } else if (role === "admin") {
      return admin;
    } else {
      return null;
    }
  };

  useEffect(() => {
    roleController();
  }, [role]);

  return (
    <>
      <div className={classes.root}>
        <AppBar position="fixed">
          <Toolbar color="primary">
            <Button className={classes.menuButton}>
              <Link to="/">Home</Link>
            </Button>

            {roleController()}

            {!isAuthenticated ? register : null}
            {isAuthenticated ? logout : signin}
          </Toolbar>
        </AppBar>
      </div>
    </>
  );
};

export default Navbar;
