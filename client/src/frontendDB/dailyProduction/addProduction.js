import react, { useState, useEffect } from "react";
import { FormGroup } from "@material-ui/core";
import { addUser, getUsers } from "./fetchProduction";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
const current = new Date();
const pak = `${window.localStorage.getItem("userName")}`;
const initialValue = {
  productionId: "",
  production_dt: `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`,
  trackNo: "",
  palletNo: "",
  productId: "",
  grade: "",
  netWeight: "",
  grossWeight: "",
  tareWeight: "",
  packed_dt: `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}     ${current.getHours()} : ${current.getMinutes()} : ${current.getSeconds()} : ${current.getMilliseconds()}`,
  batch: "",
  packedBy: pak,
  created_dt: `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`,
  created_by: pak,
};

const AddUser = () => {
  const [user, setUser] = useState(initialValue);
  const {
    productionId,
    trackNo,
    palletNo,
    productId,
    packedBy,
    grade,
    netWeight,
    grossWeight,
    tareWeight,
    batch,
  } = user;
  const [gradeData, setGradeData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [palletData, setPalletData] = useState([]);

  let history = useNavigate();

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    const res = await getUsers();
    const gradeDataGet = res.data.grades;
    const productDataGet = res.data.products;
    const palletDataGet = res.data.pallets;
    setGradeData(gradeDataGet);
    setProductData(productDataGet);
    setPalletData(palletDataGet);
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

  const addUserDetails = async () => {
    const response = await addUser(user);
    if (response.data.message === "User Exists") {
      swal({
        title: " Production Already Registered with this Id !!",
        text: `Your Production id is ${response.data.user.productionId} \n\n Please use Different Production Name`,
        icon: "info",
      });
    } else {
      swal({
        title: "Production Added Successfully !!",
        text: `Thank You `,
        icon: "success",
      }).then(() => {
        backOrder();
      });
    }
  };

  const addModifyX = async () => {
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

  return (
    <>
      <button className="myBtn2" onClick={backOrder}>
        Back{" "}
      </button>

      <FormGroup className="myAdd myAddX">
        <h1> Add Daily Production </h1>
        <input
          placeholder="Your Latest Track Number Will be Auto Generated"
          name="trackNo"
          readOnly
        ></input>

        <br />
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

        <input
          placeholder=""
          name="packedBy"
          value={"Packed By  ' " + packedBy + " '"}
          readOnly
        ></input>

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

        <button className="btn1" onClick={() => addModifyX()}>
          Add Production
        </button>
      </FormGroup>
    </>
  );
};

export default AddUser;
