import React, { useEffect } from "react";
import { AppBar, Button, Toolbar, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loggedout } from "../actions/authActions";

const Navbar = () => {
  ///////////////////////////////////////////////////
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
      <AppBar color="primary" position="static">
        <Toolbar>
          <Grid
            container
            spacing={24}
            direction="row"
            alignItems="center"
            justify="space-between"
          >
            <Grid item xs={10}>
              <Button>
                <Link to="/">Home</Link>
              </Button>
            </Grid>
            {roleController()}
            <Grid item xs={2}>
              {!isAuthenticated ? register : null}
              {isAuthenticated ? logout : signin}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
