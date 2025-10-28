import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBhplgibYL_Z1kp13LmQ8WlgV9P8fwi2GM",
  authDomain: "smart-home-dashboard-dce4b.firebaseapp.com",
  projectId: "smart-home-dashboard-dce4b",
  storageBucket: "smart-home-dashboard-dce4b.firebasestorage.app",
  messagingSenderId: "105674375975",
  appId: "1:105674375975:web:2efb5be2e701716fab1f02"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
