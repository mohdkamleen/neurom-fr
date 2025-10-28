import React from "react";
import "./App.css";

const App = () => {
  return (
    <div className="main">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo"> <img src="./logo.png" alt="" /></div>
        <button className="btn-primary" onClick={_ => window.location.href = "https://demo.neurom.tech"}>GET STARTED DEMO</button>
      </nav>

      {/* Hero Section */}
      <div className="hero">
        <div className="hero-text">
          <h1>
            Take Charge <br /> of Your Sugar <br /> Levels Today
          </h1>
          <p>
            Enter your insulin points and instantly get your sugar level status.
          </p>
          <button className="btn-primary"  onClick={_ => window.location.href = "https://demo.neurom.tech"}>GET STARTED DEMO</button>
        </div>

        {/* Simplified Side Image Section */}
        <div className="hero-visual">
          <div className="device-container">
            <div className="device-screen">
              <div className="pulse"></div>
              <div className="signal"></div>
            </div>
          </div>

          <div className="holo-info">
            <div className="icon">🧠</div>
            <p>Smart Glucose Tracker</p>
          </div>
        </div>
      </div>
 
    </div>
  );
};

export default App;
