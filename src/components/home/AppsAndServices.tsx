import { motion } from "motion/react";
import { APP_CONFIG } from "@/config";
import { Download, Store, Smartphone, Globe, ExternalLink, Box } from "lucide-react";
import { Link } from "react-router-dom";

// Helper to map string icon names to Lucide components safely
const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'Store': return Store;
    case 'Smartphone': return Smartphone;
    case 'Globe': return Globe;
    default: return Box;
  }
};

export function AppsAndServices() {
  return (
    <section id="services" className="py-20 relative z-10 border-t border-white/5 bg-black/10">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1.5 mb-6">
            <span className="text-[10px] font-bold text-blue-400 tracking-wider uppercase">Our Ecosystem</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-4">
            Apps & Services
          </h2>
          <p className="text-lg text-gray-400">
            Explore the digital solutions provided by {APP_CONFIG.BRAND_NAME}.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {APP_CONFIG.SERVICES.map((service, index) => {
            const IconComponent = getIcon(service.icon);
            const downloadLink = service.useApkUrl ? APP_CONFIG.APK_DOWNLOAD_URL : undefined;
            const isAvailable = service.status === "Available";

            return (
               <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="apk-card flex flex-col h-full overflow-hidden group hover:border-blue-500/30 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] transition-all duration-300"
              >
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover:scale-110 group-hover:bg-blue-500/20 group-hover:border-blue-500/30 transition-all duration-300">
                      <IconComponent className="w-7 h-7 text-blue-400 group-hover:text-blue-300" />
                    </div>
                    <div className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                      isAvailable ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-gray-500/10 text-gray-400 border-gray-500/20'
                    }`}>
                      {isAvailable ? "Available" : "Coming Soon"}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-2">{service.name}</h3>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xs font-semibold text-gray-300 bg-white/10 px-2 py-0.5 rounded">
                      {service.platform}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-400 leading-relaxed flex-1">
                    {service.description}
                  </p>
                </div>
                
                <div className="border-t border-white/5 p-4 bg-black/20 flex flex-col gap-3">
                  {downloadLink ? (
                    <a 
                      href={downloadLink}
                      download
                      className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white py-2.5 rounded-xl text-sm font-semibold transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      Download APK
                    </a>
                  ) : service.useApkUrl ? (
                    <button 
                      disabled
                      className="w-full flex items-center justify-center gap-2 bg-gray-800 text-gray-500 py-2.5 rounded-xl text-sm font-semibold cursor-not-allowed"
                    >
                      <Download className="w-4 h-4" />
                      APK Coming Soon
                    </button>
                  ) : null}

                  {service.websiteUrl && (
                    <Link 
                      to={service.websiteUrl}
                      className="w-full flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-gray-300 py-2.5 rounded-xl text-sm font-medium transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      View Details
                    </Link>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
