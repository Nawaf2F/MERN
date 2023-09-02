import React, { useState, useEffect } from "react";
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
    <div className="container">
      <h1>Reports</h1>
      <ul>
        {reports.map((report) => (
          <li key={report._id}>
            <h3>{report.title}</h3>
            <p>{report.description}</p>
            <img src={report.imageUrl} alt={report.title} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Reports;
