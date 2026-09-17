/**
 * Helper to ensure APK URLs trigger a direct one-click download.
 * If a Google Drive link is provided, it automatically converts it
 * to the direct download URL with instant download confirmation.
 */
export function getDirectApkUrl(rawUrl: string): string {
  if (!rawUrl) return "";
  const trimmed = rawUrl.trim();

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
