import React from "react";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="landing-page">
      <h1>Welcome to Doctor App</h1>
      <p>Please select your user type:</p>
      <div className="user-options m-4">
        <Link to="/login/admin" className="user-option btn btn-primary m-4">
          Admin{" "}
        </Link>
        <Link to="/login/doctor" className="user-option btn btn-primary m-4">
          Doctor
        </Link>
        <Link to="/login/patient" className="user-option btn btn-primary m-4">
          Patient
        </Link>
      </div>
      <div className="home-link">
        <Link to="/home">Continue as Guest</Link>
      </div>
    </div>
  );
}

export default LandingPage;
