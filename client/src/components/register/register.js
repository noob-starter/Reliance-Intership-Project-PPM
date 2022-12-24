import React, { useState } from "react";
import "./register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import validator from "validator";
import swal from "sweetalert";
import openImg from '../login/open.png'
import closeImg from '../login/close.png'



const Register = () => {
  const history = useNavigate();
  const [passImg, setPassImg] = useState(0);
  const [repassImg, setRepassImg] = useState(0);


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

  const [nameError, setNameErr] = useState("");
  const validateName = (passedName) => {
    const regExprName = /^[a-zA-Z]+$/;
    const testName = regExprName.test(passedName);
    let errMsg = "";
    if (!testName) {
      errMsg = "Enter a Valid Name";
    }
    if (passedName.length < 3) {
      errMsg = "Minimum Name length should be 3";
    }
    setNameErr(errMsg);
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
    if (e.target.name === "name") {
      validateName(e.target.value);
    }
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
  };

  const register = () => {
    if (
      user.name === "" ||
      user.email === "" ||
      user.password === "" ||
      user.reEnterPassword === ""
    ) {
      swal(
        "Can't Login as name or email or password can't be Empty \n\n Please enter valid credentials"
      );
    } else {
      axios
        .post("http://localhost:9002/users/register", user)

        .then((res) => {
          if (res.data.message === "Already Registered") {
            swal(`User with id " ${user.email} "  already registered with us`);
          } else if (
            emailError != "" ||
            passwordError != "" ||
            nameError != "" ||
            repasswordError != ""
          ) {
            swal("Error in Name or Email or Password !!");
          } else {
            var action = {
              title: "Registration Success !",
              text: ` Thanks for Joining Us \n\nPlease Click Proceed button to login !`,
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
  };

  return (
    <>
      <img
        className="img"
        src="https://i.postimg.cc/sDG8zyXM/wave.png"
        alt="wave_image"
      />
      <div className="register">
        {console.log("User", user)}
        <h1>Register</h1>
        <input
          type="text"
          name="name"
          value={user.name}
          placeholder="Your Name"
          onChange={handleChange}
        ></input>
        <div className="nameerr">{nameError}</div>
        <input
          type="text"
          name="email"
          value={user.email}
          placeholder="Your Email"
          onChange={handleChange}
        ></input>
        <div className="emailerr">{emailError}</div>
        <input
          type={(passImg%2===0)?"password":"text"}
          name="password"
          value={user.password}
          placeholder="Your Password"
          onChange={handleChange}
        ></input><img className="passImg1" src={(passImg%2==0)? closeImg: openImg} onClick={()=>{setPassImg(passImg+1)}} />
        <div className="passerr">{passwordError}</div>
        <input
          type={(repassImg%2===0)?"password":"text"}
          name="reEnterPassword"
          value={user.reEnterPassword}
          placeholder="Re-enter Password"
          onChange={handleChange}
        ></input><img className="passImg2" src={(repassImg%2===0)? closeImg: openImg} onClick={()=>{setRepassImg(repassImg+1)}} />
        <div className="repasserr">{repasswordError}</div>
        <div className="button" onClick={register}>
          Register
        </div>
        <div className="or">OR</div>
        <div className="button" onClick={() => history("/login")}>
          Login
        </div>
      </div>
    </>
  );
};

export default Register;
