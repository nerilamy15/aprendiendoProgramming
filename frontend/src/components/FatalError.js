import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { SnackbarContent } from "@material-ui/core";
import { red } from "@material-ui/core/colors";

const useStyles = makeStyles(theme => ({
  message: {
    backgroundColor: red[500],
    justifyContent: "center",
    width: "50%",
    margin: "auto"
  }
}));

const FatalError = () => {
  const classes = useStyles();
  const { message } = classes;

  return (
    <>
      <SnackbarContent
        className={message}
        message={"Unexpected error, try again later"}
      ></SnackbarContent>
    </>
  );
};

export default FatalError;
