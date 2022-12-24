import React, { useState } from "react";
import "./homeComponent.css";
import { Fade } from "react-reveal";

function HomeComponent() {
  return (
    <>
      <div>
        <section id="services">
          <div class="services container">
            <div class="service-top">
              <h1 class="section-title">Services</h1>
              <p>Get All Services Information from Here</p>
            </div>

            <div class="service-item">
              <h2>Users</h2>
              <p>In this Section</p>
            </div>

            <div class="service-item">
              <h2>Department</h2>
              <p>In this Section</p>
            </div>
            <div class="service-item">
              <h2>Grade</h2>
              <p>In this Section</p>
            </div>
            <div class="service-item">
              <h2>Code</h2>
              <p>In this Section</p>
            </div>
            <div class="service-item">
              <h2>Code Type</h2>
              <p>In this Section</p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default HomeComponent;
