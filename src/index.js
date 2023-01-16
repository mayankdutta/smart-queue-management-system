import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { PatientProvider } from "./contexts/patient.context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <PatientProvider>
    <App />
  </PatientProvider>
);
