import React from "react";
import ReactDOM from "react-dom/client";
import AppRoutes from "./routes"; // ✅ Import Routes
import "./styles.css"; // ✅ Ensure CSS loads

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppRoutes />
  </React.StrictMode>
);
