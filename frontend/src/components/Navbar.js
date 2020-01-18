import React from "react";
import { AppBar, Button, Toolbar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutAction } from "../actions/authActions/logoutAction";
import NavbarDropdown from "./NavbarDropdown";

const Navbar = () => {
  const useStyles = makeStyles(() => ({
    navBar: {
      background: "#3b4248",
      boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
      color: "white",
      height: "10vh",
      display: "flex",
      justifyContent: "space-around"
    },
    links: {
      color: "white",
      fontWeight: "bold",
      textTransform: "uppercase",
      transition: ".2s ease all",
      paddingBottom: 5,
      "&:hover": {
        textDecoration: "none",
        color: "#8b70d2",
        borderBottom: "solid 5px #8b70d2"
      }
    },
    buttonMarginRight: {
      marginRight: 15
    },
    popUpMarginTop: {
      marginTop: 40
    }
  }));

  const classes = useStyles();
  const {
    navBar,
    links,
    buttons,
    buttonMarginRight,
    popUpMarginTop,
    dropDown
  } = classes;
  //////////////////////////////////////////////////////////////////////
  const authReducer = useSelector(state => state.authReducer);
  const { role, isAuthenticated, name, userName } = authReducer;
  const dispatch = useDispatch();
  const logoutDispatch = () => dispatch(logoutAction());
  //////////////////////////////////////////////////////////////////////
  let alias = userName ? userName : name;
  const auth = (
    <div>
      <Link className={`${links} ${buttonMarginRight}`} to="/register">
        Register
      </Link>

      <Link className={links} to="/login">
        LogIn
      </Link>
    </div>
  );

  /////////////////////////////////////////////////////////////////
  return (
    <>
      <div>
        <AppBar position="fixed">
          <Toolbar className={navBar}>
            <div>
              <Link className={links} to="/">
                Home
              </Link>
            </div>
            {!isAuthenticated && auth}
            {isAuthenticated && (
              <NavbarDropdown
                styles={links}
                role={role}
                alias={alias}
                logout={logoutDispatch}
              />
            )}
          </Toolbar>
        </AppBar>
      </div>
    </>
  );
};

export default Navbar;
