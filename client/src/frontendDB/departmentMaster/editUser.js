import { useState, useEffect } from "react";
import { FormGroup } from "@material-ui/core";
import { useNavigate, useParams } from "react-router-dom";
import { getUsers, editUser } from "./fetchUser";
import swal from "sweetalert";

const current = new Date();
const initialValue = {
  deptId: "",
  name: "",
  desc: "",
  modify_dt: `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`,
  modify_by: `${window.localStorage.getItem("userName")}`,
};

const EditUser = () => {
  const [user, setUser] = useState(initialValue);
  const { deptId, name, desc } = user;
  const { id } = useParams();

  let history = useNavigate();

  useEffect(() => {
    loadUserDetails();
  }, []);

  const loadUserDetails = async () => {
    const response = await getUsers(id);
    setUser(response.data);
  };

  function editUserDetails(id, user) {
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
        title: "Are you sure to Edit ?",
        text: "",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          editUser(id, user).then(() => {
            swal(" Edited Successfully !!", {
              icon: "success",
            }).then(() => {
              backOrder();
            });
          });
        } else {
          swal("Error occurred while Deleting !!");
        }
      });
    }
  }

  const backOrder = () => {
    history("/myservices/deptM");
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

  const onValueChange = (e) => {
    console.log(user);
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

  return (
    <>
      <button className="myBack2" onClick={backOrder}>
        Back{" "}
      </button>

      <FormGroup className="myAdd">
        <h1> Edit Department </h1>
        <input placeholder={user.deptId} name="deptId" readOnly></input>

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

        <button className="btn1" onClick={() => editUserDetails(id, user)}>
          Edit Dept
        </button>
      </FormGroup>
    </>
  );
};

export default EditUser;
