import React, { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [doctorType, setDoctorType] = useState("Radiologist"); // Initial value, change as needed
  const history = useNavigate();

  const register = () => {
    Axios.post("http://localhost:27017/register", {
      username: name,
      password,
      doctorType,
    }).then((response) => {
      console.log(name);
      console.log(response);
      history("/users");
    });
  };

  return (
    <div>
      <div className="container mt-4">
        <h1 className="mb-3">Register Page</h1>

        <label htmlFor="username" className="form-label">
          Username
        </label>
        <input
          className="form-control m-3"
          id="username"
          type="text"
          name="username"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />

        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          className="form-control m-3"
          id="password"
          type="password"
          name="password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />

        <label htmlFor="doctorType" className="form-label">
          Doctor Type
        </label>
        <select
          className="form-control m-3"
          id="doctorType"
          name="doctorType"
          value={doctorType}
          onChange={(event) => {
            setDoctorType(event.target.value);
          }}
        >
          <option value="Radiologist">Radiologist</option>
          <option value="Orthopedic Surgeons">Orthopedic Surgeons</option>
          <option value="Emergency Physicians">Emergency Physicians</option>
          <option value="General Practitioners">General Practitioners</option>
          <option value="Trainees">Trainees</option>
        </select>

        <button className="btn btn-primary" onClick={register}>
          Register
        </button>
      </div>
    </div>
  );
}

export default Register;
