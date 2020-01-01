import React from "react";
import { Link } from "react-router-dom";
import { USER, ADMIN, EMPTY } from "../actions/types";

const initialState = {
  role: null
};

const rolebtn = (state = "", action) => {
  const role = window.localStorage.getItem("role");
  console.log(role);

  switch (action.type) {
    case USER:
      return (
        <li className="btn btn-dark">
          <Link className="text-decoration-none" to="/user">
            User
          </Link>
        </li>
      );
    case ADMIN:
      return (
        <>
          <li className="btn btn-dark">
            <Link className="text-decoration-none" to="/admin">
              Admin
            </Link>
          </li>
          <li className="btn btn-dark">
            <Link className="text-decoration-none" to="/user">
              User
            </Link>
          </li>
        </>
      );
    default:
      return state;
  }
};

export default rolebtn;
