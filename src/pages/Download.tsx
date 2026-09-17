import { APP_CONFIG } from "@/config";
import { Button } from "@/components/ui/button";
import { Download as DownloadIcon, Smartphone, CheckCircle, Shield, FileBox, Image as ImageIcon } from "lucide-react";
import { motion } from "motion/react";
import { useSettings } from "@/hooks/useSettings";
import { getDirectApkUrl } from "@/lib/apk";

export default function Download() {
  const { settings } = useSettings();
  const rawApkUrl = !settings.loading ? settings.apkUrl : APP_CONFIG.APK_DOWNLOAD_URL;
  const apkUrl = getDirectApkUrl(rawApkUrl);

  return (
    <div className="flex flex-col min-h-[calc(100vh-80px)] pt-10 pb-20 relative">
      <div className="mountain-peak"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 blur-[100px] -z-10 rounded-full"></div>

      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <div className="apk-card overflow-hidden p-6 sm:p-10 mb-8">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-6">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-xs font-bold text-gray-300 tracking-wider">ANDROID</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black mb-3 text-white tracking-tight uppercase">
                {APP_CONFIG.APP_NAME}
              </h1>
              <p className="text-blue-400 font-semibold tracking-wide uppercase">Official Android App</p>
            </div>

            <div className="mt-8 mb-12">
              {apkUrl ? (
                <a 
                  href={apkUrl} 
                  target={apkUrl.startsWith("/") ? undefined : "_blank"} 
                  rel="noopener noreferrer" 
                  download="Hamro-Mugu-Market.apk"
                  className="block w-full outline-none"
                >
                  <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-3xl p-[2px] hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_50px_rgba(59,130,246,0.3)] hover:shadow-[0_0_80px_rgba(59,130,246,0.5)] cursor-pointer group">
                    <div className="bg-blue-600 rounded-[22px] p-8 sm:p-10 flex flex-col items-center justify-center overflow-hidden relative w-full text-center">
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
                      <div className="relative z-10 flex flex-col items-center gap-5">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 rounded-full flex items-center justify-center mb-1 shadow-inner">
                          <DownloadIcon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                        </div>
                        <div className="flex flex-col gap-2">
                          <div className="text-white font-black text-2xl sm:text-3xl tracking-wide">DOWNLOAD APP</div>
                          <div className="text-blue-100 text-sm font-medium">Fast, direct download from the official Mugu Nepal website.</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              ) : (
                <div className="block w-full">
                  <div className="bg-gray-800 rounded-3xl p-[2px] shadow-lg group opacity-80">
                    <div className="bg-gray-900 rounded-[22px] p-8 sm:p-10 flex flex-col items-center justify-center overflow-hidden relative w-full text-center">
                      <div className="relative z-10 flex flex-col items-center gap-5">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/5 rounded-full flex items-center justify-center mb-1">
                          <DownloadIcon className="w-8 h-8 sm:w-10 sm:h-10 text-gray-500" />
                        </div>
                        <div className="flex flex-col gap-2">
                          <div className="text-gray-400 font-black text-2xl sm:text-3xl tracking-wide">APP COMING SOON</div>
                          <div className="text-gray-500 text-sm font-medium">Fast, direct download from the official Mugu Nepal website.</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-white/5 rounded-2xl border border-white/5 p-6 mb-8">
              <ul className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                <li className="flex flex-col gap-1">
                  <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Version</span>
                  <span className="font-semibold text-white text-sm">{APP_CONFIG.APP_VERSION}</span>
                </li>
                <li className="flex flex-col gap-1 border-l border-white/5">
                  <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Size</span>
                  <span className="font-semibold text-white text-sm">{APP_CONFIG.APK_FILE_SIZE}</span>
                </li>
                <li className="flex flex-col gap-1 sm:border-l border-white/5">
                  <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Platform</span>
                  <span className="font-semibold text-white text-sm">Android</span>
                </li>
                <li className="flex flex-col gap-1 border-l border-white/5">
                  <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Updated</span>
                  <span className="font-semibold text-white text-sm">{APP_CONFIG.APK_LAST_UPDATED}</span>
                </li>
              </ul>
            </div>
            
            {/* Logo Download Section */}
            <div className="border-t border-white/10 pt-8 mt-4">
               <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-emerald-400" />
                Nepali / Mugu Themed App Logos
              </h3>
              <div className="grid grid-cols-1 gap-4">
                <a 
                  href="/mugu-logo-rara.jpg" 
                  download="mugu_logo_rara_lake.jpg"
                  className="flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-3 transition-colors group"
                >
                  <img src="/mugu-logo-rara.jpg" alt="Rara Lake Logo" className="w-14 h-14 rounded-lg object-cover bg-black" />
                  <div className="flex-1 text-left">
                    <div className="text-white text-sm font-semibold">Rara Lake & Organic Basket</div>
                    <div className="text-gray-400 text-xs">Deep forest green with abstract local produce.</div>
                  </div>
                  <DownloadIcon className="w-5 h-5 text-gray-400 group-hover:text-emerald-400 transition-colors" />
                </a>
                
                <a 
                  href="/mugu-logo-nepal.jpg" 
                  download="mugu_logo_nepal_map.jpg"
                  className="flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-3 transition-colors group"
                >
                  <img src="/mugu-logo-nepal.jpg" alt="Nepal Map Logo" className="w-14 h-14 rounded-lg object-cover bg-black" />
                  <div className="flex-1 text-left">
                    <div className="text-white text-sm font-semibold">Nepal Map & Sunrise</div>
                    <div className="text-gray-400 text-xs">Rhododendron red, Himalayan blue, and organic green.</div>
                  </div>
                  <DownloadIcon className="w-5 h-5 text-gray-400 group-hover:text-emerald-400 transition-colors" />
                </a>

                <a 
                  href="/mugu-logo-namaste.jpg" 
                  download="mugu_logo_namaste.jpg"
                  className="flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-3 transition-colors group"
                >
                  <img src="/mugu-logo-namaste.jpg" alt="Namaste Logo" className="w-14 h-14 rounded-lg object-cover bg-black" />
                  <div className="flex-1 text-left">
                    <div className="text-white text-sm font-semibold">Traditional Namaste & Karnali Apple</div>
                    <div className="text-gray-400 text-xs">Crimson, golden yellow, and earthy brown tones.</div>
                  </div>
                  <DownloadIcon className="w-5 h-5 text-gray-400 group-hover:text-emerald-400 transition-colors" />
                </a>
              </div>
            </div>

          </div>

          <div className="apk-card p-6 sm:p-10">
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-400" />
              Installation Instructions
            </h2>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold">1</div>
                <div>
                  <h3 className="font-medium text-white mt-1">Download App</h3>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold">2</div>
                <div>
                  <h3 className="font-medium text-white mt-1">Open downloaded file</h3>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold">3</div>
                <div>
                  <h3 className="font-medium text-white mt-1">Allow installation from the browser/file manager if Android asks</h3>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold">4</div>
                <div>
                  <h3 className="font-medium text-white mt-1">Install</h3>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold flex-col relative">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-medium text-white mt-1">Open Mugu Local Market</h3>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
