const DEFAULT_APK = "/downloads/mugu-local-market.apk";

/**
 * Helper to ensure APK URLs trigger a direct one-click download.
 * If a Google Drive link is provided, it automatically converts it
 * to the direct download URL with instant download confirmation.
 * Prevents image/logo files from ever being served as the APK.
 */
export function getDirectApkUrl(rawUrl: string): string {
  if (!rawUrl) return DEFAULT_APK;
  const trimmed = rawUrl.trim();

  // If the URL accidentally points to an image file or website logo, fallback to genuine APK
  if (
    /\.(jpg|jpeg|png|webp|gif|svg|ico)(\?.*)?$/i.test(trimmed) ||
    trimmed.includes("mugu-logo") ||
    trimmed.includes("favicon") ||
    trimmed.includes("icon-")
  ) {
    return DEFAULT_APK;
  }

  // Match Google Drive file ID
  const driveMatch =
    trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) ||
    trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/);

  if (driveMatch && driveMatch[1]) {
    const fileId = driveMatch[1];
    // This direct URL prompts immediate APK file download on Android/Chrome
    return `https://drive.usercontent.google.com/download?id=${fileId}&export=download&confirm=t`;
  }

  return trimmed;
}
