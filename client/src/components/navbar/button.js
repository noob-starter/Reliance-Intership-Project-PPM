import React from "react";
import "./button.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const STYLES = ["btn--primary", "btn--outline", "btn--test"];

const SIZES = ["btn--medium", "btn--large"];
export const Button = ({ type, buttonStyle, buttonSize }) => {
  const checkButtonStyle = STYLES.includes(buttonStyle)
    ? buttonStyle
    : STYLES[0];
  const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];
  const history = useNavigate();
  const checkStatusOfLoggedInOut = window.localStorage.getItem("userName");
  const handleLogInOut = () => {
    window.localStorage.setItem("userName", "");
    history("/");
    document.location.reload(true);
  };

  console.log(checkStatusOfLoggedInOut);
  return checkStatusOfLoggedInOut !== "" ? (
    <>
      <Link to="/" className="btn-mobile">
        <button
          className={`btn ${checkButtonStyle} ${checkButtonSize}`}
          onClick={() => {
            handleLogInOut();
          }}
          type={type}
        >
          Logout
        </button>
      </Link>
      <h5>&nbsp;&nbsp;Login user {checkStatusOfLoggedInOut}</h5>
    </>
  ) : (
    <Link to="/login" className="btn-mobile">
      <button
        className={`btn ${checkButtonStyle} ${checkButtonSize}`}
        type={type}
      >
        Login / Register
      </button>
    </Link>
  );
};
