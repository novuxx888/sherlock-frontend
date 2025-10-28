import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import { collection, addDoc, deleteDoc, doc, onSnapshot } from "firebase/firestore";

export default function Devices() {
  const [devices, setDevices] = useState([]);
  const [newDevice, setNewDevice] = useState("");

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "devices"), (snap) => {
      setDevices(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
    return () => unsub();
  }, []);

  const addDevice = async () => {
    if (!newDevice.trim()) return;
    await addDoc(collection(db, "devices"), { name: newDevice, status: "Offline" });
    setNewDevice("");
  };

  const removeDevice = async (id) => {
    await deleteDoc(doc(db, "devices", id));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-3xl font-bold mb-6">Connected Devices</h1>

      {/* Add device input (on devices page only) */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Add new device..."
          value={newDevice}
          onChange={(e) => setNewDevice(e.target.value)}
          className="border rounded-lg px-3 py-1"
        />
        <button
          onClick={addDevice}
          className="px-3 py-1 bg-blue-500 text-white rounded-lg"
        >
          Add
        </button>
      </div>

      <ul className="flex flex-col gap-3">
        {devices.map((d) => (
          <li
            key={d.id}
            className="bg-white shadow-md rounded-xl px-6 py-3 flex items-center justify-between w-96 hover:bg-gray-50 transition"
          >
            <Link
              to={`/devices/${d.id}`}
              className="flex-1"
            >
              {/* name ␣ status on one line with a visible spacer */}
              <span className="font-semibold">
                {d.name}
                <span className="mx-2">{'\u00A0'}</span>
                <span className={d.status === "Online" ? "text-green-600" : "text-red-600"}>
                  {d.status}
                </span>
              </span>
            </Link>

            <button
              onClick={() => removeDevice(d.id)}
              className="text-red-500 hover:text-red-700 text-sm ml-3"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
