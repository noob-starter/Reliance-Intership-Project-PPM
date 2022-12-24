import react, { useState } from "react";
import { FormGroup } from "@material-ui/core";
import { addUser } from "./fetchUser";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

const current = new Date();
const initialValue = {
  typeId: "",
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
  const { typeId, desc } = user;

  let history = useNavigate();

  const onValueChange = (e) => {
    console.log(e.target.value);
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const addUserDetails = async () => {
    const response = await addUser(user);
    if (response.data.message === "Type Exists") {
      swal({
        title: "Type Already Registered with this Id !!",
        text: `Your Type id is ${response.data.user.typeId} \n\n Please use Different Type Description`,
        icon: "info",
      });
    } else {
      swal({
        title: "Type Added Successfully !!",
        text: `Your Type id is ${response.data.typeId}  `,
        icon: "success",
      }).then(() => {
        backOrder();
      });
    }
  };

  const addModifyX = () => {
    var errMs = "";
    if (user.desc === "") {
      errMs += "\nCode Type Description Cannot be Empty";
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
    history("/myservices/codeTM");
  };

  return (
    <>
      <button className="myBtn2" onClick={backOrder}>
        Back{" "}
      </button>

      <FormGroup className="myAdd">
        <h1> Add Code Type </h1>
        <input placeholder="Type Id will be Auto Generated" readOnly></input>

        <input
          placeholder="Enter desc"
          onChange={(e) => onValueChange(e)}
          name="desc"
          value={desc}
        ></input>

        <button className="btn1" onClick={() => addModifyX()}>
          Add Code Type
        </button>
      </FormGroup>
    </>
  );
};

export default AddUser;
