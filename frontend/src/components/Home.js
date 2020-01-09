import React from "react";
import { Typography } from "@material-ui/core";
import { useSelector } from "react-redux";

const Home = () => {
  const userInfo = useSelector(state => state.authReducer);
  const { user } = userInfo;
  return (
    <div className="container formContainer">
      {user ? (
        <Typography
          className="textCenter"
          variant="h2"
          color="secondary"
        >{`Welcome ${user}`}</Typography>
      ) : (
        <Typography color="primary" variant="h2">
          HOME
        </Typography>
      )}
    </div>
  );
};

export default Home;
