import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { readFileSync } from "fs";

const config = JSON.parse(readFileSync("./firebase-applet-config.json", "utf-8"));
const app = initializeApp(config);
const db = getFirestore(app); // Connects to default

async function check() {
  try {
    const snapshot = await getDocs(collection(db, "images"));
    console.log("Total images in DEFAULT DB:", snapshot.size);
    process.exit(0);
  } catch (e) {
    console.error("Error connecting to default DB:", e.message);
    process.exit(1);
  }
}
check();
