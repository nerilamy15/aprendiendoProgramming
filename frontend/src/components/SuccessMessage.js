import React from "react";
import { makeStyles, SnackbarContent } from "@material-ui/core";
import { green } from "@material-ui/core/colors";

const useStyles = makeStyles(theme => ({
  message: {
    backgroundColor: green[700],
    opacity: 0.5,
    marginTop: 30
  }
}));

const FatalError = () => {
  const classes = useStyles();
  const { message } = classes;

  return (
    <>
      <SnackbarContent className={message} message="Success!" />
    </>
  );
};

export default FatalError;
