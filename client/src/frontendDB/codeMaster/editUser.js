import { useState, useEffect } from "react";
import { FormGroup } from "@material-ui/core";
import { useNavigate, useParams } from "react-router-dom";
import { getUsers, editUser } from "./fetchUser";
import swal from "sweetalert";

const current = new Date();
const initialValue = {
  codeId: "",
  desc: "",
  typeId: "",
  modify_dt: `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`,
  modify_by: `${window.localStorage.getItem("userName")}`,
};

const EditUser = () => {
  const [user, setUser] = useState(initialValue);
  const [nUser, setNUser] = useState(initialValue);

  const [data, setData] = useState([]);
  const { codeId, desc, typeId } = user;
  const { id } = useParams();

  let history = useNavigate();
  useEffect(() => {
    loadUserDetails();
  }, []);

  const loadUserDetails = async () => {
    const response = await getUsers(id);
    setUser(response.data);
    setNUser(response.data);
    const res = await getUsers();
    var codeTypeData = res.data.codeTypeData;
    setData(codeTypeData);
  };

  function editUserDetails(id, user) {
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
          swal("Error occurred while Deleting !!");
        }
      });
    }
  }

  const backOrder = () => {
    history("/myservices/codeM");
  };

  const onValueChange = (e) => {
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
    console.log(user);
  };

  return (
    <>
      <button className="myBack2" onClick={backOrder}>
        Back{" "}
      </button>

      <FormGroup className="myAdd">
        <h1> Edit Code </h1>
        <input placeholder={nUser.codeId} name="codeId" readOnly></input>

        <input
          placeholder="Enter desc"
          onChange={(e) => onValueChange(e)}
          name="desc"
          value={desc}
        ></input>
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
        {user ? (
          <h4 className="h1E">
            {" "}
            Type was{" "}
            <b>
              <i>{nUser.typeId}</i>
            </b>{" "}
          </h4>
        ) : (
          <span className="showErr">No Type id was Assigned</span>
        )}
        <br />
        <br />

        <button className="btn1" onClick={() => editUserDetails(id, user)}>
          Edit Code
        </button>
      </FormGroup>
    </>
  );
};

export default EditUser;
