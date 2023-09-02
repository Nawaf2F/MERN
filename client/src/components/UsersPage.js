import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

function UsersPage() {
  const [ListOfUsers, setListOfUsers] = useState([]);
  const history = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    Axios.get("http://localhost:27017/getUsers").then((response) => {
      console.log(response.data);
      setListOfUsers(response.data);
    });
  }, []);

  const handleDelete = (userId) => {
    Axios.delete(`http://localhost:27017/delete/${userId}`)
      .then((response) => {
        console.log("User deleted:", userId);
        setListOfUsers(ListOfUsers.filter((user) => user._id !== userId));
        history("/users");
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  };

  const handleUpdate = (user) => {
    history(`/update/${user._id}`);
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Doctors Page</h1>
      <div>
        {ListOfUsers.map((user) => (
          <div
            key={user._id}
            className="card m-3"
            style={{ width: 18 + "rem", display: "inline-block" }}
          >
            <div className="card-body">
              <h5 className="card-title">{user.DoctorType}</h5>
              <p className="card-text">Name: {user.username}</p>
              <p className="card-text">ID: {user._id}</p>
              <button
                className="btn btn-danger m-3"
                onClick={() => handleDelete(user._id)}
              >
                Delete
              </button>
              <button
                className="btn btn-primary m-3"
                onClick={() => handleUpdate(user)}
              >
                Update
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UsersPage;
