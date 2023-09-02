import React from "react";
import { Link, useLocation } from "react-router-dom";
import Axios from "axios";

function Navbar() {
  const location = useLocation();

  const shouldRenderNavbar =
    location.pathname !== "/" &&
    location.pathname !== "/login/admin" &&
    location.pathname !== "/login/doctor";

  const handleLogout = () => {
    // Call the backend logout route
    Axios.get("http://localhost:27017/logout")
      .then((response) => {
        console.log(response.data);
        localStorage.removeItem("token");
        // Redirect the user to the login page
        window.location.href = "/"; // Replace with your login page route
      })
      .catch((error) => {
        console.error("Error logging out:", error);
      });
  };
  return shouldRenderNavbar ? (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="navbar-brand">Doctor</li>
        <li className="nav-item">
          <Link to="/home" className="nav-link">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/register" className="nav-link">
            Register
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/users" className="nav-link">
            Users
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/upload" className="nav-link">
            Upload
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/reports" className="nav-link">
            Reports
          </Link>
        </li>
      </ul>
      <form className="d-flex">
        <button
          className="nav-link p-1 m-2 btn btn-outline-danger"
          onClick={handleLogout}
        >
          Logout
        </button>
      </form>
    </nav>
  ) : null;
}

export default Navbar;
