WHERE TO PLACE THE REAL APK:
Place your actual Android APK file here:
public/downloads/mugu-local-market.apk

WHERE TO CONFIGURE:
After placing the APK file, open `src/config.ts` and set:
APK_DOWNLOAD_URL: "/downloads/mugu-local-market.apk"

You can also update:
APP_VERSION: "1.0.0"
APK_FILE_SIZE: "24.5 MB"
APK_LAST_UPDATED: "August 2026"

DO NOT commit your actual keystore or signing keys to this repository. This directory is only for distributing the compiled, signed public APK.
