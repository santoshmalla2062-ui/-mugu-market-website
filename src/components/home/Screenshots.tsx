import { motion } from "motion/react";
import homeScreen from "@/assets/images/hamro_mugu_home_1789571445588.jpg";
import shopScreen from "@/assets/images/hamro_mugu_shop_1789571480606.jpg";
import cartScreen from "@/assets/images/hamro_mugu_cart_1789571502101.jpg";
import { APP_CONFIG } from "@/config";
import { Smartphone } from "lucide-react";

export function Screenshots() {
  const screenshots = [
    { 
      appName: APP_CONFIG.APP_NAME,
      screenType: "होम स्क्रिन (Home)",
      title: "Home & Offers", 
      desc: "स्थानीय उत्पादन तथा ताजा छुटहरू",
      image: homeScreen
    },
    { 
      appName: APP_CONFIG.APP_NAME,
      screenType: "पसल विवरण (Shops)",
      title: "Shop Details", 
      desc: "मुगुका स्थानीय व्यापारी र विक्रेता सूची",
      image: shopScreen
    },
    { 
      appName: APP_CONFIG.APP_NAME,
      screenType: "कार्ट तथा अर्डर (Cart)",
      title: "Cart & Checkout", 
      desc: "सहज खरिद र सुरक्षित डेलिभरी",
      image: cartScreen
    }
  ];

  return (
    <section className="py-20 relative z-10 border-t border-white/5 bg-white/5">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1.5 mb-4">
            <Smartphone className="w-4 h-4 text-blue-400" />
            <span className="text-xs font-bold text-blue-400 tracking-wider uppercase">{APP_CONFIG.APP_NAME} Interface</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-4">
            {APP_CONFIG.APP_NAME} का स्क्रिनहरू
          </h2>
          <p className="text-lg text-gray-400">
            तपाईंको आफ्नै मोबाइलमा <span className="text-white font-medium">{APP_CONFIG.APP_NAME}</span> यसरी देखिन्छ।
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {screenshots.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center animate-float"
              style={{ animationDelay: `${index * 0.5}s` }}
            >
              {/* Phone Mockup Frame with App Header Badge */}
              <div className="w-full aspect-[9/19] bg-[#000] border-[6px] border-gray-800 rounded-[36px] shadow-[0_0_40px_rgba(59,130,246,0.15)] overflow-hidden relative flex flex-col items-center justify-center group transition-all duration-500 hover:border-emerald-500/50 hover:shadow-[0_0_50px_rgba(16,185,129,0.3)]">
                
                {/* Simulated Phone Top Notch / Speaker */}
                <div className="absolute top-2 w-20 h-4 bg-gray-900 rounded-full z-30 flex items-center justify-center border border-white/10">
                  <div className="w-2 h-2 rounded-full bg-emerald-500/60"></div>
                </div>

                {/* Floating In-App Brand Overlay Badge on Top */}
                <div className="absolute top-8 left-0 right-0 z-20 px-4 flex items-center justify-between pointer-events-none">
                  <div className="bg-black/80 backdrop-blur-md border border-white/15 px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-lg">
                    <img src="/mugu-logo.jpg" alt="Logo" className="w-3.5 h-3.5 rounded-full object-cover" />
                    <span className="text-[10px] font-bold text-white tracking-tight">{item.appName}</span>
                  </div>
                  <span className="text-[9px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                    {item.screenType}
                  </span>
                </div>

                {/* Fallback text if image not found */}
                <span className="absolute text-sm font-semibold text-gray-600 z-0">Image Pending</span>
                
                <img 
                  src={item.image} 
                  alt={`${item.appName} - ${item.title}`}
                  className="absolute inset-0 w-full h-full object-cover z-10 group-hover:scale-105 transition-transform duration-700 bg-gray-900"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.opacity = '0';
                  }}
                />
                
                {/* Simulated screen glare */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 pointer-events-none z-20"></div>
              </div>

              {/* Screenshot Info Below Phone */}
              <div className="mt-5 text-center flex flex-col items-center">
                <span className="inline-block text-[11px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full mb-1">
                  {item.appName}
                </span>
                <h3 className="text-base font-bold text-white">{item.title}</h3>
                <p className="text-xs text-gray-400 mt-1">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
