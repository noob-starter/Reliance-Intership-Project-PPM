import React from "react";
import Navbar from "../navbar/navigationbar";
import Footer from "../navbar/footer";
import "./myservices.css";

import styled, { keyframes } from "styled-components";
import { bounce, wobble } from "react-animations";
import { motion } from "framer-motion";

import { Link } from "react-router-dom";
import NotSer from "./notService.png";

function Home() {
  const BounceText = styled.div`
    animation: 2s ${keyframes`${bounce}`} infinite;
  `;
  const ImageAnimate = styled.img`
    animation: 6s ${keyframes`${wobble}`} infinite;
  `;
  const checkItemToDisplay = window.localStorage.getItem("userName");

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
        <Link to="/myservices/userM">
          {" "}
          <button className="serviceBtn"> User </button>
        </Link>
        <Link to="/myservices/deptM">
          {" "}
          <button className="serviceBtn"> Department </button>
        </Link>
        <Link to="/myservices/gradeM">
          {" "}
          <button className="serviceBtn"> Grade </button>
        </Link>
        <Link to="/myservices/codeM">
          {" "}
          <button className="serviceBtn"> Code </button>
        </Link>
        <Link to="/myservices/codeTM">
          {" "}
          <button className="serviceBtn"> CodeType </button>
        </Link>
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default Home;
