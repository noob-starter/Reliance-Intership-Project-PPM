import "./App.css";

import FrontEndRoutes from "./pageRoutesFrontEnd";

import { BrowserRouter as Router } from "react-router-dom";

import React from "react";

function App() {
  return (
    <div className="App">
      <Router>
        <FrontEndRoutes />
      </Router>
    </div>
  );
}

export default App;
