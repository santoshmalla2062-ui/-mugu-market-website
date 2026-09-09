import { initializeApp } from "firebase/app";
import { initializeFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDPQ6YvO2wz9Zkdan9d6GCG-Wq7yvtZhq8",
  authDomain: "mugu-market.firebaseapp.com",
  projectId: "mugu-market",
  storageBucket: "mugu-market.firebasestorage.app",
  messagingSenderId: "975024122673",
  appId: "1:975024122673:web:7bf821149931bbeac49e10",
  measurementId: "G-NVWZP1SVW5"
};

export const app = initializeApp(firebaseConfig);
export const db = initializeFirestore(
  app, 
  { experimentalForceLongPolling: true }
);
export const auth = getAuth(app);
