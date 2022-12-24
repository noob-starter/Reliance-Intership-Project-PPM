import React from "react";
import Navbar from "../../components/navbar/navigationbar";

import { useState, useEffect } from "react";
import { getUsers, deleteUser } from "./fetchPallet";
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
    setUsers(response.data.users);
    setPerPage(response.data.users.slice(0, 5));
  };

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
        XLSX.utils.book_append_sheet(workBook, workSheet, "pallet");
        XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
        XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
        XLSX.writeFile(workBook, "PalletData.XLSX");
        swal(" Downloaded Successfully !!", {
          icon: "success",
        });
      } else {
        swal("Error occurred while Downloading !!");
      }
    });
  };
  const columns = [
    { title: "Pallet Number", field: "palletNo", dataKey: "palletNo" },
    { title: "Product Id", field: "productId", dataKey: "productId" },
    { title: "Number of Rolls", field: "noOfRol", dataKey: "noOfRolls" },
    { title: "Grade", field: "grade", dataKey: "grade" },
    { title: "Status", field: "status", dataKey: "status" },
    { title: "Batch", field: "batch", dataKey: "batch" },
    { title: "Created Date", field: "created_dt", dataKey: "created_dt" },
    { title: "Created By", field: "created_by", dataKey: "created_by" },
    { title: "Start Date", field: "start_dt", dataKey: "start_dt" },
    { title: "End Date", field: "end_dt", dataKey: "end_dt" },
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
        doc.text(20, 20, "Pallet Details");
        doc.autoTable({
          theme: "grid",
          columns: columns,
          body: users,
          startY: 30,
          styles: {
            fontSize: 12,
          },
        });
        doc.save("PalletDetails.pdf");
        swal(" Downloaded Successfully !!", {
          icon: "success",
        });
      } else {
        swal("Error occurred while Downloading !!");
      }
    });
  };

  return (
    <div className="myContainer">
      <Navbar />

      <button className="myBack mybackx" onClick={backOrder}>
        Back{" "}
      </button>

      <table className="myTable">
        <thead>
          <tr>
            <th>Pallet No.</th>
            <th>Product</th>
            <th>No. of Rolls</th>
            <th>Grade</th>
            <th>Status</th>
            <td>Batch</td>
          </tr>
        </thead>

        <tbody>
          {perPage.map((user) => (
            <tr key={user._id}>
              <td>{user.palletNo}</td>
              <td>{user.productId}</td>
              <td>{user.noOfRolls}</td>
              <td>{user.grade}</td>
              <td>{user.status}</td>
              <td>{user.batch}</td>
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
