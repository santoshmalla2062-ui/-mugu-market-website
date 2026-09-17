export const APP_CONFIG = {
  BRAND_NAME: "Hamro Mugu",
  
  // Real 29MB APK hosted directly on the site for instant, seamless 1-click download:
  APK_DOWNLOAD_URL: "/downloads/mugu-local-market.apk",
  // Backup Google Drive URL: "https://drive.google.com/file/d/1dNb_kILfs4UyiiIJnoFvQyD_Sv4CQ40V/view?usp=sharing",
  
  APP_NAME: "Hamro Mugu App",
  APP_VERSION: "1.0.0",
  APK_FILE_SIZE: "29 MB",
  APK_LAST_UPDATED: "September 2026",
  LAST_UPDATED: "September 2026",
  
  CONTACT: {
    PHONE: "[Your Phone Number]",
    EMAIL: "info@hamromugu.com",
    LOCATION: "Mugu, Nepal"
  },

  // Our Apps & Services Configuration
  // Easy to add new apps here without redesigning
  SERVICES: [
    {
      id: "hamro-mugu-market",
      name: "Hamro Mugu Market",
      description: "The official digital marketplace connecting buyers, sellers, and dealers in Mugu.",
      icon: "Store", // Uses Lucide icons (mapped in the component)
      platform: "Android",
      customApkUrl: "", // Add Google Drive/Direct link for THIS specific app here
      useGlobalApkUrl: true, // Tells the UI to use the main APK_DOWNLOAD_URL from above if custom is empty
      websiteUrl: "/download",
      status: "Available" // "Available" | "Coming Soon"
    }
  ]
};
