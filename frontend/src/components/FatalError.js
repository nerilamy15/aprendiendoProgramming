import React from "react";
import { useDispatch } from "react-redux";
import { snackClose } from "../actions/messagesActions";
import { makeStyles } from "@material-ui/core/styles";
import { Snackbar, SnackbarContent } from "@material-ui/core";

const FatalError = ({ state }) => {
  const useStyles = makeStyles(theme => ({
    message: {
      display: "flex",
      justifyContent: "center",
      backgroundColor: "red"
    }
  }));

  const classes = useStyles();
  const { message } = classes;
  ////////////////////////////////////////////////////////
  const dispatch = useDispatch();

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        autoHideDuration={4000}
        open={state}
        onClose={() => dispatch(snackClose())}
      >
        <SnackbarContent
          className={message}
          message={"Unexpected error, try again later"}
        ></SnackbarContent>
      </Snackbar>
    </>
  );
};

export default FatalError;
