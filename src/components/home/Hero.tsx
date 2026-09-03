import { motion } from "motion/react";
import { Download, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { APP_CONFIG } from "@/config";
import { Button } from "@/components/ui/button";

import bgImage from "@/assets/images/sunset_valley_1788081186609.jpg";
import { useSettings } from "@/hooks/useSettings";

export function Hero() {
  const { settings } = useSettings();
  const apkUrl = !settings.loading ? settings.apkUrl : APP_CONFIG.APK_DOWNLOAD_URL;

  return (
    <section className="relative overflow-hidden min-h-[calc(100vh-80px)] flex items-center pt-16 md:pt-0 pb-16">
      {/* Background Image of Mugu / Nepal Himalayas */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-40 mix-blend-luminosity"
        style={{ backgroundImage: `url(${bgImage})` }}
      ></div>
      {/* Dark gradient overlays for readability and fading into the dark theme */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#0a0a0a]/40 via-[#0a0a0a]/80 to-[#0a0a0a]"></div>
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/50 to-[#0a0a0a]/80"></div>
      
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/20 blur-[120px] rounded-full animate-pulse-slow"></div>
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-emerald-600/15 blur-[100px] rounded-full animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      
      <div className="container relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-xl text-left"
          >
            <div className="inline-block px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-sm">
              Mugu's Local Platform • मुगुको आफ्नै लोकल प्लेटफर्म
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-black leading-[1.1] mb-6 tracking-tight text-white">
              Connecting <br />
              <span className="bg-gradient-to-r from-emerald-400 via-emerald-300 to-blue-400 bg-clip-text text-transparent">
                Mugu
              </span>
              <br />
              <span className="text-3xl md:text-4xl lg:text-5xl text-gray-200 mt-2 block">
                मुगुलाई राजधानीसँग जोडौँ
              </span>
            </h1>
            
            <p className="text-base sm:text-lg text-gray-400 mb-10 max-w-lg leading-relaxed">
              A dedicated marketplace platform for customers, sellers, and dealers in Mugu. <br className="hidden sm:block" />
              <span className="text-gray-300 mt-2 block">Shop local, sell better, and manage wholesale with ease.</span>
            </p>
            
            <div className="flex flex-col gap-6 w-full sm:max-w-md">
              {apkUrl ? (
                <a href={apkUrl} download className="block w-full outline-none">
                  <div className="bg-gradient-to-r from-emerald-600 to-blue-600 rounded-2xl p-[2px] hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_40px_rgba(16,185,129,0.2)] hover:shadow-[0_0_60px_rgba(16,185,129,0.4)] cursor-pointer group">
                    <div className="bg-gray-900 rounded-xl p-4 sm:p-6 flex items-center justify-between overflow-hidden relative h-full w-full">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
                      <div className="flex items-center gap-4 sm:gap-6 relative z-10">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/10 rounded-full flex items-center justify-center shrink-0 border border-white/5">
                          <Download className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-400" />
                        </div>
                        <div className="text-left">
                          <div className="text-white font-black text-xl sm:text-2xl tracking-tight mb-1">DOWNLOAD APK</div>
                          <div className="text-emerald-100/70 text-xs sm:text-sm font-medium">Download Mugu Market for Android</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              ) : (
                <div className="block w-full">
                  <div className="bg-gray-800/80 rounded-2xl p-[2px] shadow-lg group opacity-80 backdrop-blur-sm border border-white/5">
                    <div className="bg-gray-900/50 rounded-xl p-4 sm:p-6 flex items-center justify-between overflow-hidden relative h-full w-full">
                      <div className="flex items-center gap-4 sm:gap-6 relative z-10">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/5 rounded-full flex items-center justify-center shrink-0 border border-white/5">
                          <Download className="w-6 h-6 sm:w-8 sm:h-8 text-gray-500" />
                        </div>
                        <div className="text-left">
                          <div className="text-gray-400 font-black text-xl sm:text-2xl tracking-tight mb-1">APK COMING SOON</div>
                          <div className="text-gray-500 text-xs sm:text-sm font-medium">Download Mugu Market for Android</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="flex items-center justify-between px-2">
                <div className="flex gap-3">
                  <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-full px-3 py-1">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                    <span className="text-[10px] font-bold text-gray-300 tracking-wider">ANDROID</span>
                  </div>
                </div>
                <div className="text-[10px] text-gray-500 text-right">
                  <div>V {APP_CONFIG.APP_VERSION}</div>
                  <div>{APP_CONFIG.APK_FILE_SIZE}</div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center justify-center relative z-10"
          >
            <div className="phone-mockup hidden lg:block border-[6px] border-gray-800 rounded-[2.5rem] bg-gray-900 shadow-2xl overflow-hidden relative w-[300px] h-[600px]">
              {/* Dynamic Island / Notch */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-1/3 h-5 bg-black rounded-b-xl z-20"></div>
              
              <div className="phone-screen w-full h-full bg-white flex flex-col relative z-10">
                <div className="p-5 bg-emerald-600 text-white pt-10">
                  <div className="text-xs opacity-90 font-medium">Welcome to</div>
                  <div className="font-bold text-xl">{APP_CONFIG.APP_NAME}</div>
                </div>
                <div className="flex-1 p-4 overflow-hidden bg-gray-50 flex flex-col">
                  <div className="text-xs font-bold text-gray-500 uppercase mb-3">Popular Products</div>
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="aspect-square bg-gray-200/80 rounded-xl animate-pulse"></div>
                    <div className="aspect-square bg-gray-200/80 rounded-xl animate-pulse" style={{animationDelay: '150ms'}}></div>
                    <div className="aspect-square bg-gray-200/80 rounded-xl animate-pulse" style={{animationDelay: '300ms'}}></div>
                    <div className="aspect-square bg-gray-200/80 rounded-xl animate-pulse" style={{animationDelay: '450ms'}}></div>
                  </div>
                  
                  <div className="mt-auto p-4 border border-emerald-100 rounded-xl flex items-center gap-3 bg-emerald-50">
                    <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <ShoppingBag className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div className="text-sm">
                      <div className="font-bold text-slate-800">Seller QR Scan</div>
                      <div className="text-gray-500 text-xs">Pay via eSewa/Khalti</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
