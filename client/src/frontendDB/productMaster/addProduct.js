import react, { useState, useEffect } from "react";
import { FormGroup } from "@material-ui/core";
import { addUser, getUsers } from "./fetchProduct";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
const current = new Date();

const initialValue = {
  productId: "",
  materialId: "",
  productDesc: "",
  productRemarks: "",
  maxRolls: "",
  created_dt: `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`,
  created_by: `${window.localStorage.getItem("userName")}`,
};

const AddUser = () => {
  const [user, setUser] = useState(initialValue);
  const { productId, materialId, productDesc, productRemarks, maxRolls } = user;
  const [materialData, setMaterialData] = useState([]);

  let history = useNavigate();

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    const res = await getUsers();
    const matDataGet = res.data.materials;
    setMaterialData(matDataGet);
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

  const addUserDetails = async () => {
    const response = await addUser(user);
    if (response.data.message === "Already Exists") {
      swal({
        title: "Product Already Registered with this Name !!",
        text: `Your Product id is ${response.data.user.productId} \n\n Please use Different Product`,
        icon: "info",
      });
    } else {
      swal({
        title: "Product Added Successfully !!",
        text: `Your Product id is ${response.data.productId}  `,
        icon: "success",
      }).then(() => {
        backOrder();
      });
    }
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
  const addModifyX = () => {
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
        title: "Are you sure to Add ?",
        text: "",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willAdd) => {
        if (willAdd) {
          if (user.materialId === "") {
            swal("Material Can Not be Empty");
          } else if (user.productDesc === "") {
            swal("Description Can Not be Empty");
          } else {
            addUserDetails();
          }
        } else {
          swal("Error occurred while Adding !!");
        }
      });
    }
  };

  const backOrder = () => {
    history("/myproducts/productM");
  };

  return (
    <>
      <button className="myBtn2" onClick={backOrder}>
        Back{" "}
      </button>
      <FormGroup className="myAdd">
        <h1> Add Product </h1>
        <input
          placeholder="Your Product Id will be Auto Generated"
          name="productId"
          readOnly
        ></input>

        <div class="wrap">
          <h4>Enter Material</h4>
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
          placeholder="Enter  Product Description"
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
          placeholder="Enter Maximum Rolls"
          onChange={(e) => onValueChange(e)}
          name="maxRolls"
          value={maxRolls}
        ></input>
        <div className="showErr">{nameError}</div>

        <button className="btn1" onClick={() => addModifyX()}>
          Add Product
        </button>
      </FormGroup>
    </>
  );
};

export default AddUser;
