import React, { useState } from "react";
import "./login.css";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import validator from "validator";
import swal from "sweetalert";
import openImg from './open.png'
import closeImg from './close.png'




const Login = ({ setLoginUser }) => {
  const history = useNavigate();
  const [passImg, setPassImg] = useState(0);


  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  var errMsg = "";

  const [emailError, setEmailError] = useState("");
  const validateEmail = (email) => {
    // let errMsg=""
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
    // let errMsg ="";
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (e.target.name === "email") {
      validateEmail(e.target.value);
    }
    if (e.target.name === "password") {
      validatePassword(e.target.value);
    }

    setUser({
      ...user,
      [name]: value,
    });
    console.log(user);
  };

  const login = async () => {
    console.log(errMsg);
    if (user.email === "" || user.password === "") {
      swal(
        "Can't Login as Email or Password can't be Empty \n\n Please enter valid credentials"
      );
    } else if (emailError !== "" || passwordError !== "") {
      swal("Error in Email or Password !!");
    } else {
      await axios
        .post("http://localhost:9002/users/login", user)
        .then((res) => {
          if (res.data.message === "User not registered") {
            swal("User Not Registered");
          } else if (res.data.message === "Password didn't match") {
            swal("Password Did not Match");
          } else {
            var action = {
              title: "Login Success !",
              text: ` Welcome user '  ${res.data.user.name} ' \n\nPlease Click Proceed button to proceed !`,
              icon: "success",
              buttons: {
                catch: {
                  text: "Proceed",
                  value: "catch",
                },
              },
            };

            swal(action).then((value) => {
              if (value === "catch") {
                setLoginUser(res.data.user);
                window.localStorage.setItem("userName", res.data.user.name);
                history("/");
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
        className="image"
        src="https://svgshare.com/i/JcM.svg"
        alt="demo_image"
      />

      <div className="login">
        <h1>Login</h1>
        <input
          type="text"
          name="email"
          value={user.email}
          onChange={handleChange}
          placeholder="Enter your Email"
        ></input>
        <div className="emailerr">{emailError}</div>
        <input
          type= {(passImg%2===0)?"password":"text"}
          name="password"
          value={user.password}
          onChange={handleChange}
          placeholder="Enter your Password"
        ></input><img className="passImg" src={(passImg%2===0)? closeImg: openImg} onClick={()=>{setPassImg(passImg+1)}} />
        <div className="passerr">{passwordError}</div>
        <div className="button" onClick={login}>
          Login
        </div>
        <div
          className="forget collink"
          onClick={() => {
            history("/resetpass");
          }}
        >
          Forgot Password ? / Reset Password
        </div>
        <div className="or">OR</div>
        <div className="button" onClick={() => history("/register")}>
          Register
        </div>
      </div>
    </>
  );
};

export default Login;
