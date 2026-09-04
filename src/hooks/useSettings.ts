import { useState, useEffect } from "react";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { APP_CONFIG } from "@/config";

export function useSettings() {
  const [settings, setSettings] = useState({
    apkUrl: APP_CONFIG.APK_DOWNLOAD_URL,
    phone: APP_CONFIG.CONTACT.PHONE,
    email: APP_CONFIG.CONTACT.EMAIL,
    location: APP_CONFIG.CONTACT.LOCATION,
    apps: "[]",
    tickerMessages: "[]",
    loading: true
  });

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "settings", "site_info"), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setSettings({
          apkUrl: data.apkUrl !== undefined ? data.apkUrl : APP_CONFIG.APK_DOWNLOAD_URL,
          phone: data.phone !== undefined ? data.phone : APP_CONFIG.CONTACT.PHONE,
          email: data.email !== undefined ? data.email : APP_CONFIG.CONTACT.EMAIL,
          location: data.location !== undefined ? data.location : APP_CONFIG.CONTACT.LOCATION,
          apps: data.apps !== undefined ? data.apps : "[]",
          tickerMessages: data.tickerMessages !== undefined ? data.tickerMessages : "[]",
          loading: false
        });
      } else {
        setSettings(s => ({ ...s, loading: false }));
      }
    }, (error) => {
      console.error("Error fetching settings:", error);
      setSettings(s => ({ ...s, loading: false }));
    });
    return () => unsub();
  }, []);

  const updateSettings = async (newSettings: any) => {
    await setDoc(doc(db, "settings", "site_info"), newSettings, { merge: true });
  };

  return { settings, updateSettings };
}
