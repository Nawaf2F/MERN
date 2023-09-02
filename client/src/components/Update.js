import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function Update() {
  const { userId } = useParams(); // Access the dynamic parameter from the URL
  const [user, setUser] = useState(null); // State to hold the user data
  const [doctorType, setDoctorType] = useState(""); // State to hold doctor type
  const history = useNavigate();

  useEffect(() => {
    // Fetch the user data by user ID from the server
    Axios.get(`http://localhost:27017/update/${userId}`)
      .then((response) => {
        setUser(response.data); // Set the fetched user data to the state
        setDoctorType(response.data.doctorType); // Set the doctor type from user data
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
      });
  }, [userId]); // Execute the effect whenever userId changes

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    Axios.put(`http://localhost:27017/update/${userId}`, {
      username: user.username,
      doctorType: doctorType,
    })
      .then((response) => {
        console.log("User updated:", response.data);
        history("/users");
      })
      .catch((error) => {
        console.error("Error updating user:", error);
      });
  };

  return (
    <div className="container mt-4">
      <h1>Update User</h1>
      {user && (
        <form onSubmit={handleUpdateSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
            />
          </div>
          <div className="form-group">
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
              <option value="General Practitioners">
                General Practitioners
              </option>
              <option value="Trainees">Trainees</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary">
            {" "}
            Update{" "}
          </button>
        </form>
      )}
    </div>
  );
}

export default Update;
