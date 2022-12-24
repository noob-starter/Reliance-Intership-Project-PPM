// Importing the necessary Libraries
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";

import { authRoute } from "./routes/auth";
import { userMasterRoute } from "./routes/usermasterroute";
import { gradeMasterRoute } from "./routes/grademasterroute";
import { departmentRoute } from "./routes/departmentroute";
import { codeTypeRoute } from "./routes/codetyperoute";
import { codeMasterRoute } from "./routes/codemasterroute";
import { dailyProductionMasterRoute } from "./routes/dailyproductionroute";
import { materialMasterRoute } from "./routes/materialmasterroute";
import { palletMasterRoute } from "./routes/palletmasterroute";
import { productMasterRoute } from "./routes/productmasterroute";

// Configuration of the Express library
const app = express();

// Initializing some express functions
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.use("/users", authRoute);
app.use("/usermaster", userMasterRoute);
app.use("/grademaster", gradeMasterRoute);
app.use("/department", departmentRoute);
app.use("/codetype", codeTypeRoute);
app.use("/dailyproductmaster", dailyProductionMasterRoute);
app.use("/palletmaster", palletMasterRoute);
app.use("/materialmaster", materialMasterRoute);
app.use("/productmaster", productMasterRoute);
app.use("/codemaster", codeMasterRoute);

/*----------------------------------------Routes for the test of the app -------------------------------------------------*/

/*
 @route     GET /
 @desc      Test for the default main route working
 @access    Public
*/

app.get("/", (req, res) => {
  res.send(`This is my Internship project`);
});

/*
 @connect              Local Connection 
 @desc                 To connect the project to Local database
 @access               Public
 @database_name        myLoginRegisterDB
*/

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
});

const connection = mongoose.connection;

connection.once("open", () => {
  console.log(`Connected to the Local database ....`);

  app.listen(process.env.PORT, () => {
    console.log(`Server started at port ${process.env.PORT}`);
  });
});
