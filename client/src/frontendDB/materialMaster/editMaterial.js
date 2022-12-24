import { useState, useEffect } from "react";
import { FormGroup } from "@material-ui/core";
import { useNavigate, useParams } from "react-router-dom";
import { getUsers, editUser } from "./fetchMaterial";
import swal from "sweetalert";

const initialValue = {
  materialId: "",
  materialType: "",
  materialDesc: "",
  materialRemarks: "",
};

const EditUser = () => {
  const [user, setUser] = useState(initialValue);
  const { materialId, materialType, materialDesc, materialRemarks } = user;
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
        title: "Are you sure to Edit ?",
        text: "",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willEdit) => {
        if (willEdit) {
          editUser(id, user).then(() => {
            swal(" Edited Successfully !!", {
              icon: "success",
            }).then(() => {
              backOrder();
            });
          });
        } else {
          swal("Error occurred while Editing !!");
        }
      });
    }
  }

  const backOrder = () => {
    history("/myproducts/materialM");
  };

  const onValueChange = (e) => {
    console.log(e.target.value);
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <>
      <button className="myBack2" onClick={backOrder}>
        Back{" "}
      </button>

      <FormGroup className="myAdd">
        <h1> Edit Material </h1>
        <input
          placeholder=""
          name="materialId"
          value={"Your Material Id is ' " + materialId + " '"}
          readOnly
        ></input>

        <input
          placeholder=""
          name="materialType"
          value={"Your Material Type is ' " + materialType + " '"}
          readOnly
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
        <br />

        <button className="btn1" onClick={() => editUserDetails(id, user)}>
          Edit Material
        </button>
      </FormGroup>
    </>
  );
};

export default EditUser;
