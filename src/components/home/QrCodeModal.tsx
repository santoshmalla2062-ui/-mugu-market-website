import { useState } from "react";
import { QrCode, Smartphone, Sparkles, Download, CheckCircle2 } from "lucide-react";
import { APP_CONFIG } from "@/config";

export function QrCodeModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  // The actual URL to download the APK
  const downloadUrl = "https://mugu-market-website.vercel.app/downloads/mugu-local-market.apk";
  // Standard public high-res QR code generator
  const qrImageSrc = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(downloadUrl)}&bgcolor=ffffff&color=090b13&margin=2`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-[#121624] border border-emerald-500/30 rounded-3xl max-w-sm w-full p-6 text-center shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
        >
          ✕
        </button>

        <div className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-3 py-1 mb-3">
          <QrCode className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-[11px] font-bold text-emerald-300 uppercase tracking-wider">Mobile QR Download</span>
        </div>

        <h3 className="text-lg font-bold text-white mb-1">
          मोबाइलको क्यामेराले स्क्यान गर्नुहोस्
        </h3>
        <p className="text-xs text-gray-400 mb-4">
          आफ्नो मोबाइलको क्यामेरा वा QR Scanner ले स्क्यान गरी सिधै १-क्लिकमा डाउनलोड गर्नुहोस्।
        </p>

        {/* QR Code Container */}
        <div className="bg-white p-3.5 rounded-2xl inline-block shadow-xl border-4 border-emerald-500/30 mb-4">
          <img 
            src={qrImageSrc} 
            alt="Mugu Market App Download QR" 
            className="w-48 h-48 sm:w-56 sm:h-56 object-contain rounded-lg"
          />
        </div>

        <div className="flex items-center justify-center gap-2 text-xs text-emerald-300 font-medium bg-emerald-950/40 py-2 px-3 rounded-xl border border-emerald-500/20">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Hamro-Mugu-Market.apk ({APP_CONFIG.APK_FILE_SIZE})</span>
        </div>

        <button
          onClick={onClose}
          className="w-full mt-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold transition-colors"
        >
          बन्द गर्नुहोस् (Close)
        </button>
      </div>
    </div>
  );
}
