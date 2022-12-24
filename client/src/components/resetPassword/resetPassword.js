import React, { useState } from "react";
import "./resetpassword.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import validator from "validator";
import swal from "sweetalert";
import imgback from "./backG.jpg";
import bcrypt from "bcryptjs";

const ResetPass = () => {
  const history = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    reEnterPassword: "",
  });

  const [emailError, setEmailError] = useState("");
  const validateEmail = (email) => {
    let errMsg = "";
    if (validator.isEmail(email)) {
      errMsg = "";
    } else {
      errMsg = "Enter valid Email !!";
    }
    setEmailError(errMsg);
  };

  const [passwordError, setPasswordErr] = useState("");
  const validatePassword = (passwordInputValue) => {
    const uppercaseRegExp = /(?=.*?[A-Z])/;
    const lowercaseRegExp = /(?=.*?[a-z])/;
    const digitsRegExp = /(?=.*?[0-9])/;
    const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
    const minLengthRegExp = /.{8,}/;
    const passwordLength = passwordInputValue.length;
    const uppercasePassword = uppercaseRegExp.test(passwordInputValue);
    const lowercasePassword = lowercaseRegExp.test(passwordInputValue);
    const digitsPassword = digitsRegExp.test(passwordInputValue);
    const specialCharPassword = specialCharRegExp.test(passwordInputValue);
    const minLengthPassword = minLengthRegExp.test(passwordInputValue);
    let errMsg = "";
    if (passwordLength === 0) {
      errMsg = "Password is empty";
    } else if (!uppercasePassword) {
      errMsg = "At least one Uppercase";
    } else if (!lowercasePassword) {
      errMsg = "At least one Lowercase";
    } else if (!digitsPassword) {
      errMsg = "At least one digit";
    } else if (!specialCharPassword) {
      errMsg = "At least one Special Characters";
    } else if (!minLengthPassword) {
      errMsg = "At least minimum 8 characters";
    } else {
      errMsg = "";
    }
    setPasswordErr(errMsg);
  };

  const [repasswordError, setrePasswordErr] = useState("");
  const validateRePassword = (reEnterPassword) => {
    let errMsg = "";
    if (reEnterPassword === user.password) {
      errMsg = "";
    } else {
      errMsg = "Enter correct password as above";
    }
    setrePasswordErr(errMsg);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (e.target.name === "email") {
      validateEmail(e.target.value);
    }
    if (e.target.name === "password") {
      validatePassword(e.target.value);
    }
    if (e.target.name === "reEnterPassword") {
      validateRePassword(e.target.value);
    }
    setUser({
      ...user,
      [name]: value,
    });
    console.log(user);
  };

  const changePass = async () => {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hashed) => {
        user.password = hashed;
      });
    });
  };
  const reset = () => {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hashed) => {
        user.password = hashed;
        if (
          user.email === "" ||
          user.password === "" ||
          user.reEnterPassword === ""
        ) {
          swal(
            "Can't Login as email or password can't be Empty \n\n Please enter valid credentials"
          );
        } else if (emailError !== "" || passwordError != "") {
          swal("Error at email or password");
        } else {
          axios
            .post("http://localhost:9002/users/resetpassword", user)

            .then((res) => {
              if (res.data.message === "User not Registered") {
                swal(
                  `User with email " ${user.email} "  is not registered with us`
                );
              } else if (
                emailError !== "" ||
                passwordError !== "" ||
                repasswordError !== ""
              ) {
                swal("Error in Email or Password !!");
              } else {
                var action = {
                  title: "Resetting Password Success !",
                  text: ` Thanks for Visiting Here \n\nPlease Click Proceed button to login !`,
                  icon: "success",
                  buttons: {
                    catch: {
                      text: "Proceed Here",
                      value: "catch",
                    },
                  },
                };
                swal(action).then((value) => {
                  if (value === "catch") {
                    history("/login");
                  }
                });
              }
            })
            .catch((res) => {
              console.log(res);
            });
        }
      });
    });
  };

  return (
    <>
      <img className="img" src={imgback} alt="wave_image" />
      <div className="reset">
        <h1>Reset Password</h1>
        <input
          type="text"
          name="email"
          value={user.email}
          placeholder="Your Email"
          onChange={handleChange}
          required
        ></input>
        <div className="emailerr">{emailError}</div>
        <input
          type="password"
          name="password"
          value={user.password}
          placeholder="Your Password"
          onChange={handleChange}
        ></input>
        <div className="passerr">{passwordError}</div>
        <input
          type="password"
          name="reEnterPassword"
          value={user.reEnterPassword}
          placeholder="Re-enter Password"
          onChange={handleChange}
        ></input>
        <div className="repasserr">{repasswordError}</div>
        <div className="button" onClick={reset}>
          {" "}
          Reset{" "}
        </div>
      </div>
    </>
  );
};

export default ResetPass;
