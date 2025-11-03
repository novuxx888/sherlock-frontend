import fs from "fs";
import path from "path";
import csv from "csv-parser";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBhplgibYL_Z1kp13LmQ8WlgV9P8fwi2GM",
  authDomain: "smart-home-dashboard-dce4b.firebaseapp.com",
  projectId: "smart-home-dashboard-dce4b",
  storageBucket: "smart-home-dashboard-dce4b.firebasestorage.app",
  messagingSenderId: "105674375975",
  appId: "1:105674375975:web:2efb5be2e701716fab1f02"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const sensorFolder = "./sensor_data";

// helper to upload one CSV
async function uploadSensorData(sensorName, filePath) {
  const rows = [];
  return new Promise((resolve) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => rows.push(data))
      .on("end", async () => {
        console.log(`Uploading ${sensorName} data...`);
        for (const row of rows) {
          const id = row.timestamp.replace(/[:.]/g, "-");
          const docRef = doc(db, `sensors/${sensorName}/readings`, id);
          await setDoc(docRef, {
            value:
              row.value === "true"
                ? true
                : row.value === "false"
                ? false
                : Number(row.value),
            timestamp: row.timestamp,
          });
        }
        console.log(`✅ ${sensorName} uploaded (${rows.length} rows).`);
        resolve();
      });
  });
}

async function main() {
  const files = fs.readdirSync(sensorFolder);
  for (const file of files) {
    if (file.endsWith(".csv")) {
      const sensorName = path.basename(file, ".csv");
      await uploadSensorData(sensorName, path.join(sensorFolder, file));
    }
  }
  console.log("🎉 All sensor CSVs uploaded!");
}

main();
