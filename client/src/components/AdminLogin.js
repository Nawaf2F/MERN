import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Perform admin login logic here (e.g., check credentials)
    // For demonstration purposes, let's just navigate to the admin dashboard on successful login
    if (username === "admin" && password === "admin123") {
      navigate("/home");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="login-page">
      <h1>Admin Login</h1>
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
        Don't have an admin account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}

export default AdminLogin;
