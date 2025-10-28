import { Link } from "react-router-dom";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 gap-6">
      <h1 className="text-3xl font-bold">🏠 Smart Home Dashboard</h1>
      <Link
        to="/devices"
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
      >
        View Devices
      </Link>
    </div>
  );
}
