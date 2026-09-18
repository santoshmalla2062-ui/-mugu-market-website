import { useState, useEffect } from "react";
import { Download, Smartphone, X, Check } from "lucide-react";
import { APP_CONFIG } from "@/config";

export function PwaInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      // Check if user dismissed previously in this session
      if (!sessionStorage.getItem("pwa_dismissed")) {
        setShowPrompt(true);
      }
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setShowPrompt(false);
    }
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    setIsDismissed(true);
    sessionStorage.setItem("pwa_dismissed", "true");
  };

  if (!showPrompt || isDismissed) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 bg-[#121626] border border-emerald-500/40 rounded-3xl p-4 sm:p-5 shadow-[0_10px_40px_rgba(0,0,0,0.8)] backdrop-blur-xl animate-in slide-in-from-bottom duration-300">
      <button 
        onClick={handleDismiss}
        className="absolute top-3 right-3 text-gray-400 hover:text-white p-1"
        aria-label="Dismiss"
      >
        <X className="w-4 h-4" />
      </button>

      <div className="flex items-start gap-3.5">
        <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center shrink-0">
          <Smartphone className="w-6 h-6 text-emerald-400" />
        </div>
        <div className="text-left flex-1">
          <h4 className="text-sm font-bold text-white">
            मोबाइलबारमा एप राख्नुहोस् (Add to Home Screen)
          </h4>
          <p className="text-xs text-gray-300 mt-1">
            बिना डाउनलोड पनि {APP_CONFIG.BRAND_NAME} लाई मोबाइल एप जसरी छिटो खोल्न सक्नुहुन्छ।
          </p>
          <div className="flex items-center gap-2 mt-3">
            <button
              onClick={handleInstall}
              className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>इन्स्टल गर्नुहोस् (Install)</span>
            </button>
            <button
              onClick={handleDismiss}
              className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 text-xs transition-colors"
            >
              पछि गरौँला
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
