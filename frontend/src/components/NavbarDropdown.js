import React, { useState } from "react";
import { Button, Menu, MenuItem, Fade } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { Link } from "react-router-dom";

const NavbarDropdown = ({ role, alias, logout }) => {
  const useStyles = makeStyles(() => ({
    btn: {
      color: "white",
      fontWeight: "bold",
      textTransform: "uppercase",
      transition: ".2s ease all",
      paddingBottom: 5,
      "&:hover": {
        textDecoration: "none",
        color: "#8b70d2",
        backgroundColor: "transparent"
      }
    },
    buttonMarginRight: {
      marginRight: 15
    },
    popUpMarginTop: {
      marginTop: 40
    },
    dropDownMenu: {}
  }));

  const classes = useStyles();
  const { btn, popUpMarginTop, dropDownMenu } = classes;
  //////////////////////////////////////////////////////////////////////

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const adminLinks = (
    <div>
      <MenuItem onClick={handleClose}>
        <Link to="/admin">Admin Panel</Link>
      </MenuItem>
      <MenuItem onClick={handleClose}>
        <Link to="/admin/users">Edit Users</Link>
      </MenuItem>
    </div>
  );
  /////////////////////////////////////////////////////////////////
  return (
    <>
      <div>
        <Button
          className={btn}
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          {`Welcome ${alias}`}
          <ArrowDropDownIcon />
        </Button>
        <Menu
          className={popUpMarginTop}
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          TransitionComponent={Fade}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center"
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center"
          }}
        >
          <MenuItem onClick={handleClose}>
            <Link to="/editProfile">Edit Profile</Link>
          </MenuItem>
          {role === "admin" && adminLinks}
          <MenuItem onClick={handleClose}>
            <Link onClick={logout} to="/login">
              LogOut
            </Link>
          </MenuItem>
        </Menu>
      </div>
    </>
  );
};

export default NavbarDropdown;
