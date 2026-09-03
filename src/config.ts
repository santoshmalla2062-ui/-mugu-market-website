export const APP_CONFIG = {
  BRAND_NAME: "Mugu Nepal",
  
  // IMPORTANT: APK HOSTING CONFIGURATION
  // Place your real APK at: public/downloads/mugu-local-market.apk
  // Then replace this empty string with: "/downloads/mugu-local-market.apk"
  // Leaving it empty safely disables the download buttons.
  APK_DOWNLOAD_URL: "",
  
  APP_NAME: "Mugu App",
  APP_VERSION: "1.0.0",
  APK_FILE_SIZE: "24.5 MB",
  APK_LAST_UPDATED: "August 2026",
  LAST_UPDATED: "August 2026",
  
  CONTACT: {
    PHONE: "[Your Phone Number]",
    EMAIL: "info@mugumarket.com",
    LOCATION: "Mugu, Nepal"
  },

  // Our Apps & Services Configuration
  // Easy to add new apps here without redesigning
  SERVICES: [
    {
      id: "mugu-local-market",
      name: "Mugu Local Market",
      description: "The official digital marketplace connecting buyers, sellers, and dealers in Mugu.",
      icon: "Store", // Uses Lucide icons (mapped in the component)
      platform: "Android",
      useApkUrl: true, // Tells the UI to use the main APK_DOWNLOAD_URL from above
      websiteUrl: "/download",
      status: "Available" // "Available" | "Coming Soon"
    },
    {
      id: "mugu-wholesale",
      name: "Wholesale & Delivery",
      description: "Bulk purchasing and delivery services across Soru Rural Municipality and other parts of Mugu.",
      icon: "Box", 
      platform: "Service",
      useApkUrl: false, 
      websiteUrl: "",
      status: "Coming Soon" 
    }
  ]
};
