import React from "react";
import Navbar from "../../components/navbar/navigationbar";

import { useState, useEffect } from "react";
import { getUsers, deleteUser } from "./fetchMaterial";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";

import "../AllCode.css";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Pagination from "../Pagination/pagination";
import logoImage from "../image.jpg";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [perPage, setPerPage] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getAllUsers();
  }, []);

  const deleteUserData = async (id) => {
    await deleteUser(id);
    getAllUsers();
  };

  const getAllUsers = async () => {
    let response = await getUsers();
    setUsers(response.data);
    setPerPage(response.data.slice(0, 5));
  };

  function deleteModifyX(user) {
    swal({
      title: "Are you sure to delete ?",
      text: "Once deleted, you will not be able to recover !!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteUserData(user._id);
        swal(" Deleted Successfully !!", {
          icon: "success",
        });
      } else {
        swal("Error occurred while Deleting !!");
      }
    });
  }

  const history = useNavigate();
  const backOrder = () => {
    history("/myproducts");
  };

  const pageHandler = (pageNumber) => {
    setPerPage(users.slice(pageNumber * 5 - 5, pageNumber * 5));
  };
  const downloadExcel = () => {
    swal({
      title: "Thanks !!",
      text: "Please Click 'OK' to Download",
      icon: "info",
      buttons: true,
      dangerMode: true,
    }).then((willDownload) => {
      if (willDownload) {
        var editedUsers = users;
        editedUsers.map((ele) => {
          delete ele["__v"];
          delete ele["_id"];
        });
        const workSheet = XLSX.utils.json_to_sheet(editedUsers);
        const workBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workBook, workSheet, "material");
        XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
        XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
        XLSX.writeFile(workBook, "MaterialData.XLSX");
        swal(" Downloaded Successfully !!", {
          icon: "success",
        });
      } else {
        swal("Error occurred while Downloading !!");
      }
    });
  };
  const columns = [
    { title: "Material Id", field: "materialId", dataKey: "materialId" },
    { title: "Material Type", field: "materialType", dataKey: "materialType" },
    { title: "Description", field: "description", dataKey: "materialDesc" },
    { title: "Remarks", field: "remarks", dataKey: "materialRemarks" },
    { title: "Created Date", field: "created_dt", dataKey: "created_dt" },
    { title: "Created By", field: "created_by", dataKey: "created_by" },
  ];
  const downloadPdf = () => {
    swal({
      title: "Thanks !!",
      text: "Please Click 'OK' to Download",
      icon: "info",
      buttons: true,
      dangerMode: true,
    }).then((willDownload) => {
      if (willDownload) {
        const doc = new jsPDF();
        doc.addImage(logoImage, "JPG", 1, 1, 20, 20);
        doc.setFontSize(40);
        doc.text(20, 20, "Material Details");
        doc.autoTable({
          theme: "grid",
          columns: columns,
          body: users,
          startY: 30,
          styles: {
            fontSize: 12,
          },
        });
        doc.save("MaterialDetails.pdf");
        swal(" Downloaded Successfully !!", {
          icon: "success",
        });
      } else {
        swal("Error occurred while Downloading !!");
      }
    });
  };
  const changeInSearch = () => {
    const getNewSearched = users.filter((user) => {
      if (searchTerm === "") {
        return user;
      } else if (
        user.materialId.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return user;
      } else if (
        user.materialType.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return user;
      } else {
        return null;
      }
    });
    setPerPage(getNewSearched);
  };

  return (
    <div className="myContainer">
      <Navbar />
      <Link to="/myproducts/materialM/add">
        <button className="myBtn">Add Material +</button>{" "}
      </Link>
      <button className="myBack" onClick={backOrder}>
        Back{" "}
      </button>
      <input
        type="text"
        className="searchItem"
        placeholder="Search...."
        onChange={(event) => {
          setSearchTerm(event.target.value);
          changeInSearch();
        }}
      />
      <button
        className="expxl"
        title="Export to Excel"
        onClick={() => downloadExcel()}
      >
        Excel{" "}
      </button>
      <button
        className="exppdf"
        title="Export to PDF"
        onClick={() => downloadPdf()}
      >
        Pdf{" "}
      </button>

      <table className="myTable">
        <thead>
          <tr>
            <th>Material Id</th>
            <th>Material Type</th>
            <th>Description</th>
            <th>Remarks</th>
            <th>Edit/Delete</th>
          </tr>
        </thead>

        <tbody>
          {perPage.map((user) => (
            <tr key={user._id}>
              <td>{user.materialId}</td>
              <td>{user.materialType}</td>
              <td>{user.materialDesc}</td>
              <td>{user.materialRemarks}</td>
              <td>
                <Link to={`/myproducts/materialM/edit/${user._id}`}>
                  <button className="myedit">Edit</button>{" "}
                </Link>
                <button className="myedit" onClick={() => deleteModifyX(user)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
          <tr className="lastR">
            <td colSpan="6">
              {" "}
              {perPage.length === 0 ? (
                <h1>No Data Found .....</h1>
              ) : (
                <Pagination users={users} pageHandler={pageHandler} />
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AllUsers;
