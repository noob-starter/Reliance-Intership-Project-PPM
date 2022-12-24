import { useState, useEffect } from "react";
import { FormGroup } from "@material-ui/core";
import { useNavigate, useParams } from "react-router-dom";
import { getUsers, editUser } from "./fetchUser";
import swal from "sweetalert";

const current = new Date();
const initialValue = {
  typeId: "",
  desc: "",
  modify_dt: `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`,
  modify_by: `${window.localStorage.getItem("userName")}`,
};

const EditUser = () => {
  const [user, setUser] = useState(initialValue);
  const { typeId, desc } = user;
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
    if (user.desc === "") {
      errMs += "\nCode Type Description Cannot be Empty";
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
      }).then((willDelete) => {
        if (willDelete) {
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
    history("/myservices/codeTM");
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
        <h1> Edit User </h1>
        <input placeholder={user.typeId} name="typeId" readOnly></input>

        <input
          placeholder="Enter desc"
          onChange={(e) => onValueChange(e)}
          name="desc"
          value={desc}
        ></input>

        <button className="btn1" onClick={() => editUserDetails(id, user)}>
          Edit User
        </button>
      </FormGroup>
    </>
  );
};

export default EditUser;
