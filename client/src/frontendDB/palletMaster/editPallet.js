import { useState, useEffect } from "react";
import { FormGroup } from "@material-ui/core";
import { useNavigate, useParams } from "react-router-dom";
import { getUsers, editUser } from "./fetchPallet";
import swal from "sweetalert";

const initialValue = {
  palletNo: "",
  productId: "",
  noOfRolls: "",
  grade: "",
  status: "",
  batch: "",
};

const EditUser = () => {
  const [user, setUser] = useState(initialValue);
  const [userN, setUserN] = useState(initialValue);

  const { palletNo, productId, noOfRolls, grade, status, batch } = user;
  const { id } = useParams();
  const [productData, setProductData] = useState([]);
  const [gradeData, setGradeData] = useState([]);

  let history = useNavigate();

  useEffect(() => {
    loadUserDetails();
  }, []);

  const loadUserDetails = async () => {
    const response = await getUsers(id);
    setUser(response.data);
    setUserN(response.data);
    const res = await getUsers();
    const matDataGet = res.data.products;
    setProductData(matDataGet);
    const gradeDataNew = res.data.grades;
    setGradeData(gradeDataNew);
  };

  function editUserDetails(id, user) {
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

  const onValueChange = (e) => {
    console.log(e.target.value);
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const backOrder = () => {
    history("/myproducts/palletM");
  };
  return (
    <>
      <button className="myBack2" onClick={backOrder}>
        Back{" "}
      </button>
      <FormGroup className="myAdd">
        <h1> Edit Pallet </h1>
        <input
          placeholder=""
          name="palletNo"
          value={"Your Pallet Number is ' " + palletNo + " ' (Non Editable)"}
          readOnly
        ></input>

        <div class="wrap">
          <h4>Enter Product</h4>
          <small> ( Your Product Was ' {userN.productId} ' )</small>
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
          <small> ( Your Grade Was ' {userN.grade} ' )</small>
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
          <small>
            {" "}
            ( Your Status Was '{" "}
            {userN.status === "o"
              ? "Open"
              : userN.status === "c"
              ? "Close"
              : "Reject"}{" "}
            ' )
          </small>
          <br />
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
        <br />

        <button className="btn1" onClick={() => editUserDetails(id, user)}>
          Edit Pallet
        </button>
      </FormGroup>
    </>
  );
};

export default EditUser;
