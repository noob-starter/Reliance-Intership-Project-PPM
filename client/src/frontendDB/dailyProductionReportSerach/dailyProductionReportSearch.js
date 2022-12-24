import React from "react";
import Navbar from "../../components/navbar/navigationbar";

import { useState, useEffect } from "react";
import { getUsers } from "./fetchDetails";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import "./reportsDiv.css";
import imgae from "./backImg.png";
import "../AllCode.css";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import logoImage from "../image.jpg";

const current = new Date();
var month = current.getMonth() + 1;
var dateT = current.getDate();
if (month < 10) {
  month = "0" + month;
}
if (dateT < 10) {
  dateT = "0" + dateT;
}
const todayDate = `${current.getFullYear()}-${month}-${dateT}`;
const tempTodayDate = `${dateT}-${month}-${current.getFullYear()}`;

const initialValueDP = {
  trackNo: "",
  palletNo: "",
  productId: "",
  grade: "",
  batch: "",
  packedBy: "",
};

const initialValuePP = {
  palletNo: "",
  productId: "",
  grade: "",
  status: "",
  start_dt: "",
  end_dt: "",
};

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [gradeData, setGradeData] = useState([]);

  const [productData, setProductData] = useState([]);
  const [productTempData, setProductTempData] = useState([]);

  const [palletData, setPalletData] = useState([]);
  const [palletTempData, setPalletTempData] = useState([]);

  const [productUserData, setProductUserData] = useState(initialValueDP);
  const [palletUserData, setPalletUserData] = useState(initialValuePP);

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    let response = await getUsers();
    const gradeDataGet = response.data.grades;
    const productDataGet = response.data.products;
    const palletDataGet = response.data.pallets;
    setUsers(response.data);
    setGradeData(gradeDataGet);
    setProductData(productDataGet);
    setPalletData(palletDataGet);
    setProductTempData(response.data.users);
    setPalletTempData(palletDataGet);
  };

  const [productTrackError, setProductTrackError] = useState("");
  const [productPalletError, setProductPalletError] = useState("");
  const [productPackedByError, setProductPackedByError] = useState("");
  const [productBatchError, setProductBatchError] = useState("");
  const [palletPalletError, setPalletPalletError] = useState("");

  const validateName = (passedName, val) => {
    const regExprName = /^[a-zA-Z]+$/;
    const testName = regExprName.test(passedName);
    var errMsg = "";
    if (!testName) {
      errMsg += "\nOnly Alphabetic Values Allowed";
    }
    if (val === "dppb") {
      if (passedName.length < 3) {
        errMsg += "\nMinimum Name length should be 3";
      }
    }

    //Packed By Error
    if (val === "dppb") {
      setProductPackedByError(errMsg);
    }

    console.log(errMsg);
  };

  const validateValue = (passedName, val) => {
    const regExprName = /^[0-9]+$/;
    const testName = regExprName.test(passedName);
    var errMsg = "";
    if (!testName) {
      errMsg += "\nOnly Numeric Values Allowed";
    }
    if (val === "dpb") {
      if (passedName.length < 6) {
        errMsg += "\nMinimum Batch length should be 6";
      }
    }

    //Batch Error
    if (val === "dpb") {
      setProductBatchError(errMsg);
    }

    //Track Number
    if (val === "dpt") {
      setProductTrackError(errMsg);
    }

    //Pallet Number
    if (val === "dpp") {
      setProductPalletError(errMsg);
    }
    if (val === "ppp") {
      setPalletPalletError(errMsg);
    }

    console.log(errMsg);
  };

  const onValueChange = (e, val) => {
    if (val === "dp") {
      if (e.target.name === "trackNo") {
        validateValue(e.target.value, "dpt");
      }
      if (e.target.name === "trackNo") {
        if (e.target.value === "") {
          setProductTrackError("");
        }
      }

      if (e.target.name === "palletNo") {
        validateValue(e.target.value, "dpp");
      }
      if (e.target.name === "palletNo") {
        if (e.target.value === "") {
          setProductPalletError("");
        }
      }

      if (e.target.name === "packedBy") {
        validateName(e.target.value, "dppb");
      }
      if (e.target.name === "packedBy") {
        if (e.target.value === "") {
          setProductPackedByError("");
        }
      }

      if (e.target.name === "batch") {
        validateValue(e.target.value, "dpb");
      }
      if (e.target.name === "batch") {
        if (e.target.value === "") {
          setProductBatchError("");
        }
      }

      setProductUserData({
        ...productUserData,
        [e.target.name]: e.target.value,
      });
    }

    if (val === "pp") {
      if (e.target.name === "palletNo") {
        validateValue(e.target.value, "ppp");
      }
      if (e.target.name === "palletNo") {
        if (e.target.value === "") {
          setPalletPalletError("");
        }
      }

      setPalletUserData({ ...palletUserData, [e.target.name]: e.target.value });
    }

    // console.log(productUserData)
    console.log(palletUserData);
  };

  const history = useNavigate();
  const backOrder = () => {
    history("/myreports");
  };

  const deleteProduct = (ele) => {
    delete ele["productionId"];
    delete ele["production_dt"];
    delete ele["trackNo"];
    delete ele["palletNo"];
    delete ele["productId"];
    delete ele["grade"];
    delete ele["netWeight"];
    delete ele["packedBy"];
    delete ele["packed_dt"];
    delete ele["grossWeight"];
    delete ele["tareWeight"];
    delete ele["batch"];
    delete ele["created_dt"];
    delete ele["created_by"];
  };

  const deletePallet = (ele) => {
    delete ele["palletNo"];
    delete ele["productId"];
    delete ele["noOfRolls"];
    delete ele["grade"];
    delete ele["start_dt"];
    delete ele["end_dt"];
    delete ele["created_dt"];
    delete ele["created_by"];
    delete ele["status"];
    delete ele["batch"];
  };

  const deleteEmpty = (valList) => {
    valList.filter();
  };

  const reverseDate = (temp) => {
    temp = temp.split("-");
    for (let index = 0; index < temp.length; index++) {
      const element = temp[index];
      if (element[0] === "0") {
        temp[index] = element[1];
      }
    }
    temp[2] = temp[2].split("").reverse().join("");
    temp = temp.join("-");
    temp = temp.split("").reverse().join("");
    temp.replace("-", "/");
    return temp;
  };

  const downloadExcel = (val) => {
    var errMs = "";
    if (val === "dp") {
      if (productTrackError !== "") {
        errMs =
          errMs +
          "\n" +
          productTrackError +
          " at Daily Production (Track Number)";
      }
      if (productPalletError !== "") {
        errMs =
          errMs +
          "\n" +
          productPalletError +
          " at Daily Production (Pallet Number)";
      }
      if (productPackedByError !== "") {
        errMs =
          errMs +
          "\n" +
          productPackedByError +
          " at Daily Production (Packed By)";
      }
      if (productBatchError !== "") {
        errMs =
          errMs + "\n" + productBatchError + " at Daily Production (Batch)";
      }
    }
    if (val === "pp") {
      if (palletPalletError != "") {
        errMs = errMs + "\n" + palletPalletError + " at Pallet (Pallet Number)";
      }
    }

    if (errMs !== "") {
      swal(errMs);
    } else {
      swal({
        title: "Thanks !!",
        text: "Please Click 'OK' to Download",
        icon: "info",
        buttons: true,
        dangerMode: true,
      }).then((willDownload) => {
        var editedUsers;
        if (willDownload) {
          if (val === "dp") {
            productTempData.map((ele) => {
              delete ele["__v"];
              delete ele["_id"];
            });

            if (productUserData.trackNo !== "") {
              productTempData.map((ele) => {
                if (productUserData.trackNo !== ele.trackNo) {
                  deleteProduct(ele);
                }
              });
            }

            if (productUserData.palletNo !== "") {
              productTempData.map((ele) => {
                if (productUserData.palletNo !== ele.palletNo) {
                  deleteProduct(ele);
                }
              });
            }

            if (productUserData.productId !== "") {
              productTempData.map((ele) => {
                if (productUserData.productId !== ele.productId) {
                  deleteProduct(ele);
                }
              });
            }

            if (productUserData.grade !== "") {
              productTempData.map((ele) => {
                if (productUserData.grade !== ele.grade) {
                  deleteProduct(ele);
                }
              });
            }

            if (productUserData.packedBy !== "") {
              productTempData.map((ele) => {
                if (productUserData.packedBy !== ele.packedBy) {
                  deleteProduct(ele);
                }
              });
            }

            if (productUserData.batch !== "") {
              productTempData.map((ele) => {
                if (productUserData.batch !== ele.batch) {
                  deleteProduct(ele);
                }
              });
            }

            console.log(productTempData);
            editedUsers = productTempData;

            const workSheet = XLSX.utils.json_to_sheet(editedUsers);
            const workBook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workBook, workSheet, "dailyPro");
            XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
            XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
            XLSX.writeFile(workBook, "DailyProductionData.XLSX");
            swal(" Downloaded Successfully !!", {
              icon: "success",
            });
          }

          if (val === "pp") {
            palletTempData.map((ele) => {
              delete ele["__v"];
              delete ele["_id"];
            });

            if (palletUserData.grade !== "") {
              palletTempData.map((ele) => {
                if (palletUserData.grade !== ele.grade) {
                  deletePallet(ele);
                }
              });
            }

            if (palletUserData.palletNo !== "") {
              palletTempData.map((ele) => {
                if (palletUserData.palletNo !== ele.palletNo) {
                  deletePallet(ele);
                }
              });
            }

            if (palletUserData.productId !== "") {
              palletTempData.map((ele) => {
                if (palletUserData.productId !== ele.productId) {
                  deletePallet(ele);
                }
              });
            }

            if (palletUserData.start_dt === "") {
              palletUserData.start_dt = "1/3/2022";
            } else {
              palletUserData.start_dt = reverseDate(palletUserData.start_dt);
              if (palletUserData.end_dt === "") {
                palletUserData.end_dt = tempTodayDate;
              } else {
                palletUserData.end_dt = reverseDate(palletUserData.end_dt);
              }
            }

            palletTempData.map((ele) => {
              if (palletUserData.start_dt > ele.start_dt) {
                deletePallet(ele);
              }
            });

            if (palletUserData.status !== "") {
              palletTempData.map((ele) => {
                if (palletUserData.status !== ele.status) {
                  deletePallet(ele);
                }
              });
            }

            console.log(palletTempData);
            editedUsers = palletTempData;

            const workSheet = XLSX.utils.json_to_sheet(editedUsers);
            const workBook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workBook, workSheet, "pallet");
            XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
            XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
            XLSX.writeFile(workBook, "PalletData.XLSX");
            swal(" Downloaded Successfully !!", {
              icon: "success",
            });
          }
        } else {
          swal("Error occurred while Downloading !!");
        }
      });
    }
  };

  const columnsProduct = [
    { title: "Production Id", field: "productionId", dataKey: "productionId" },
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

  const columnsPallet = [
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

  const downloadPdf = (val) => {
    var errMs = "";
    if (val === "dp") {
      if (productTrackError != "") {
        errMs =
          errMs +
          "\n" +
          productTrackError +
          " at Daily Production (Track Number)";
      }
      if (productPalletError != "") {
        errMs =
          errMs +
          "\n" +
          productPalletError +
          " at Daily Production (Pallet Number)";
      }
      if (productPackedByError != "") {
        errMs =
          errMs +
          "\n" +
          productPackedByError +
          " at Daily Production (Packed By)";
      }
      if (productBatchError != "") {
        errMs =
          errMs + "\n" + productBatchError + " at Daily Production (Batch)";
      }
    }
    if (val === "pp") {
      if (palletPalletError != "") {
        errMs = errMs + "\n" + palletPalletError + " at Pallet (Pallet Number)";
      }
    }

    if (errMs !== "") {
      swal(errMs);
    } else {
      swal({
        title: "Thanks !!",
        text: "Please Click 'OK' to Download",
        icon: "info",
        buttons: true,
        dangerMode: true,
      }).then((willDownload) => {
        var editedUsers;
        if (willDownload) {
          if (val === "dp") {
            productTempData.map((ele) => {
              delete ele["__v"];
              delete ele["_id"];
            });

            if (productUserData.trackNo !== "") {
              productTempData.map((ele) => {
                if (productUserData.trackNo !== ele.trackNo) {
                  deleteProduct(ele);
                }
              });
            }

            if (productUserData.palletNo !== "") {
              productTempData.map((ele) => {
                if (productUserData.palletNo !== ele.palletNo) {
                  deleteProduct(ele);
                }
              });
            }

            if (productUserData.productId !== "") {
              productTempData.map((ele) => {
                if (productUserData.productId !== ele.productId) {
                  deleteProduct(ele);
                }
              });
            }

            if (productUserData.grade !== "") {
              productTempData.map((ele) => {
                if (productUserData.grade !== ele.grade) {
                  deleteProduct(ele);
                }
              });
            }

            if (productUserData.packedBy !== "") {
              productTempData.map((ele) => {
                if (productUserData.packedBy !== ele.packedBy) {
                  deleteProduct(ele);
                }
              });
            }

            if (productUserData.batch !== "") {
              productTempData.map((ele) => {
                if (productUserData.batch !== ele.batch) {
                  deleteProduct(ele);
                }
              });
            }

            console.log(productTempData);
            editedUsers = productTempData;

            const doc = new jsPDF();
            doc.addImage(logoImage, "JPG", 1, 1, 20, 20);
            doc.setFontSize(40);
            doc.text(20, 20, "Daily Production Details");
            doc.autoTable({
              theme: "grid",
              columns: columnsProduct,
              body: editedUsers,
              startY: 30,
              styles: {
                fontSize: 12,
              },
            });
            doc.save("DailyProductionDetails.pdf");
            swal(" Downloaded Successfully !!", {
              icon: "success",
            });
          }

          if (val === "pp") {
            palletTempData.map((ele) => {
              delete ele["__v"];
              delete ele["_id"];
            });

            if (palletUserData.grade !== "") {
              palletTempData.map((ele) => {
                if (palletUserData.grade !== ele.grade) {
                  deletePallet(ele);
                }
              });
            }

            if (palletUserData.palletNo !== "") {
              palletTempData.map((ele) => {
                if (palletUserData.palletNo !== ele.palletNo) {
                  deletePallet(ele);
                }
              });
            }

            if (palletUserData.productId !== "") {
              palletTempData.map((ele) => {
                if (palletUserData.productId !== ele.productId) {
                  deletePallet(ele);
                }
              });
            }

            if (palletUserData.start_dt === "") {
              palletUserData.start_dt = "1/3/2022";
            } else {
              palletUserData.start_dt = reverseDate(palletUserData.start_dt);
              if (palletUserData.end_dt === "") {
                palletUserData.end_dt = tempTodayDate;
              } else {
                palletUserData.end_dt = reverseDate(palletUserData.end_dt);
              }
            }

            palletTempData.map((ele) => {
              if (palletUserData.start_dt > ele.start_dt) {
                deletePallet(ele);
              }
            });

            if (palletUserData.status !== "") {
              palletTempData.map((ele) => {
                if (palletUserData.status !== ele.status) {
                  deletePallet(ele);
                }
              });
            }

            console.log(palletTempData);
            editedUsers = palletTempData;
            const doc = new jsPDF();
            doc.addImage(logoImage, "JPG", 1, 1, 20, 20);
            doc.setFontSize(40);
            doc.text(20, 20, "Pallet Details");
            doc.autoTable({
              theme: "grid",
              columns: columnsPallet,
              body: editedUsers,
              startY: 30,
              styles: {
                fontSize: 12,
              },
            });
            doc.save("PalletDetails.pdf");
            swal(" Downloaded Successfully !!", {
              icon: "success",
            });
          }
        } else {
          swal("Error occurred while Downloading !!");
        }
      });
    }
  };

  return (
    <>
      <div className="myContainer">
        <Navbar />
        <button className="myBack mybackx" onClick={backOrder}>
          Back{" "}
        </button>

        <div className="report">
          <div className="divReport">
            <h1 className="divh1">Daily Production</h1>
            <br />
            <br />
            <table className="tableReport">
              <tr>
                <td>
                  <label className="divLabel" for="trackNo">
                    Track Number
                  </label>
                  <input
                    type="text"
                    className="divInput"
                    placeholder="Enter Track Number"
                    name="trackNo"
                    id="trackNo"
                    onChange={(e) => {
                      onValueChange(e, "dp");
                    }}
                  ></input>
                </td>
                <td>
                  <label className="divLabel" for="palletNo">
                    Pallet Number
                  </label>
                  <input
                    type="text"
                    className="divInput"
                    placeholder="Enter Pallet Number"
                    name="palletNo"
                    id="palletNo"
                    onChange={(e) => {
                      onValueChange(e, "dp");
                    }}
                  ></input>
                </td>
                <td>
                  <label className="divLabel" for="productId">
                    Product Name
                  </label>
                  {/* <input type="text" className='divInput' placeholder='Enter Product Name' name="productId" id="productId" onChange={(e)=>{ onValueChange(e, 'dp'); }}></input> */}
                  <div class="wrap">
                    <div class="boxN">
                      <select
                        class="classic divInputX"
                        name="productId"
                        id="productId"
                        onChange={(e) => {
                          onValueChange(e, "dp");
                        }}
                      >
                        {productData.length === 0 ? (
                          <option> No Records Were Found !! </option>
                        ) : (
                          productData.map((opt) => (
                            <option>{opt.productDesc}</option>
                          ))
                        )}
                      </select>
                    </div>
                  </div>
                </td>
              </tr>

              <tr>
                <td>
                  <h3 className="divh3">{productTrackError}</h3>
                </td>
                <td>
                  <h3 className="divh3">{productPalletError}</h3>
                </td>
              </tr>

              <tr>
                <td>
                  <label className="divLabel" for="grade">
                    Grade{" "}
                  </label>
                  {/* <input type="text" className='divInput' placeholder='Enter Grade' name="grade" id="grade" onChange={(e)=>{ onValueChange(e, 'dp'); }}></input> */}
                  <div class="wrap">
                    <div class="boxN">
                      <select
                        class="classic divInputX"
                        name="grade"
                        id="grade"
                        onChange={(e) => {
                          onValueChange(e, "dp");
                        }}
                      >
                        {gradeData.length === 0 ? (
                          <option> No Records Were Found !! </option>
                        ) : (
                          gradeData.map((opt) => (
                            <option>{opt.gradeName}</option>
                          ))
                        )}
                      </select>
                    </div>
                  </div>
                </td>
                <td>
                  <label className="divLabel" for="packedBy">
                    Packed By
                  </label>
                  <input
                    type="text"
                    className="divInput"
                    placeholder="Enter Name to Search"
                    name="packedBy"
                    id="packedBy"
                    onChange={(e) => {
                      onValueChange(e, "dp");
                    }}
                  ></input>
                </td>
                <td>
                  <label className="divLabel" for="batch">
                    Batch{" "}
                  </label>
                  <input
                    type="text"
                    className="divInput"
                    placeholder="Enter Batch Number"
                    name="batch"
                    id="batch"
                    onChange={(e) => {
                      onValueChange(e, "dp");
                    }}
                  ></input>
                </td>
              </tr>

              <tr>
                <td></td>
                <td>
                  <h3 className="divh3">{productPackedByError}</h3>
                </td>
                <td>
                  <h3 className="divh3">{productBatchError}</h3>
                </td>
              </tr>

              <br />
              <br />
              <br />

              <tr>
                <td>
                  <button className="divbtn" title="View Records Only">
                    View Only{" "}
                  </button>
                </td>
                <td>
                  <button
                    className="divbtn"
                    title="Export to Excel"
                    onClick={() => downloadExcel("dp")}
                  >
                    Excel{" "}
                  </button>
                </td>
                <td>
                  <button
                    className="divbtn"
                    title="Export to PDF"
                    onClick={() => downloadPdf("dp")}
                  >
                    Pdf{" "}
                  </button>
                </td>
              </tr>
            </table>
          </div>

          <div className="divReport">
            <h1 className="divh1">Pallet</h1>
            <br />
            <table>
              <tr>
                <td>
                  <label className="divLabel" for="grade">
                    Grade
                  </label>
                  {/* <input type="text" className='divInput' placeholder='Enter Grade' name="grade" id="grade" onChange={(e)=>{ onValueChange(e, 'pp'); }}></input> */}
                  <div class="wrap">
                    <div class="boxN">
                      <select
                        class="classic divInputX"
                        name="grade"
                        id="grade"
                        onChange={(e) => {
                          onValueChange(e, "pp");
                        }}
                      >
                        {gradeData.length === 0 ? (
                          <option> No Records Were Found !! </option>
                        ) : (
                          gradeData.map((opt) => (
                            <option>{opt.gradeName}</option>
                          ))
                        )}
                      </select>
                    </div>
                  </div>
                </td>
                <td>
                  <label className="divLabel" for="palletNo">
                    Pallet Number
                  </label>
                  <input
                    type="text"
                    className="divInput"
                    placeholder="Enter Pallet Number"
                    name="palletNo"
                    id="palletNo"
                    onChange={(e) => {
                      onValueChange(e, "pp");
                    }}
                  ></input>
                </td>
                <td>
                  <label className="divLabel" for="productId">
                    Product Name
                  </label>
                  {/* <input type="text" className='divInput' placeholder='Enter Product Name' name="productId" id="productId" onChange={(e)=>{ onValueChange(e, 'pp'); }}></input> */}
                  <div class="wrap">
                    <div class="boxN">
                      <select
                        class="classic divInputX"
                        name="productId"
                        id="productId"
                        onChange={(e) => {
                          onValueChange(e, "pp");
                        }}
                      >
                        {productData.length === 0 ? (
                          <option> No Records Were Found !! </option>
                        ) : (
                          productData.map((opt) => (
                            <option>{opt.productDesc}</option>
                          ))
                        )}
                      </select>
                    </div>
                  </div>
                </td>
              </tr>

              <tr>
                <td></td>
                <td>
                  <h3 className="divh3">{palletPalletError}</h3>
                </td>
              </tr>

              <br />
              <tr>
                <td>
                  <label className="divLabel" for="start_dt">
                    Start date
                  </label>
                  <span className="divSpan" id="date-format">
                    {" "}
                    (DD-MM-YYYY)
                  </span>
                  <input
                    type="date"
                    className="divInput"
                    name="start_dt"
                    id="start_dt"
                    aria-describedby="date-format"
                    min="2022-03-01"
                    max={todayDate}
                    onChange={(e) => {
                      onValueChange(e, "pp");
                    }}
                  />
                </td>
                <td>
                  <label className="divLabel" for="end_dt">
                    End date
                  </label>
                  <span className="divSpan" id="date-format">
                    {" "}
                    (DD-MM-YYYY)
                  </span>
                  <input
                    type="date"
                    className="divInput"
                    name="end_dt"
                    id="date"
                    aria-describedby="date-format"
                    min="2022-03-01"
                    max={todayDate}
                    onChange={(e) => {
                      onValueChange(e, "pp");
                    }}
                  />
                </td>
                <td>
                  <label className="divLabel" for="status">
                    {" "}
                    Select Status{" "}
                  </label>
                  {/* <input type="text" className='divInput' placeholder='Enter Status' name="status" id="status" onChange={(e)=>{ onValueChange(e, 'pp'); }}></input> */}
                  <div class="wrap">
                    <div class="boxN">
                      <select
                        class="classic divInputX"
                        name="status"
                        id="status"
                        onChange={(e) => {
                          onValueChange(e, "pp");
                        }}
                      >
                        <option>Open</option>
                        <option>Close</option>
                      </select>
                    </div>
                  </div>
                </td>
              </tr>
              <br />
              <br />
              <br />

              <tr>
                <td>
                  <button className="divbtn" title="View Records Only">
                    View Only{" "}
                  </button>
                </td>
                <td>
                  <button
                    className="divbtn"
                    title="Export to Excel"
                    onClick={() => downloadExcel("pp")}
                  >
                    Excel{" "}
                  </button>
                </td>
                <td>
                  <button
                    className="divbtn"
                    title="Export to PDF"
                    onClick={() => downloadPdf("pp")}
                  >
                    Pdf{" "}
                  </button>
                </td>
              </tr>
            </table>
          </div>
        </div>
        <div className="divBlank">
          <img className="divImage" src={imgae} />
        </div>
      </div>
    </>
  );
};

export default AllUsers;
