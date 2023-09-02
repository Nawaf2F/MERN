import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";

function DoctorLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Doctor login:", username, password);

    // Perform doctor login using Axios
    Axios.post(
      "http://localhost:27017/doctor/login",
      JSON.stringify({ username: username, password: password }),
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    )
      .then((response) => {
        const token = response.data.token;
        console.log("Doctor logged in:", token);

        // Store the token in LocalStorage
        localStorage.setItem("token", token);

        // Redirect to doctor dashboard or perform further actions
        navigate("/home"); // Replace with actual doctor dashboard route
      })
      .catch((error) => {
        console.error("Error logging in:", error);
        alert("Invalid credentials");
      });
  };

  return (
    <div className="login-page">
      <h1>Doctor Login</h1>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have a doctor account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}

export default DoctorLogin;
