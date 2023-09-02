import React, { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

function Upload() {
  const [patientName, setPatientName] = useState("");
  const [patientID, setPatientID] = useState("");
  const [classification, setClassification] = useState("Injured");
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const history = useNavigate();

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append("image", selectedFile);

    Axios.post("http://localhost:27017/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        const imageURL = response.data.imageURL;

        const reportData = {
          patientName,
          patientID,
          classification,
          description,
          image: imageURL,
        };

        // Send report data to create report route
        Axios.post("http://localhost:27017/create-report", reportData)
          .then((reportResponse) => {
            console.log("Report created:", reportResponse.data);
            // Handle success or display a success message
            history("/reports"); // Redirect to reports page
          })
          .catch((error) => {
            console.error("Error creating report:", error);
          });
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
      });
  };

  return (
    <div className="container">
      <h1 className="mt-5">Upload Image and Create Report</h1>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="form-control mt-3"
      />
      <label className="mt-3">Patient Name:</label>
      <input
        type="text"
        value={patientName}
        onChange={(event) => setPatientName(event.target.value)}
        className="form-control"
      />
      <label className="mt-3">Patient ID:</label>
      <input
        type="text"
        value={patientID}
        onChange={(event) => setPatientID(event.target.value)}
        className="form-control"
      />
      <label className="mt-3">Classification:</label>
      <select
        value={classification}
        onChange={(event) => setClassification(event.target.value)}
        className="form-select"
      >
        <option value="Injured">Injured</option>
        <option value="Non-injured">Non-injured</option>
      </select>
      <label className="mt-3">Description:</label>
      <textarea
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        className="form-control"
      ></textarea>
      <button onClick={handleUpload} className="btn btn-primary mt-3">
        Create Report
      </button>
    </div>
  );
}

export default Upload;
