import react, { useState, useEffect } from "react";
import { FormGroup } from "@material-ui/core";
import { addUser, getUsers } from "./fetchUser";
import { useNavigate } from "react-router-dom";
import validator from "validator";
import swal from "sweetalert";

const current = new Date();
const initialValue = {
  userId: "",
  name: "",
  dept: "",
  email: "",
  phone: "",
  password: "",
  created_dt: `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`,
  modify_dt: `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`,
  created_by: `${window.localStorage.getItem("userName")}`,
  modify_by: `${window.localStorage.getItem("userName")}`,
};

const AddUser = () => {
  const [user, setUser] = useState(initialValue);
  const { userId, name, dept, email, phone, password } = user;
  const [deptData, setDeptData] = useState([]);

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    const res = await getUsers();
    const deptDataGet = res.data.department;
    setDeptData(deptDataGet);
  };
  let history = useNavigate();

  const onValueChange = (e) => {
    if (e.target.name === "name") {
      validateName(e.target.value);
    }
    if (e.target.name === "email") {
      validateEmail(e.target.value);
    }
    if (e.target.name === "password") {
      validatePassword(e.target.value);
    }
    if (e.target.name === "phone") {
      validatePhone(e.target.value);
    }
    if (e.target.name === "name") {
      if (e.target.value === "") {
        setNameErr("");
      }
    }
    if (e.target.name === "email") {
      if (e.target.value === "") {
        setEmailError("");
      }
    }
    if (e.target.name === "password") {
      if (e.target.value === "") {
        setPasswordErr("");
      }
    }
    if (e.target.name === "phone") {
      if (e.target.value === "") {
        setPhoneErr("");
      }
    }

    setUser({ ...user, [e.target.name]: e.target.value });
    console.log(user);
  };

  const addUserDetails = async () => {
    const response = await addUser(user);
    if (response.data.message === "User already registered") {
      swal({
        title: "User Already Registered with this Email !!",
        text: `Your user id is ${response.data.user.userId} \n\n Please use an Alternate Email Id`,
        icon: "info",
      });
    } else {
      swal({
        title: "User Added Successfully !!",
        text: `Your user id is ${response.data.userId}  `,
        icon: "success",
      }).then(() => {
        backOrder();
      });
    }
  };

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

  const [phoneErr, setPhoneErr] = useState("");
  const validatePhone = (phoneNo) => {
    const digitsRegExp = /(?=.*?[0-9])/;
    const digitsPhone = digitsRegExp.test(phoneNo);
    let errMsg = "";
    if (!digitsPhone) {
      errMsg = "Invalid Phone Number";
    } else if (phoneNo.length < 10) {
      errMsg = "Mobile Number Length should be greater than 10";
    } else {
      errMsg = "";
    }
    setPhoneErr(errMsg);
  };

  const addModifyX = () => {
    var errMs = "";
    if (nameError != "") {
      errMs = errMs + "\n" + nameError;
    }
    if (passwordError != "") {
      errMs = errMs + "\n" + passwordError;
    }
    if (phoneErr != "") {
      errMs = errMs + "\n" + phoneErr;
    }
    if (emailError != "") {
      errMs = errMs + "\n" + emailError;
    }
    if (user.email === "") {
      errMs += "\nEmail Cannot be Empty";
    }
    if (user.password === "") {
      errMs += "\nPassword Cannot be Empty";
    }
    if (user.name === "") {
      errMs += "\nUser Name Cannot be Empty";
    }
    if (user.phone === "") {
      errMs += "\nPhone Number Cannot be Empty";
    }
    if (user.dept === "") {
      errMs += "\nDepartment Name Cannot be Empty";
    }

    if (errMs !== "") {
      swal(errMs);
    } else {
      swal({
        title: "Are you sure to Add ?",
        text: "",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willAdd) => {
        if (willAdd) {
          addUserDetails();
        } else {
          swal("Error occurred while Adding !!");
        }
      });
    }
  };

  const backOrder = () => {
    history("/myservices/userM");
  };

  return (
    <>
      <button className="myBtn2" onClick={backOrder}>
        Back{" "}
      </button>

      <FormGroup className="myAdd">
        <h1> Add User </h1>

        <input
          placeholder="Your User Id will be Auto Generated"
          readOnly
        ></input>

        <input
          placeholder="Enter name"
          onChange={(e) => onValueChange(e)}
          name="name"
          value={name}
        ></input>
        <div className="showErr">{nameError}</div>
        <div class="wrap">
          <h4>Enter Department</h4>
          <br />
          <div class="boxN">
            <select
              class="classic"
              name="dept"
              onChange={(e) => {
                onValueChange(e);
              }}
            >
              {deptData.length === 0 ? (
                <option> No Records Were Found !! </option>
              ) : (
                deptData.map((opt) => <option>{opt.name}</option>)
              )}
            </select>
          </div>
        </div>

        <input
          placeholder="Enter email"
          onChange={(e) => onValueChange(e)}
          name="email"
          value={email}
        ></input>
        <div className="showErr">{emailError}</div>

        <input
          placeholder="Enter phone"
          onChange={(e) => onValueChange(e)}
          name="phone"
          value={phone}
        ></input>
        <div className="showErr">{phoneErr}</div>

        <input
          type="password"
          placeholder="Enter Password"
          onChange={(e) => onValueChange(e)}
          name="password"
          value={password}
        ></input>
        <div className="showErr">{passwordError}</div>

        <button className="btn1" onClick={() => addModifyX()}>
          Add User
        </button>
      </FormGroup>
    </>
  );
};

export default AddUser;
