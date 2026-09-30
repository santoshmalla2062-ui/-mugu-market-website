import { motion } from "motion/react";
import homeScreen from "@/assets/images/hamro_mugu_home_1789571445588.jpg";
import shopScreen from "@/assets/images/hamro_mugu_shop_1789571480606.jpg";
import cartScreen from "@/assets/images/hamro_mugu_cart_1789571502101.jpg";
import { APP_CONFIG } from "@/config";
import { Smartphone, Sparkles, Download, CheckCircle2, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export function Screenshots() {
  const screenshots = [
    { 
      appName: APP_CONFIG.APP_NAME,
      screenType: "होम स्क्रिन (Home)",
      title: "Home & Live Offers", 
      desc: "दैनिक ताजा आगमन, विशेष छुट र अग्र्यानिक सिफारिसहरू",
      image: homeScreen,
      highlight: "ताजा स्याउ र मार्सी अर्डर"
    },
    { 
      appName: APP_CONFIG.APP_NAME,
      screenType: "पसल विवरण (Shops)",
      title: "Verified Shops & Sellers", 
      desc: "मुगु, हुम्ला र जुम्लाका प्रमाणित संकलक र व्यापारी विवरण",
      image: shopScreen,
      highlight: "सिधै पसलेसँग सम्पर्क"
    },
    { 
      appName: APP_CONFIG.APP_NAME,
      screenType: "कार्ट तथा अर्डर (Cart)",
      title: "Cart & Fast Delivery", 
      desc: "झन्झटरहित अर्डर र काठमाडौँ लगायत देशभर सुरक्षित ढुवानी",
      image: cartScreen,
      highlight: "४८-७२ घण्टा डेलिभरी"
    }
  ];

  return (
    <section className="py-24 relative z-10 border-t border-white/10 bg-[#090c16] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-emerald-600/10 via-blue-600/10 to-purple-600/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/15 via-emerald-500/15 to-transparent border border-blue-500/30 rounded-full px-4 py-1.5 mb-4 shadow-inner">
            <Smartphone className="w-4 h-4 text-blue-400" />
            <span className="text-xs font-bold text-blue-300 tracking-wider uppercase">
              {APP_CONFIG.APP_NAME} Mobile Experience
            </span>
          </div>
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-5xl mb-4 font-display">
            एपका मुख्य स्क्रिनहरू
          </h2>
          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            तपाईंको आफ्नै एन्ड्रोइड मोबाइलमा <span className="text-emerald-400 font-bold">{APP_CONFIG.APP_NAME}</span> यसरी स्पष्ट, आधुनिक र सजिलो देखिन्छ।
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-10 max-w-5xl mx-auto">
          {screenshots.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              className="flex flex-col items-center group"
            >
              {/* Phone Mockup Frame with Premium Realistic Bezel */}
              <div className="w-full max-w-[280px] aspect-[9/18.5] bg-[#030508] border-[6px] border-[#222838] group-hover:border-emerald-500/60 rounded-[40px] shadow-[0_15px_45px_rgba(0,0,0,0.6)] group-hover:shadow-[0_20px_50px_rgba(16,185,129,0.2)] overflow-hidden relative flex flex-col items-center justify-center transition-all duration-500">
                
                {/* Simulated Phone Top Punch hole */}
                <div className="absolute top-2.5 w-16 h-4 bg-[#111420] rounded-full z-30 flex items-center justify-center border border-white/10 shadow-inner">
                  <div className="w-2 h-2 rounded-full bg-emerald-400/80"></div>
                </div>

                {/* Floating Brand Bar inside mockup */}
                <div className="absolute top-8 left-0 right-0 z-20 px-3.5 flex items-center justify-between pointer-events-none">
                  <div className="bg-black/85 backdrop-blur-md border border-white/20 px-2 py-0.5 rounded-full flex items-center gap-1.5 shadow-lg">
                    <img src="/mugu-logo.jpg" alt="Logo" className="w-3.5 h-3.5 rounded-full object-cover" />
                    <span className="text-[9px] font-bold text-white tracking-tight">{item.appName}</span>
                  </div>
                  <span className="text-[9px] font-bold bg-emerald-500/30 text-emerald-200 border border-emerald-500/40 px-2 py-0.5 rounded-full backdrop-blur-md">
                    {item.screenType}
                  </span>
                </div>

                {/* Screenshot Image */}
                <img 
                  src={item.image} 
                  alt={`${item.appName} - ${item.title}`}
                  className="absolute inset-0 w-full h-full object-cover z-10 group-hover:scale-105 transition-transform duration-700 bg-gray-950"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/app-mockup.jpg";
                  }}
                />
                
                {/* Screen Glare & bottom gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none z-20"></div>

                {/* Floating bottom micro-pill */}
                <div className="absolute bottom-4 left-3 right-3 z-20 bg-emerald-950/80 border border-emerald-500/30 rounded-xl p-2 backdrop-blur-md text-center pointer-events-none shadow-lg">
                  <span className="text-[10px] font-bold text-emerald-300 flex items-center justify-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    {item.highlight}
                  </span>
                </div>
              </div>

              {/* Screenshot Info Below Phone */}
              <div className="mt-6 text-center flex flex-col items-center">
                <span className="inline-block text-[11px] font-bold text-emerald-300 bg-emerald-500/15 border border-emerald-500/30 px-3 py-1 rounded-full mb-1.5">
                  {item.screenType}
                </span>
                <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-300 mt-1 max-w-[240px] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA below screenshots */}
        <div className="mt-14 text-center">
          <Link
            to="/download"
            className="inline-flex items-center gap-2.5 bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 hover:from-emerald-500 hover:to-blue-500 text-white font-bold px-8 py-3.5 rounded-2xl shadow-xl hover:shadow-emerald-500/25 transition-all text-sm group"
          >
            <Download className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
            <span>एप डाउनलोड गर्नुहोस् (Get Official Android App)</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
