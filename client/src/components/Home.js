import React, { useEffect, useState } from "react";
import Axios from "axios";

function Home() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Send a GET request to the /home route with the JWT token
    Axios.get("http://localhost:27017/home", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Include the JWT token here
      },
    })
      .then((response) => {
        setMessage(response.data.message);
      })
      .catch((error) => {
        console.error("Error fetching home data:", error);
      });
  }, []); // The empty dependency array ensures this effect runs once

  return (
    <div>
      <h1>Home Page</h1>
      <p>{message}</p>
      {/* Your home page content */}
    </div>
  );
}

export default Home;
