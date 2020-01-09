import React from "react";

const SpecificUserInfoPage = match => {
  console.log(match);
  const testing = () => {
    console.log("function works");
  };
  return (
    <>
      <h2 className="formContainer">hello from specific user page</h2>;
      <button onClick={testing}>TEST</button>
    </>
  );
};

export default SpecificUserInfoPage;
