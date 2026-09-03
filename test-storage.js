import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadString, getDownloadURL } from "firebase/storage";
import { readFileSync } from "fs";

const config = JSON.parse(readFileSync("./firebase-applet-config.json", "utf-8"));
const app = initializeApp(config);
const storage = getStorage(app);

async function check() {
  try {
    const storageRef = ref(storage, 'test.txt');
    await uploadString(storageRef, 'Hello Storage');
    const url = await getDownloadURL(storageRef);
    console.log("Success! URL:", url);
    process.exit(0);
  } catch (e) {
    console.error("Error:", e.message);
    process.exit(1);
  }
}
check();
