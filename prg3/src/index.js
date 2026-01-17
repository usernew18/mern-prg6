import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Resume_Header from "./Resume_Create/Resume_Header";
import Resume_Person_Info from "./Resume_Create/Resume_Person_Info";
import Education from "./Resume_Create/Education";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Resume_Header />
    <Resume_Person_Info />
    <Education />
  </React.StrictMode>
);

