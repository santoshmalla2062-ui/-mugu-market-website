import { motion } from "motion/react";
import { APP_CONFIG } from "@/config";
import { Download, Store, Smartphone, Globe, ExternalLink, Box, Sparkles, TrendingUp, Truck, CheckCircle2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useSettings } from "@/hooks/useSettings";
import { getDirectApkUrl } from "@/lib/apk";

// Helper to map string icon names to Lucide components safely
const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'Store': return Store;
    case 'Smartphone': return Truck;
    case 'Globe': return TrendingUp;
    default: return Box;
  }
};

const getThemeStyles = (index: number) => {
  const themes = [
    {
      glow: "from-emerald-500/20 via-emerald-500/5 to-transparent",
      border: "border-emerald-500/30 hover:border-emerald-400/60",
      iconBg: "bg-emerald-500/15 border-emerald-500/30 text-emerald-400 group-hover:bg-emerald-500/25",
      badge: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
      btn: "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-lg shadow-emerald-950/50",
      accent: "text-emerald-400"
    },
    {
      glow: "from-blue-500/20 via-blue-500/5 to-transparent",
      border: "border-blue-500/30 hover:border-blue-400/60",
      iconBg: "bg-blue-500/15 border-blue-500/30 text-blue-400 group-hover:bg-blue-500/25",
      badge: "bg-blue-500/15 text-blue-300 border-blue-500/30",
      btn: "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-950/50",
      accent: "text-blue-400"
    },
    {
      glow: "from-amber-500/20 via-amber-500/5 to-transparent",
      border: "border-amber-500/30 hover:border-amber-400/60",
      iconBg: "bg-amber-500/15 border-amber-500/30 text-amber-400 group-hover:bg-amber-500/25",
      badge: "bg-amber-500/15 text-amber-300 border-amber-500/30",
      btn: "bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white shadow-lg shadow-amber-950/50",
      accent: "text-amber-400"
    }
  ];
  return themes[index % themes.length];
};

export function AppsAndServices() {
  const { settings } = useSettings();
  const rawApkUrl = !settings.loading ? settings.apkUrl : APP_CONFIG.APK_DOWNLOAD_URL;
  const apkUrl = getDirectApkUrl(rawApkUrl);
  
  // Core apps always come from config
  const coreApps = APP_CONFIG.SERVICES;
  
  // Dynamic apps from database (App Store)
  let storeApps: any[] = [];
  try {
    if (!settings.loading && settings.apps) {
      const parsedApps = JSON.parse(settings.apps);
      if (Array.isArray(parsedApps) && parsedApps.length > 0) {
        storeApps = parsedApps;
      }
    }
  } catch (e) {
    console.error("Failed to parse dynamic apps", e);
  }

  const renderAppCard = (service: any, index: number) => {
    const IconComponent = getIcon(service.icon);
    const rawDownloadLink = service.customApkUrl ? service.customApkUrl : (service.useGlobalApkUrl !== false ? apkUrl : undefined);
    const downloadLink = rawDownloadLink ? getDirectApkUrl(rawDownloadLink) : undefined;
    const isAvailable = service.status === "Available";
    const theme = getThemeStyles(index);

    return (
       <motion.div
        key={service.id || index}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className={`relative flex flex-col h-full rounded-3xl bg-gradient-to-b from-[#111625] to-[#0c0f1a] border ${theme.border} overflow-hidden group shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1`}
      >
        {/* Glow backdrop inside card */}
        <div className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-br ${theme.glow} rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-500`}></div>

        <div className="p-7 flex-1 flex flex-col relative z-10">
          <div className="flex justify-between items-start mb-6">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border ${theme.iconBg} transition-all duration-300 shadow-inner`}>
              <IconComponent className="w-7 h-7 transition-transform group-hover:scale-110" />
            </div>
            <div className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border flex items-center gap-1.5 ${
              isAvailable ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30' : 'bg-gray-500/10 text-gray-400 border-gray-500/20'
            }`}>
              {isAvailable && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>}
              {isAvailable ? "Active Service" : "Coming Soon"}
            </div>
          </div>
          
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-white transition-colors">{service.name}</h3>
          
          <div className="flex items-center gap-2 mb-4">
            <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${theme.badge}`}>
              {service.platform || "Platform"}
            </span>
            <span className="text-[11px] text-gray-400 font-medium">
              Verified Karnali Network
            </span>
          </div>
          
          <p className="text-sm text-gray-300 leading-relaxed flex-1">
            {service.description}
          </p>
        </div>
        
        <div className="border-t border-white/10 p-5 bg-black/40 backdrop-blur-sm flex flex-col gap-2.5 relative z-10">
          {downloadLink ? (
            <a 
              href={downloadLink}
              target={downloadLink.startsWith("/") ? undefined : "_blank"} 
              rel="noopener noreferrer"
              download="Hamro-Mugu-Market.apk"
              className={`w-full flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-bold transition-all ${theme.btn}`}
            >
              <Download className="w-4 h-4" />
              Download APK (~29 MB)
            </a>
          ) : service.websiteUrl ? (
            <a 
              href={service.websiteUrl}
              className={`w-full flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-bold transition-all ${theme.btn}`}
            >
              <span>Explore Portal</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          ) : (
            <button 
              disabled
              className="w-full flex items-center justify-center gap-2 bg-gray-800/60 text-gray-400 py-3 rounded-2xl text-sm font-semibold cursor-not-allowed border border-white/5"
            >
              <Download className="w-4 h-4" />
              Coming Soon
            </button>
          )}

          {service.websiteUrl && downloadLink && (
            <Link 
              to={service.websiteUrl}
              className="w-full flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white py-2.5 rounded-xl text-xs font-semibold transition-colors border border-white/5"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              More Details & Installation Steps
            </Link>
          )}
        </div>
      </motion.div>
    );
  };

  return (
    <section id="services" className="py-24 relative z-10 border-t border-white/10 bg-[#080b14] overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* SECTION 1: Core Ecosystem (Config Apps) */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500/15 via-blue-500/15 to-purple-500/15 border border-emerald-500/30 rounded-full px-4 py-1.5 mb-5 shadow-inner">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-extrabold text-emerald-300 tracking-wider uppercase">
              Our Digital Ecosystem • डिजिटल सञ्जाल
            </span>
          </div>
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-5xl mb-4 font-display">
            Connecting Karnali to the Nation
          </h2>
          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            मुगु, हुम्ला र जुम्लाका प्राङ्गारिक हिमाली उत्पादन, दैनिक मण्डी दर र सिधा आपूर्ति संजाललाई सहज बनाउने हाम्रो आधिकारिक डिजिटल प्लेटफर्म।
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {coreApps.map((service, index) => renderAppCard(service, index))}
        </div>

        {/* Dynamic apps from database (App Store) */}
        {storeApps.length > 0 && (
          <div className="mt-28">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <div className="inline-flex items-center gap-1.5 bg-purple-500/15 border border-purple-500/30 rounded-full px-4 py-1.5 mb-4">
                <span className="text-[11px] font-bold text-purple-300 tracking-wider uppercase">App Store • थप सेवाहरू</span>
              </div>
              <h3 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-3">
                Mugu App Hub
              </h3>
              <p className="text-base text-gray-300">
                Discover more specialized applications built for the mountain communities of Karnali.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {storeApps.map((service, index) => renderAppCard(service, index))}
            </div>
          </div>
        )}
        
      </div>
    </section>
  );
}
