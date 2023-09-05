import React, { useEffect, useState } from "react";
import Axios from "axios";

function Reports() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:27017/getReports")
      .then((response) => {
        console.log("Reports:", response.data);
        setReports(response.data);
      })
      .catch((error) => {
        console.error("Error fetching reports:", error);
      });
  }, []);

  return (
    <div className="container mt-3">
      <h1 className="mb-3">Reports</h1>
      <div className="row">
        {reports.map((report) => (
          <div className="col-md-4" key={report._id}>
            <div className="card">
              <svg
                className="bd-placeholder-img card-img-top"
                width="50%"
                height="160"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="Placeholder: Image cap"
                preserveAspectRatio="xMidYMid slice"
                focusable="false"
              >
                <title>Placeholder</title>
                <rect width="100%" height="100%" fill="#868e96"></rect>
                <image
                  href={`http://localhost:27017/${report.image}`}
                  width="100%"
                  height="100%"
                  preserveAspectRatio="xMidYMid slice"
                />
              </svg>
              <div className="card-body " style={{ textAlign: "left" }}>
                <h5 className="card-title">{report.patientName}</h5>
                <p className="card-text">
                  <strong>Patient ID:</strong> {report.patientID}
                </p>
                <p className="card-text">
                  <strong>Classification:</strong> {report.classification}
                </p>
                <p className="card-text">
                  <strong>Description:</strong> {report.description}
                </p>
                {report.doctor && (
                  <p className="card-text">
                    <strong>Doctor ID:</strong> {report.doctor}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Reports;
