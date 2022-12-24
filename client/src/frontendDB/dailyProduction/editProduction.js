import { useState, useEffect } from "react";
import { FormGroup } from "@material-ui/core";
import { useNavigate, useParams } from "react-router-dom";
import { getUsers, editUser } from "./fetchProduction";
import swal from "sweetalert";

const initialValue = {
  trackNo: "",
  palletNo: "",
  productId: "",
  grade: "",
  netWeight: "",
  grossWeight: "",
  tareWeight: "",
  batch: "",
};

const EditUser = () => {
  const [user, setUser] = useState(initialValue);
  const [userN, setUserN] = useState(initialValue);

  const {
    trackNo,
    palletNo,
    productId,
    grade,
    netWeight,
    grossWeight,
    tareWeight,
    batch,
  } = user;
  const { id } = useParams();
  const [gradeData, setGradeData] = useState([]);
  const [productData, setProductData] = useState([]);

  let history = useNavigate();

  useEffect(() => {
    loadUserDetails();
  }, []);

  const loadUserDetails = async () => {
    const response = await getUsers(id);
    const res = await getUsers();
    setUser(response.data);
    setUserN(response.data);
    const gradeDataGet = res.data.grades;
    const productDataGet = res.data.products;
    setGradeData(gradeDataGet);
    setProductData(productDataGet);
  };

  const [nameError, setNameErr] = useState("");
  const [netError, setnetErr] = useState("");
  const [grossError, setgrossErr] = useState("");

  const validateName = (passedName, val) => {
    const regExprName = /^[0-9]+$/;
    const testName = regExprName.test(passedName);
    var errMsg = "";
    if (!testName) {
      errMsg += "Enter a Valid Name (Only Numeric Values Allowed)\n";
    }
    if (val === "b") {
      if (passedName.length < 6) {
        errMsg += "Minimum Batch Number length should be 6\n";
      }
    }

    if (val === "b") {
      setNameErr(errMsg);
    }
    if (val === "g") {
      setgrossErr(errMsg);
    }
    if (val === "n") {
      setnetErr(errMsg);
    }
    console.log(errMsg);
  };

  function editUserDetails(id, user) {
    var errMs = "";
    if (nameError != "") {
      errMs = errMs + "\n" + nameError;
    }
    if (
      document.getElementById("tare").value === "Gross Weight >= Net weight"
    ) {
      errMs += "\nGross Weight should be Greater than Net Weight";
    }
    if (user.productId === "") {
      errMs += "\nProduct Name Cannot be Empty";
    }
    if (user.grade === "") {
      errMs += "\nGrade Name Cannot be Empty";
    }
    if (user.netWeight === "") {
      errMs += "\nNet Weight Cannot be Empty";
    }
    if (user.grossWeight === "") {
      errMs += "\nGross Weight Cannot be Empty";
    }
    if (user.batch === "") {
      errMs += "\nBatch Number Cannot be Empty";
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
    history("/myproducts/dailyProM");
  };

  const calculateTare = () => {
    var a1 = document.getElementById("net").value;
    var a2 = document.getElementById("gross").value;
    var a3 = parseInt(a2) - parseInt(a1);
    a1 && a2 && a3 >= 0
      ? (document.getElementById("tare").value = a3)
      : (document.getElementById("tare").value = "Gross Weight >= Net weight");
  };

  const onValueChange = (e) => {
    try {
      if (e.target.name === "netWeight" || e.target.name === "grossWeight") {
        calculateTare();
      }
    } catch (error) {
      console.log(error);
    }
    if (e.target.name === "batch") {
      validateName(e.target.value, "b");
    }
    if (e.target.name === "batch") {
      if (e.target.value === "") {
        setNameErr("");
      }
    }
    if (e.target.name === "netWeight") {
      validateName(e.target.value, "n");
    }
    if (e.target.name === "netWeight") {
      if (e.target.value === "") {
        setnetErr("");
      }
    }
    if (e.target.name === "grossWeight") {
      validateName(e.target.value, "g");
    }
    if (e.target.name === "grossWeight") {
      if (e.target.value === "") {
        setgrossErr("");
      }
    }

    setUser({ ...user, [e.target.name]: e.target.value });
    console.log(user);
  };

  return (
    <>
      <button className="myBack2" onClick={backOrder}>
        Back{" "}
      </button>

      <FormGroup className="myAdd">
        <h1> Edit Production </h1>
        <input
          placeholder="Once You Edit Your Track Number Will be Updated"
          name="trackNo"
          readOnly
        ></input>

        <input
          placeholder=""
          name="palletNo"
          value={
            "Your Pallet Number is ' " +
            palletNo +
            " '  (NOT EDITABLE ONCE CREATED)"
          }
          readOnly
        ></input>

        <div class="wrap">
          <h4>Enter Product</h4>
          <small> ( Your Product Was ' {userN.productId} ' )</small>
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
        <div class="wrap">
          <h4>Enter Grade</h4>
          <small> ( Your Grade Was ' {userN.grade} ' )</small>

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

        <input
          placeholder="Enter Net Weight"
          onChange={(e) => onValueChange(e)}
          name="netWeight"
          value={netWeight}
          id="net"
        ></input>
        <div className="showErr">{netError.split("\n")[0]}</div>

        <input
          placeholder="Enter Gross Weight"
          onChange={(e) => onValueChange(e)}
          name="grossWeight"
          value={grossWeight}
          id="gross"
        ></input>
        <div className="showErr">{grossError.split("\n")[0]}</div>

        <input
          readOnly
          placeholder="Calculating ..."
          name="tareWeight"
          id="tare"
        ></input>

        <input
          placeholder="Enter Batch"
          onChange={(e) => onValueChange(e)}
          name="batch"
          value={batch}
        ></input>
        <div className="showErr">{nameError.split("\n")[0]}</div>
        <br />

        <button className="btn1" onClick={() => editUserDetails(id, user)}>
          Edit Production
        </button>
      </FormGroup>
    </>
  );
};

export default EditUser;
