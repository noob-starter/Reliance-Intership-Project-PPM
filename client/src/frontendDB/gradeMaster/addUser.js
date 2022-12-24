import react, { useState } from "react";
import { FormGroup } from "@material-ui/core";
import { addUser } from "./fetchUser";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

const current = new Date();
const initialValue = {
  gradeId: "",
  gradeName: "",
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
  const { gradeId, gradeName, desc } = user;

  let history = useNavigate();

  const onValueChange = (e) => {
    console.log(e.target.value);
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const addUserDetails = async () => {
    const response = await addUser(user);
    if (response.data.message === "Grade Already Exists") {
      swal({
        title: "Grade Already Registered with this Name !!",
        text: `Your Grade id is ${response.data.user.gradeId} \n\n Please use Different Grade Name`,
        icon: "info",
      });
    } else {
      swal({
        title: "Grade Added Successfully !!",
        text: `Your Grade id is ${response.data.gradeId}  `,
        icon: "success",
      }).then(() => {
        backOrder();
      });
    }
  };

  const addModifyX = () => {
    var errMs = "";
    if (user.gradeName === "") {
      errMs += "\nGrade Name Cannot be Empty";
    }
    if (user.desc === "") {
      errMs += "\nGrade Description Cannot be Empty";
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
    history("/myservices/gradeM");
  };

  return (
    <>
      <button className="myBtn2" onClick={backOrder}>
        Back{" "}
      </button>

      <FormGroup className="myAdd">
        <h1> Add Grade </h1>
        <input placeholder="Grade Id will be Auto Generated" readOnly></input>

        <input
          placeholder="Enter Grade Name"
          onChange={(e) => onValueChange(e)}
          name="gradeName"
          value={gradeName}
        ></input>

        <input
          placeholder="Enter description"
          onChange={(e) => onValueChange(e)}
          name="desc"
          value={desc}
        ></input>

        <button className="btn1" onClick={() => addModifyX()}>
          Add Grade{" "}
        </button>
      </FormGroup>
    </>
  );
};

export default AddUser;
