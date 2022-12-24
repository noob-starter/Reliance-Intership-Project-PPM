import react, { useState } from "react";
import { FormGroup } from "@material-ui/core";
import { addUser } from "./fetchMaterial";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
const current = new Date();

const initialValue = {
  materialId: "",
  materialType: "",
  materialDesc: "",
  materialRemarks: "",
  created_dt: `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`,
  created_by: `${window.localStorage.getItem("userName")}`,
};

const AddUser = () => {
  const [user, setUser] = useState(initialValue);
  const { materialId, materialType, materialDesc, materialRemarks } = user;

  let history = useNavigate();

  const onValueChange = (e) => {
    console.log(e.target.value);
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const addUserDetails = async () => {
    const response = await addUser(user);
    if (response.data.message === "Already Exists") {
      swal({
        title: "Material Already Registered with this Name !!",
        text: `Your Material id is ${response.data.user.materialId} \n\n Please use Different Material`,
        icon: "info",
      });
    } else {
      swal({
        title: "Material Added Successfully !!",
        text: `Your Material id is ${response.data.materialId}  `,
        icon: "success",
      }).then(() => {
        backOrder();
      });
    }
  };

  const addModifyX = () => {
    var errMs = "";
    if (user.materialType === "") {
      errMs += "\nMaterial Type Cannot be Empty";
    }
    if (user.materialDesc === "") {
      errMs += "\nMaterial Description Cannot be Empty";
    }
    if (user.materialRemarks === "") {
      errMs += "\nMaterial Remarks Cannot be Empty";
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
    history("/myproducts/materialM");
  };

  return (
    <>
      <button className="myBtn2" onClick={backOrder}>
        Back{" "}
      </button>

      <FormGroup className="myAdd">
        <h1> Add Material </h1>
        <input
          placeholder="Your Material Id Will Automatically Generated"
          name="materialId"
          readOnly
        ></input>

        <input
          placeholder="Enter Material Type"
          onChange={(e) => onValueChange(e)}
          name="materialType"
          value={materialType}
        ></input>

        <input
          placeholder="Enter Material Description"
          onChange={(e) => onValueChange(e)}
          name="materialDesc"
          value={materialDesc}
        ></input>

        <input
          placeholder="Enter Material Remarks"
          onChange={(e) => onValueChange(e)}
          name="materialRemarks"
          value={materialRemarks}
        ></input>

        <button className="btn1" onClick={() => addModifyX()}>
          Add Material
        </button>
      </FormGroup>
    </>
  );
};

export default AddUser;
