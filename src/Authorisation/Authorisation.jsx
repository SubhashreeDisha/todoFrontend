import React from "react";
import { useSelector } from "react-redux";

const Authorisation = ({ children }) => {
  const data = useSelector((state) => {
    return state.UserReducer;
  });
  if (data.user)
    return (
      <h1 style={{ marginTop: "65px", textAlign: "center" }}>
        You are logined
      </h1>
    );
  else return <>{children}</>;
};

export default Authorisation;
