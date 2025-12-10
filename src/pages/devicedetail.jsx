import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc, updateDoc, onSnapshot } from "firebase/firestore";

export default function DeviceDetail() {
  const { id } = useParams();
  const [device, setDevice] = useState(null);

  useEffect(() => {
    const ref = doc(db, "devices", id);
    const unsubscribe = onSnapshot(ref, (snapshot) => {
      if (snapshot.exists()) {
        setDevice({ id: snapshot.id, ...snapshot.data() });
      }
    });
    return () => unsubscribe();
  }, [id]);

  const toggleStatus = async () => {
    if (!device) return;
    const newStatus = device.status === "Online" ? "Offline" : "Online";
    await updateDoc(doc(db, "devices", id), { status: newStatus });
  };

  if (!device) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading device...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center gap-6">
      <Link
        to="/devices"
        className="absolute top-6 left-6 text-blue-600 hover:underline"
      >
        ← Back to Devices
      </Link>

      <div className="bg-white shadow-lg rounded-2xl px-8 py-6 flex flex-col items-center w-96">
        <h1 className="text-2xl font-bold mb-4">{device.name}</h1>

        <p
          className={`text-lg font-semibold ${
            device.status === "Online" ? "text-green-600" : "text-red-600"
          }`}
        >
          Status: {device.status}
        </p>

        <button
          onClick={toggleStatus}
          className={`mt-6 px-6 py-2 rounded-lg text-white font-semibold ${
            device.status === "Online"
              ? "bg-red-500 hover:bg-red-600"
              : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {device.status === "Online" ? "Turn Off" : "Turn On"}
        </button>
      </div>
    </div>
  );
}
