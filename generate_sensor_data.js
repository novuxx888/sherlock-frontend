import fs from "fs";
import path from "path";

const sensorDir = "./sensor_data";
if (!fs.existsSync(sensorDir)) fs.mkdirSync(sensorDir);

const sensors = {
  temperature: { min: 18, max: 28, unit: "°C" },
  humidity: { min: 40, max: 70, unit: "%" },
  light_level: { min: 200, max: 800, unit: "lx" },
};

// generate timestamps every 5 minutes
function generateTimestamps(count) {
  const now = new Date();
  return Array.from({ length: count }, (_, i) => {
    const t = new Date(now - (count - i) * 5 * 60 * 1000);
    return t.toISOString();
  });
}

function generateCSV(sensor, min, max, count = 10) {
  const timestamps = generateTimestamps(count);
  const rows = ["timestamp,value"];
  for (const ts of timestamps) {
    const val = (Math.random() * (max - min) + min).toFixed(1);
    rows.push(`${ts},${val}`);
  }
  const csv = rows.join("\n");
  const filePath = path.join(sensorDir, `${sensor}.csv`);
  fs.writeFileSync(filePath, csv);
  console.log(`✅ Created ${sensor}.csv`);
}

Object.entries(sensors).forEach(([name, { min, max }]) =>
  generateCSV(name, min, max)
);
