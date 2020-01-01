import React from "react";
import { useSelector, useDispatch } from "react-redux";

const Home = () => {
  const authRedux = useSelector(state => state.auth);
  const { user } = authRedux;
  return (
    <div className="container" style={{ marginTop: 20 }}>
      {user ? (
        <h1 className="text-center">{`Welcome ${user}`}</h1>
      ) : (
        <h1 className="text-center">HOME</h1>
      )}
    </div>
  );
};

export default Home;
