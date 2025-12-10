import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function SensorPanel({ sensor }) {
  const [data, setData] = useState([]);
  const [showTable, setShowTable] = useState(false);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, `sensors/${sensor}/readings`),
      (snapshot) => {
        const readings = snapshot.docs.map((doc) => doc.data());
        readings.sort(
          (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
        );
        setData(readings);
      }
    );
    return () => unsub();
  }, [sensor]);

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 m-4 w-[420px]">
      <h2 className="text-xl font-bold mb-4 capitalize text-center">
        {sensor}
      </h2>

      {/* Toggle button */}
      <div className="flex justify-center mb-3">
        <button
          onClick={() => setShowTable(!showTable)}
          className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          {showTable ? "Show Chart" : "Show All Data"}
        </button>
      </div>

      {data.length === 0 ? (
        <p className="text-gray-500 italic text-center">No readings yet.</p>
      ) : showTable ? (
        // 📜 Table view
        <div className="max-h-[250px] overflow-y-auto border rounded-lg">
          <table className="w-full text-sm border-collapse">
            <thead className="bg-gray-100 sticky top-0">
              <tr>
                <th className="border p-1">Timestamp</th>
                <th className="border p-1">Value</th>
              </tr>
            </thead>
            <tbody>
              {data.map((r, i) => (
                <tr key={i} className="odd:bg-gray-50">
                  <td className="border p-1">
                    {new Date(r.timestamp).toLocaleString()}
                  </td>
                  <td className="border p-1 text-center">{String(r.value)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        // 📈 Chart view
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="timestamp"
              tickFormatter={(ts) =>
                new Date(ts).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              }
              interval="preserveStartEnd"
            />
            <YAxis />
            <Tooltip
              labelFormatter={(ts) =>
                new Date(ts).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })
              }
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#3b82f6"
              dot={false}
              strokeWidth={2}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default function SensorDashboard() {
  const sensors = ["temperature", "humidity", "light_level"];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-wrap justify-center items-start p-8">
      <h1 className="w-full text-3xl font-bold text-center mb-8">
        📊 Sensor Dashboard
      </h1>

      {sensors.map((s) => (
        <SensorPanel key={s} sensor={s} />
      ))}
    </div>
  );
}
