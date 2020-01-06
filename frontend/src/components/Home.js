import React from "react";
import { useSelector } from "react-redux";

const Home = () => {
  const userInfo = useSelector(state => state.authReducer);
  const { user } = userInfo;
  return (
    <div className="container" style={{ marginTop: 100 }}>
      {user ? (
        <h1 className="text-center">{`Welcome ${user}`}</h1>
      ) : (
        <h1 className="text-center">HOME</h1>
      )}
    </div>
  );
};

export default Home;
