import React from "react";
import { AppBar, Button, Toolbar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutAction } from "../actions/logoutAction";
import NavbarDropdown from "./NavbarDropdown";

const Navbar = () => {
  const useStyles = makeStyles(theme => ({
    root: {
      background: "linear-gradient(to top, #209cff 0%, #68e0cf 100%)",
      boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
      color: "white",
      height: "10vh",
      display: "flex",
      justifyContent: "space-around"
    },
    links: {
      color: "white",
      "&:hover": {
        textDecoration: "none",
        color: "white"
      }
    },
    buttons: {
      border: "2px solid white",
      color: "white"
    },
    buttonMargin: {
      marginRight: "10px"
    },
    popUpMarginTop: {
      marginTop: "40px"
    }
  }));

  const classes = useStyles();
  const { root, links, buttons, buttonMargin, popUpMarginTop } = classes;
  //////////////////////////////////////////////////////////////////////
  const userInfo = useSelector(state => state.authReducer);
  const { role, isAuthenticated, user } = userInfo;
  const dispatch = useDispatch();
  const logoutDispatch = () => dispatch(logoutAction());
  //////////////////////////////////////////////////////////////////////

  const auth = (
    <div>
      <Button className={`${buttons} ${buttonMargin}`}>
        <Link className={links} to="/register">
          Register
        </Link>
      </Button>
      <Button className={buttons}>
        <Link className={links} to="/login">
          LogIn
        </Link>
      </Button>
    </div>
  );

  /////////////////////////////////////////////////////////////////
  return (
    <>
      <div>
        <AppBar position="fixed">
          <Toolbar className={root}>
            <Button className={buttons}>
              <Link className={links} to="/">
                Home
              </Link>
            </Button>

            {!isAuthenticated && auth}
            {isAuthenticated && (
              <NavbarDropdown
                role={role}
                user={user}
                logout={logoutDispatch}
                btnStyle={buttons}
                popUpMarginTop={popUpMarginTop}
              />
            )}
          </Toolbar>
        </AppBar>
      </div>
    </>
  );
};

export default Navbar;
