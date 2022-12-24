import React from "react";
import Navbar from "../navbar/navigationbar";
import Footer from "../navbar/footer";
import "./myproducts.css";

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
        <Link to="/myproducts/dailyProM">
          {" "}
          <button className="serviceBtn"> Production </button>
        </Link>
        <Link to="/myproducts/materialM">
          {" "}
          <button className="serviceBtn"> Material </button>
        </Link>
        <Link to="/myproducts/palletM">
          {" "}
          <button className="serviceBtn"> Pallet </button>
        </Link>
        <Link to="/myproducts/productM">
          {" "}
          <button className="serviceBtn"> Product </button>
        </Link>
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default Home;
