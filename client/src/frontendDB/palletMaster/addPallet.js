import react, { useState, useEffect } from "react";
import { FormGroup } from "@material-ui/core";
import { addUser, getUsers } from "./fetchPallet";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
const current = new Date();

const initialValue = {
  palletNo: "",
  productId: "",
  noOfRolls: "",
  grade: "",
  status: "",
  batch: "",
  created_dt: `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`,
  created_by: `${window.localStorage.getItem("userName")}`,
  start_dt: `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`,
  end_dt: "",
};

const AddUser = () => {
  const [user, setUser] = useState(initialValue);
  const { palletNo, productId, noOfRolls, grade, status, batch } = user;
  const [productData, setProductData] = useState([]);
  const [gradeData, setGradeData] = useState([]);

  let history = useNavigate();

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    const res = await getUsers();
    const matDataGet = res.data.products;
    setProductData(matDataGet);
    const gradeDataNew = res.data.grades;
    setGradeData(gradeDataNew);
  };
  const onValueChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    console.log(user);
  };

  const addUserDetails = async () => {
    const response = await addUser(user);
    if (response.data.message === "Already Found") {
      swal({
        title: "Such Pallet Exits Already !!",
        text: `Your Pallet id is ${response.data.user.palletNo} \n\n Please use an Alternate Pallet Number`,
        icon: "info",
      });
    } else {
      swal({
        title: "Pallet Added Successfully !!",
        text: `Your Pallet id is ${response.data.palletNo}  `,
        icon: "success",
      }).then(() => {
        backOrder();
      });
    }
  };

  const addModifyX = () => {
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
  };

  const backOrder = () => {
    history("/myproducts/palletM");
  };

  return (
    <>
      <button className="myBtn2" onClick={backOrder}>
        Back{" "}
      </button>

      <FormGroup className="myAdd">
        <h1> Add Pallet </h1>
        <input
          placeholder="Your Pallet Number/Id Will be Automatically Generated"
          name="palletNo"
          readOnly
        ></input>

        <div class="wrap">
          <h4>Enter Product</h4>
          <br />
          <div class="boxN">
            <select
              class="classic"
              name="productId"
              onChange={(e) => {
                onValueChange(e);
              }}
            >
              {productData.length === 0 ? (
                <option> No Records Were Found !! </option>
              ) : (
                productData.map((opt) => <option>{opt.productDesc}</option>)
              )}
            </select>
          </div>
        </div>
        <br />
        <input
          placeholder="Enter Number Of Rolls"
          onChange={(e) => onValueChange(e)}
          name="noOfRolls"
          value={noOfRolls}
        ></input>

        <div class="wrap">
          <h4>Enter Grade</h4>
          <br />
          <div class="boxN">
            <select
              class="classic"
              name="grade"
              onChange={(e) => {
                onValueChange(e);
              }}
            >
              {gradeData.length === 0 ? (
                <option> No Records Were Found !! </option>
              ) : (
                gradeData.map((opt) => <option>{opt.gradeName}</option>)
              )}
            </select>
          </div>
        </div>

        <div class="buttons">
          <h4>Assign Status</h4>
          <input
            label="Open"
            type="radio"
            name="status"
            value="o"
            onChange={(e) => onValueChange(e)}
          />
          <input
            label="Close"
            type="radio"
            name="status"
            value="c"
            onChange={(e) => onValueChange(e)}
          />
          <input
            label="Reject"
            type="radio"
            name="status"
            value="r"
            onChange={(e) => onValueChange(e)}
          />
        </div>

        <input
          placeholder="Enter Batch"
          onChange={(e) => onValueChange(e)}
          name="batch"
          value={batch}
        ></input>

        <button className="btn1" onClick={() => addModifyX()}>
          Add Pallet
        </button>
      </FormGroup>
    </>
  );
};

export default AddUser;
