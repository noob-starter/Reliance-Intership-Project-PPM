import React, { useState, useEffect } from "react";
import Navbar from "../navbar/navigationbar";
import Footer from "../navbar/footer";
import "./myreports.css";
import swal from "sweetalert";
import { getDetails } from "./fetchDetails";
import { Link } from "react-router-dom";

import styled, { keyframes } from "styled-components";
import { bounce, wobble } from "react-animations";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import logoImage from "./image.jpg";
import { motion } from "framer-motion";

import NotSer from "./notService.png";

function Home() {
  const BounceText = styled.div`
    animation: 2s ${keyframes`${bounce}`} infinite;
  `;
  const ImageAnimate = styled.img`
    animation: 6s ${keyframes`${wobble}`} infinite;
  `;
  const checkItemToDisplay = window.localStorage.getItem("userName");

  const [dailyProductionData, setDailyProductionData] = useState([]);
  const [loginData, setLoginData] = useState([]);
  const [dailyProductsData, setDailyProductsData] = useState([]);

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    const response = await getDetails();
    console.log(response.data);
    setDailyProductionData(response.data.users);
    setLoginData(response.data.logins);
    setDailyProductsData(response.data.products);
  };

  const downloadExcelReport = (users, term) => {
    var val;
    var editedUsers = users;
    editedUsers.map((ele) => {
      delete ele["__v"];
      delete ele["_id"];
    });
    if (term === "DPTR") {
      val = "Daily_Production_Report";
    } else if (term === "DPSR") {
      val = "Daily_Products_Report";
    } else {
      val = "Daily_Login_Report";
    }

    const workSheet = XLSX.utils.json_to_sheet(editedUsers);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, val);
    XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" });

    val = val + ".XLSX";
    XLSX.writeFile(workBook, val);
    swal(" Downloaded Successfully !!", {
      icon: "success",
    });
  };

  const getColumnsNames = (term) => {
    const dailyProductionColumns = [
      {
        title: "Production Id",
        field: "productionId",
        dataKey: "productionId",
      },
      { title: "Track Number", field: "trackNo", dataKey: "trackNo" },
      { title: "Pallet Number", field: "palletNo", dataKey: "palletNo" },
      { title: "Product Id", field: "productId", dataKey: "productId" },
      { title: "Grade", field: "grade", dataKey: "grade" },
      { title: "Net Weight", field: "netWeight", dataKey: "netWeight" },
      { title: "Gross Weight", field: "grossWeight", dataKey: "grossWeight" },
      { title: "Tare Weight", field: "tareWeight", dataKey: "tareWeight" },
      { title: "Batch", field: "batch", dataKey: "batch" },
      { title: "Created Date", field: "created_dt", dataKey: "created_dt" },
      { title: "Created By", field: "created_by", dataKey: "created_by" },
    ];

    const dailyLoginColumns = [
      { title: "User Id", field: "userId", dataKey: "userId" },
      { title: "Name", field: "name", dataKey: "name" },
      { title: "Department", field: "department", dataKey: "department" },
      { title: "Email", field: "email", dataKey: "email" },
      { title: "Phone", field: "phone", dataKey: "phone" },
      { title: "Created Date", field: "created_dt", dataKey: "created_dt" },
      { title: "Created By", field: "created_by", dataKey: "created_by" },
      { title: "Modified Date", field: "modify_dt", dataKey: "modify_dt" },
      { title: "Modified By", field: "modify_by", dataKey: "modify_by" },
    ];

    const dailyProductsColumns = [
      { title: "Product Id", field: "productId", dataKey: "productId" },
      { title: "Material Id", field: "materialId", dataKey: "materialId" },
      { title: "Description", field: "description", dataKey: "productDesc" },
      { title: "Remarks", field: "remarks", dataKey: "productRemarks" },
      { title: "Maximum Rolls", field: "maxRol", dataKey: "maxRolls" },
      { title: "Created Date", field: "created_dt", dataKey: "created_dt" },
      { title: "Created By", field: "created_by", dataKey: "created_by" },
    ];

    if (term === "DPTR") {
      return dailyProductionColumns;
    } else if (term === "DPSR") {
      return dailyProductsColumns;
    } else {
      return dailyLoginColumns;
    }
  };

  const downloadPDFReport = (users, term) => {
    var valY;
    if (term === "DPTR") {
      valY = "Daily_Production_Report";
    } else if (term === "DPSR") {
      valY = "Daily_Products_Report";
    } else {
      valY = "Daily_Login_Report";
    }

    const columns = getColumnsNames(term);
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
        doc.text(20, 20, valY);
        doc.autoTable({
          theme: "grid",
          columns: columns,
          body: users,
          startY: 30,
          styles: {
            fontSize: 12,
          },
        });
        valY = valY + ".pdf";
        doc.save(valY);
        swal(" Downloaded Successfully !!", {
          icon: "success",
        });
      } else {
        swal("Error occurred while Downloading !!");
      }
    });
  };

  const swalMessage = (users, term) => {
    swal("Please Choose The Format of the File You Want.", {
      icon: "info",
      buttons: {
        pdf: {
          text: "Download PDF !",
          value: "p",
        },
        excel: {
          text: "Download EXCEL!",
          value: "e",
        },
        cancel: true,
      },
    }).then((value) => {
      switch (value) {
        case "p":
          downloadPDFReport(users, term);
          break;

        case "e":
          downloadExcelReport(users, term);
          break;

        default:
          swal("Bye !");
      }
    });
  };

  const printDailyLoginReport = () => {
    swalMessage(loginData, "DLD");
  };

  return checkItemToDisplay === "" ? (
    <div className="home">
      <Navbar />
      <div className="middlePortion">
        <div className="errorLogin">
          <div className="textDisplay">
            <BounceText>Please Login To view the details</BounceText>
          </div>
          <div className="imgLogin">
            <ImageAnimate src={NotSer}></ImageAnimate>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  ) : (
    <div className="home">
      <Navbar />
      <div className="middlePortion">
        <Link to="/myreports/dailyReport">
          {" "}
          <button className="serviceBtn"> Daily Production Reports </button>
        </Link>

        {/* <button
          className="serviceBtn"
          onClick={() => {
            printDailyLoginReport();
          }}
        >
          {" "}
          Daily Login Details{" "}
        </button> */}
      </div>
    </div>
  );
}

export default Home;
