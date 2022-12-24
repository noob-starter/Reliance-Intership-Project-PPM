import Homepage from "./components/homepage/homepage";
import Login from "./components/login/login";
import Register from "./components/register/register";
import Services from "./components/myservices/myservices";
import Products from "./components/myproducts/myproducts";
import Errorpage from "./components/errorpage/errorpage";
import ReportsPage from "./components/myreports/myreports";
import ResetPass from "./components/resetPassword/resetPassword";
import DailyProductionReport from "./frontendDB/dailyProductionReportSerach/dailyProductionReportSearch";

import Page1 from "./frontendDB/userMaster/userMaster";
import AddUser1 from "./frontendDB/userMaster/addUser";
import EditUser1 from "./frontendDB/userMaster/editUser";

import Page2 from "./frontendDB/departmentMaster/departmentMaster";
import AddUser2 from "./frontendDB/departmentMaster/addUser";
import EditUser2 from "./frontendDB/departmentMaster/editUser";

import Page3 from "./frontendDB/gradeMaster/gradeMaster";
import AddUser3 from "./frontendDB/gradeMaster/addUser";
import EditUser3 from "./frontendDB/gradeMaster/editUser";

import Page4 from "./frontendDB/codeMaster/codeMaster";
import AddUser4 from "./frontendDB/codeMaster/addUser";
import EditUser4 from "./frontendDB/codeMaster/editUser";

import Page5 from "./frontendDB/codeType/codeType";
import AddUser5 from "./frontendDB/codeType/addUser";
import EditUser5 from "./frontendDB/codeType/editUser";

import Page6 from "./frontendDB/productMaster/productMaster";
import AddUser6 from "./frontendDB/productMaster/addProduct";
import EditUser6 from "./frontendDB/productMaster/editProduct";

import Page7 from "./frontendDB/dailyProduction/dailyProduction";
import AddUser7 from "./frontendDB/dailyProduction/addProduction";
import EditUser7 from "./frontendDB/dailyProduction/editProduction";

import Page8 from "./frontendDB/palletMaster/palletMaster";
import AddUser8 from "./frontendDB/palletMaster/addPallet";
import EditUser8 from "./frontendDB/palletMaster/editPallet";

import Page9 from "./frontendDB/materialMaster/materialMaster";
import AddUser9 from "./frontendDB/materialMaster/addMaterial";
import EditUser9 from "./frontendDB/materialMaster/editMaterial";

import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";

function FrontEndRoutes() {
  const [user, setLoginUser] = useState({});
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route
          exact
          path="/"
          element={
            (user && user._id) || window.localStorage.getItem("userName") ? (
              <Homepage />
            ) : (
              <Login setLoginUser={setLoginUser} />
            )
          }
        />
        <Route path="/login" element={<Login setLoginUser={setLoginUser} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/resetpass" element={<ResetPass />} />
        <Route path="*" element={<Errorpage />} />
        {window.localStorage.getItem("userName") !== "" ? (
          <>
            <Route path="/myservices" element={<Services />} />

            <Route path="/myservices/userM" element={<Page1 />} />
            <Route path="/myservices/userM/add" element={<AddUser1 />} />
            <Route path="/myservices/userM/edit/:id" element={<EditUser1 />} />

            <Route path="/myservices/deptM" element={<Page2 />} />
            <Route path="/myservices/deptM/add" element={<AddUser2 />} />
            <Route path="/myservices/deptM/edit/:id" element={<EditUser2 />} />

            <Route path="/myservices/gradeM" element={<Page3 />} />
            <Route path="/myservices/gradeM/add" element={<AddUser3 />} />
            <Route path="/myservices/gradeM/edit/:id" element={<EditUser3 />} />

            <Route path="/myservices/codeM" element={<Page4 />} />
            <Route path="/myservices/codeM/add" element={<AddUser4 />} />
            <Route path="/myservices/codeM/edit/:id" element={<EditUser4 />} />

            <Route path="/myservices/codeTM" element={<Page5 />} />
            <Route path="/myservices/codeTM/add" element={<AddUser5 />} />
            <Route path="/myservices/codeTM/edit/:id" element={<EditUser5 />} />

            <Route path="/myproducts" element={<Products />} />

            <Route path="/myproducts/productM" element={<Page6 />} />
            <Route path="/myproducts/productM/add" element={<AddUser6 />} />
            <Route
              path="/myproducts/productM/edit/:id"
              element={<EditUser6 />}
            />

            <Route path="/myproducts/dailyProM" element={<Page7 />} />
            <Route path="/myproducts/dailyProM/add" element={<AddUser7 />} />
            <Route
              path="/myproducts/dailyProM/edit/:id"
              element={<EditUser7 />}
            />

            <Route path="/myproducts/palletM" element={<Page8 />} />
            <Route path="/myproducts/palletM/add" element={<AddUser8 />} />
            <Route
              path="/myproducts/palletM/edit/:id"
              element={<EditUser8 />}
            />

            <Route path="/myproducts/materialM" element={<Page9 />} />
            <Route path="/myproducts/materialM/add" element={<AddUser9 />} />
            <Route
              path="/myproducts/materialM/edit/:id"
              element={<EditUser9 />}
            />

            <Route path="/myreports" element={<ReportsPage />} />
            <Route
              path="/myreports/dailyReport"
              element={<DailyProductionReport />}
            />
          </>
        ) : (
          <Route path="*" element={<Errorpage />} />
        )}
      </Routes>
    </AnimatePresence>
  );
}

export default FrontEndRoutes;
