import { motion } from "motion/react";
import homeScreen from "@/assets/images/mugu_app_home_phone_1788524672232.jpg";
import shopScreen from "@/assets/images/mugu_app_shop_phone_1788524688951.jpg";
import cartScreen from "@/assets/images/mugu_app_cart_phone_1788524704513.jpg";

export function Screenshots() {
  const screenshots = [
    { 
      title: "Home & Offers", 
      desc: "Browse local Mugu products",
      image: homeScreen
    },
    { 
      title: "Shop Details", 
      desc: "Order directly from local vendors",
      image: shopScreen
    },
    { 
      title: "Cart & Checkout", 
      desc: "Easy delivery and digital payments",
      image: cartScreen
    }
  ];

  return (
    <section className="py-20 relative z-10 border-t border-white/5 bg-white/5">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-4">
            App Interface
          </h2>
          <p className="text-lg text-gray-400">
            A clean, modern, and easy-to-use application designed for everyone.
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
              <div className="w-full aspect-[9/19] bg-[#000] border-[6px] border-gray-800 rounded-[36px] shadow-[0_0_40px_rgba(59,130,246,0.15)] overflow-hidden relative flex flex-col items-center justify-center group transition-all duration-500 hover:border-emerald-500/50 hover:shadow-[0_0_50px_rgba(16,185,129,0.3)]">
                
                {/* Fallback text if image not found */}
                <span className="absolute text-sm font-semibold text-gray-600 z-0">Image Pending</span>
                
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover z-10 group-hover:scale-105 transition-transform duration-700 bg-gray-900"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.opacity = '0';
                  }}
                />
                
                {/* Simulated screen glare */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 pointer-events-none z-20"></div>
              </div>
              <h3 className="mt-6 text-base font-semibold text-white">{item.title}</h3>
              <p className="text-xs text-gray-400 text-center mt-1">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
