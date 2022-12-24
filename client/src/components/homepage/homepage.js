import React from "react";
import Slider from "../slider/slider";
import Navbar from "../navbar/navigationbar";
import Footer from "../navbar/footer";
import "./homepage.css";
import waveImg from "./greenwave.png";
import HomeComponent from "../homeComponent/homeComponent";

function Home() {
  return (
    <div className="home">
      <Navbar />
      <div className="middlePortion">
        <img className="imgw" src={waveImg}></img>
        <Slider />
      </div>
      <HomeComponent />
      <Footer />
    </div>
  );
}

export default Home;
