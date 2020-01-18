import React from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { Typography, Paper, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const ServerDown = () => {
  /////////////////////////////////////////////////////////////
  const useStyles = makeStyles(() => ({
    errorContainer: {
      marginTop: "10vh",
      width: "600px",
      height: " 600px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      animation: "drop 1s ease"
    },
    gif: {
      pointerEvents: "none"
    },
    messageContainer: {
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      marginBottom: 20
    },
    message2: {
      paddingTop: 10
    }
  }));
  const classes = useStyles();
  const { errorContainer, gif, messageContainer, message2 } = classes;
  //////////////////////////////////////////////////////////////////
  const messagesReducer = useSelector(state => state.messagesReducer);
  const { messageCode } = messagesReducer;
  //////////////////////////////////////////////////////////////////
  return messageCode !== 500 ? (
    <Redirect to="/" />
  ) : (
    <>
      <Grid container spacing={2}>
        <Grid item xs={3}></Grid>
        <Grid item xs={6}>
          <div className={errorContainer}>
            <div className={messageContainer}>
              <Typography variant="h4" color="secondary">
                Oops!, something went wrong
              </Typography>
              <Typography className={message2} variant="h6" color="primary">
                please try again in few minutes
              </Typography>
            </div>
            <iframe
              className={gif}
              src="https://giphy.com/embed/yhfTY8JL1wIAE"
              width="480"
              height="318"
              frameBorder="0"
              allowFullScreen
              title="dragon"
            ></iframe>
          </div>
        </Grid>
        <Grid item xs={3}></Grid>
      </Grid>
    </>
  );
};

export default ServerDown;
