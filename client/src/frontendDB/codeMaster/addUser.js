import react, { useState, useEffect } from "react";
import { FormGroup } from "@material-ui/core";
import { addUser, getUsers } from "./fetchUser";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

const current = new Date();
const initialValue = {
  codeId: "",
  desc: "",
  typeId: "",
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
  const [data, setData] = useState([]);

  useEffect(() => {
    getAllUsers();
  }, []);

  const { codeId, desc } = user;

  let history = useNavigate();

  const getAllUsers = async () => {
    let response = await getUsers();
    var codeTypeData = response.data.codeTypeData;
    setData(codeTypeData);
  };

  const onValueChange = (e) => {
    console.log(e.target.value);
    var obj;
    if (e.target.name === "typeId") {
      obj = data.find((o, i) => {
        if (o.desc === e.target.value) {
          return o;
        }
      });
      obj = obj.typeId;
    } else {
      obj = e.target.value;
    }
    setUser({ ...user, [e.target.name]: obj });
  };

  const addUserDetails = async () => {
    const response = await addUser(user);
    if (response.data.message === "Code Exists") {
      swal({
        title: "Code Already Registered with the Same Code Id and Type Id !!",
        text: `Your Code id is ${response.data.user.codeId} \n\n Please use Different Combination`,
        icon: "info",
      });
    } else {
      swal({
        title: "Code Added Successfully !!",
        text: `Your Code id is ${response.data.codeId}  `,
        icon: "success",
      }).then(() => {
        backOrder();
      });
    }
  };

  const addModifyX = () => {
    var errMs = "";
    if (user.desc === "") {
      errMs += "\nCode Description Cannot be Empty";
    }
    if (user.typeId === "") {
      errMs += "\nCode Type  Cannot be Empty";
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
    history("/myservices/codeM");
  };
  console.log(user);
  return (
    <>
      <button className="myBtn2" onClick={backOrder}>
        Back{" "}
      </button>

      <FormGroup className="myAdd">
        <h1> Add Code </h1>
        <input placeholder="Code Id will be Auto Generated" readOnly></input>
        <input
          placeholder="Enter desc"
          onChange={(e) => onValueChange(e)}
          name="desc"
          value={desc}
        ></input>{" "}
        <br />
        <div class="box">
          <select
            class="classic"
            name="typeId"
            onChange={(e) => {
              onValueChange(e);
            }}
          >
            {data.length === 0 ? (
              <option> No Records Were Found !! </option>
            ) : (
              data.map((opt) => <option>{opt.desc}</option>)
            )}
          </select>
        </div>
        <br />
        <br />
        <button className="btn1" onClick={() => addModifyX()}>
          Add Code
        </button>
      </FormGroup>
    </>
  );
};

export default AddUser;
