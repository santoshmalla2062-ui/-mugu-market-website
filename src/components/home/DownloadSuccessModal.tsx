import { CheckCircle2, ShieldCheck, Download, X } from "lucide-react";

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDownloadAgain: () => void;
}

export function DownloadSuccessModal({ isOpen, onClose, onDownloadAgain }: DownloadModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-[#121624] border border-emerald-500/30 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative text-left overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow Accent */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -mr-10 -mt-10"></div>
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Status Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-6 h-6 text-emerald-400" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white tracking-tight">Download Started!</h3>
            <p className="text-xs text-emerald-400 font-medium">Downloading Hamro-Mugu-Market.apk (~29 MB)</p>
          </div>
        </div>

        <p className="text-gray-300 text-sm mb-5 leading-relaxed">
          Your direct APK download is in progress. Check your phone's <strong>Notification Bar</strong> or <strong>Downloads Folder</strong>, then follow these quick steps:
        </p>

        {/* 2-Step Install Guide */}
        <div className="space-y-3 mb-6">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 flex items-start gap-3">
            <div className="w-7 h-7 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
              1
            </div>
            <div>
              <div className="text-white text-sm font-semibold">Tap to Open & Select "Install"</div>
              <p className="text-gray-400 text-xs mt-0.5">
                Once the file finishes downloading, tap it from your notifications or Files app.
              </p>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 flex items-start gap-3">
            <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
              2
            </div>
            <div>
              <div className="text-white text-sm font-semibold">Confirm "Allow" or "Install Anyway"</div>
              <p className="text-gray-400 text-xs mt-0.5">
                As this is a direct official APK outside Play Store, tap <span className="text-emerald-400 font-semibold">"Install Anyway"</span> when prompted.
              </p>
            </div>
          </div>
        </div>

        {/* Security Assurance Badge */}
        <div className="flex items-center gap-2.5 bg-emerald-950/40 border border-emerald-500/20 rounded-xl p-3 mb-6">
          <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs text-emerald-200">
            <strong>100% Verified & Clean:</strong> Official verified application with zero malware or risk.
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-colors text-center"
          >
            Got It
          </button>
          <button
            onClick={onDownloadAgain}
            className="py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-medium transition-colors text-center border border-white/10 flex items-center justify-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" /> Didn't start? Download Again
          </button>
        </div>
      </div>
    </div>
  );
}
