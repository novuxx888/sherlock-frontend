import { Link } from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import { connectWebSocket } from "./ws";

export const WebSocketContext = createContext(null);

export default function App() {
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const socket = connectWebSocket();
    setWs(socket);
  }, []);

  return (
    <WebSocketContext.Provider value={ws}>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 gap-6">
        <h1 className="text-3xl font-bold">🏠 Smart Home Dashboard</h1>

        <div className="flex gap-4">
          <Link
            to="/devices"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            View Devices
          </Link>

          <Link
            to="/dashboard"
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
          >
            Sensor Dashboard
          </Link>
          <Link
            to="/captures"
            className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition"
          >
            Captured Images
          </Link>


          <Link
            to="/pi-control"
            className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition"
          >
            Pi Camera Control
          </Link>
        </div>
      </div>
    </WebSocketContext.Provider>
  );
}
