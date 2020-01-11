import React from "react";
import { Typography, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const ErrorPage = () => {
  /////////////////////////////////////////////////////////////
  const useStyles = makeStyles(() => ({
    errorContainer: {
      margin: "15vh auto",
      width: "300px",
      height: " 200px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      animation: "drop 1s ease"
    },
    gif: {
      pointerEvents: "none"
    }
  }));
  const classes = useStyles();
  const { errorContainer, gif } = classes;
  //////////////////////////////////////////////////////////////////
  return (
    <>
      <Paper className={errorContainer}>
        <Typography variant="h6" color="secondary">
          Page does not exist
        </Typography>
        <iframe
          className={gif}
          src="https://giphy.com/embed/yhfTY8JL1wIAE"
          width="480"
          height="318"
          frameBorder="0"
          allowFullScreen
          title="dragon"
        ></iframe>
      </Paper>
    </>
  );
};

export default ErrorPage;
