import { initializeApp } from "firebase/app";
import { initializeFirestore } from "firebase/firestore";
import fs from "fs";

const configStr = fs.readFileSync("./firebase-applet-config.json", "utf8");
const firebaseConfig = JSON.parse(configStr);

const app = initializeApp(firebaseConfig);
const db = initializeFirestore(app, {
  experimentalForceLongPolling: true
}, firebaseConfig.firestoreDatabaseId);

console.log("DB Initialized:", db.type);
