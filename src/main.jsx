import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Devices from "./pages/devices";
import DeviceDetail from "./pages/devicedetail";
import SensorDashboard from "./pages/sensordashboard";
import PiControl from "./pages/PiControl";  // ⭐ NEW PAGE
import { AuthProvider } from "./AuthContext"; // ⭐ NEW
import "./index.css";
import Captures from "./pages/captures";



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/captures" element={<Captures />} />
          <Route path="/" element={<App />} />
          <Route path="/devices" element={<Devices />} />
          <Route path="/devices/:id" element={<DeviceDetail />} />
          <Route path="/dashboard" element={<SensorDashboard />} />
          <Route path="/pi-control" element={<PiControl />} /> {/* ⭐ NEW ROUTE */}
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
