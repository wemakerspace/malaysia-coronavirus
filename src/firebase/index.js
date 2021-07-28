import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAubIu1CY5qT8Vb_T9JGpFo7T1vcXTlJPM",
  databaseURL:
    "https://malaysia-coronavirus-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "malaysia-coronavirus",
  appId: "1:419005448887:web:9a77c5d9a46ff1b70a4332",
  measurementId: "G-KKMMVH5QYW",
};

initializeApp(firebaseConfig);

export const analytics = getAnalytics();
export const database = getDatabase();
