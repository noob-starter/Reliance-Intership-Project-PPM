import { useState, useEffect } from "react";
import { FormGroup } from "@material-ui/core";
import { useNavigate, useParams } from "react-router-dom";
import { getUsers, editUser } from "./fetchProduct";
import swal from "sweetalert";

const initialValue = {
  productId: "",
  materialId: "",
  productDesc: "",
  productRemarks: "",
  maxRolls: "",
};

const EditUser = () => {
  const [user, setUser] = useState(initialValue);
  const [userN, setUserN] = useState(initialValue);

  const { productId, materialId, productDesc, productRemarks, maxRolls } = user;
  const { id } = useParams();
  const [materialData, setMaterialData] = useState([]);

  let history = useNavigate();

  useEffect(() => {
    loadUserDetails();
  }, []);

  const loadUserDetails = async () => {
    const response = await getUsers(id);
    setUser(response.data);
    setUserN(response.data);
    const res = await getUsers();
    const matDataGet = res.data.materials;
    setMaterialData(matDataGet);
  };

  const [nameError, setNameErr] = useState("");
  const validateName = (passedName) => {
    const regExprName = /^[0-9]+$/;
    const testName = regExprName.test(passedName);
    var errMsg = "";
    if (!testName) {
      errMsg += "Enter a Valid Number (Only Numeric Values Allowed)\n";
    }
    setNameErr(errMsg);
  };

  function editUserDetails(id, user) {
    var errMs = "";
    if (nameError != "") {
      errMs = errMs + "\n" + nameError;
    }
    if (user.materialId === "") {
      errMs += "\nMaterial Type Cannot be Empty";
    }
    if (user.productDesc === "") {
      errMs += "\nProduct Description Cannot be Empty";
    }
    if (user.productRemarks === "") {
      errMs += "\nProduct Remarks Cannot be Empty";
    }
    if (user.maxRolls === "") {
      errMs += "\nMaximum Rolls Cannot be Empty";
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
    history("/myproducts/productM");
  };
  const onValueChange = (e) => {
    console.log(e.target.value);
    if (e.target.name === "maxRolls") {
      validateName(e.target.value);
    }
    if (e.target.name === "maxRolls") {
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
        <h1> Edit Product </h1>
        <input
          placeholder=""
          name="productId"
          value={"Your Product Id is ' " + productId + " ' (Non Editable)"}
          readOnly
        ></input>

        <div class="wrap">
          <h4>Enter Material</h4>
          <small> ( Your Material Was ' {userN.materialId} ' )</small>
          <br />
          <div class="boxN">
            <select
              class="classic"
              name="materialId"
              onChange={(e) => {
                onValueChange(e);
              }}
            >
              {materialData.length === 0 ? (
                <option> No Records Were Found !! </option>
              ) : (
                materialData.map((opt) => <option>{opt.materialType}</option>)
              )}
            </select>
          </div>
        </div>
        <input
          placeholder="Enter Product Description"
          onChange={(e) => onValueChange(e)}
          name="productDesc"
          value={productDesc}
        ></input>

        <input
          placeholder="Enter Product Remarks"
          onChange={(e) => onValueChange(e)}
          name="productRemarks"
          value={productRemarks}
        ></input>

        <input
          placeholder="Enter Max Rolls"
          onChange={(e) => onValueChange(e)}
          name="maxRolls"
          value={maxRolls}
        ></input>
        <div className="showErr">{nameError}</div>
        <br />

        <button className="btn1" onClick={() => editUserDetails(id, user)}>
          Edit Product
        </button>
      </FormGroup>
    </>
  );
};

export default EditUser;
