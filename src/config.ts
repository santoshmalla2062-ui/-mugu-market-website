export const APP_CONFIG = {
  BRAND_NAME: "Hamro Mugu",
  
  // Real 29.1MB APK hosted directly on the site for instant, seamless 1-click download:
  APK_DOWNLOAD_URL: "/downloads/mugu-local-market.apk",
  // Official Google Drive URLs:
  GOOGLE_DRIVE_APK_URL: "https://drive.google.com/file/d/1FR7tOXqowIVWJRAxTWHyDaMaopu0yyga/view?usp=sharing",
  GOOGLE_DRIVE_DIRECT_URL: "https://drive.usercontent.google.com/download?id=1FR7tOXqowIVWJRAxTWHyDaMaopu0yyga&export=download&confirm=t",
  
  APP_NAME: "Hamro Mugu App",
  APP_VERSION: "1.0.0",
  APK_FILE_SIZE: "29.1 MB",
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
      name: "Hamro Mugu Market App",
      description: "The official digital marketplace connecting buyers, sellers, and dealers across Mugu, Humla, and Jumla.",
      icon: "Store",
      platform: "Android APK",
      customApkUrl: "",
      useGlobalApkUrl: true,
      websiteUrl: "/download",
      status: "Available"
    },
    {
      id: "karnali-mandi-index",
      name: "Karnali Mandi Rate Index",
      description: "Live daily price index and verified market rates for organic Marsi rice, Talcha apples, Jumli beans, and Rara honey.",
      icon: "Globe",
      platform: "Live Market Portal",
      customApkUrl: "",
      useGlobalApkUrl: false,
      websiteUrl: "/#market-index",
      status: "Available"
    },
    {
      id: "mountain-logistics-pipeline",
      name: "Highland Supply & Logistics",
      description: "Direct farm-to-doorstep transportation network delivering authentic Himalayan harvest to Kathmandu, Pokhara, and major cities.",
      icon: "Smartphone",
      platform: "Supply Network",
      customApkUrl: "",
      useGlobalApkUrl: false,
      websiteUrl: "/#contact-hub",
      status: "Available"
    }
  ]
};
