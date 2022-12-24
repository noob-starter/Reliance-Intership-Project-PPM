import react, { useState } from "react";
import { FormGroup } from "@material-ui/core";
import { addUser } from "./fetchUser";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
const current = new Date();

const initialValue = {
  deptId: "",
  name: "",
  desc: "",
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
  const { deptId, name, desc } = user;

  let history = useNavigate();

  const onValueChange = (e) => {
    console.log(e.target.value);
    if (e.target.name === "name") {
      validateName(e.target.value);
    }
    if (e.target.name === "name") {
      if (e.target.value === "") {
        setNameErr("");
      }
    }

    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const [nameError, setNameErr] = useState("");
  const validateName = (passedName) => {
    const regExprName = /^[a-zA-Z]+$/;
    const testName = regExprName.test(passedName);
    let errMsg = "";
    if (!testName) {
      errMsg = "Enter a Valid Department Name";
    }
    if (passedName.length < 2) {
      errMsg = "Minimum Department Name length should be 2";
    }
    setNameErr(errMsg);
  };

  const addUserDetails = async () => {
    const response = await addUser(user);
    if (response.data.message === "Department Already Exists") {
      swal({
        title: "Department Already Registered with this Name !!",
        text: `Your Department id is ${response.data.user.deptId} \n\n Please use Different Department Name`,
        icon: "info",
      });
    } else {
      swal({
        title: "Department Added Successfully !!",
        text: `Your Department id is ${response.data.deptId}  `,
        icon: "success",
      }).then(() => {
        backOrder();
      });
    }
  };

  const addModifyX = () => {
    var errMs = "";
    if (nameError != "") {
      errMs = errMs + "\n" + nameError;
    }
    if (user.name === "") {
      errMs += "\nDepartment Name Cannot be Empty";
    }
    if (user.desc === "") {
      errMs += "\nDepartment Description Cannot be Empty";
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
    history("/myservices/deptM");
  };

  return (
    <>
      <button className="myBtn2" onClick={backOrder}>
        Back{" "}
      </button>

      <FormGroup className="myAdd">
        <h1> Add Dept </h1>
        <input
          placeholder="Department Id will be Auto Generated"
          readOnly
        ></input>

        <input
          placeholder="Enter name"
          onChange={(e) => onValueChange(e)}
          name="name"
          value={name}
        ></input>
        <div className="showErr">{nameError}</div>

        <input
          placeholder="Enter desc"
          onChange={(e) => onValueChange(e)}
          name="desc"
          value={desc}
        ></input>

        <button className="btn1" onClick={() => addModifyX()}>
          Add Dept{" "}
        </button>
      </FormGroup>
    </>
  );
};

export default AddUser;
