import React from "react";
import "./errorpage.css";
import logo from "./errorimg.png";

import { NavLink } from "react-router-dom";

function Errorpage() {
  return (
    <div className="errorpage">
      <div className="lost">It Seems You Lost...</div>
      <img src={logo} alt="loading..." />
      <NavLink to="/" className="h1">
        Go back to Login Page
      </NavLink>
    </div>
  );
}
export default Errorpage;
