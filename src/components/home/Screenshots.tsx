import { motion } from "motion/react";
import { Image as ImageIcon } from "lucide-react";

export function Screenshots() {
  // Using placeholders for now. Replace with real app screenshot paths when available.
  const placeholders = [
    { title: "Home Screen", desc: "Browse local products" },
    { title: "Shop Profile", desc: "View seller details" },
    { title: "Cart", desc: "Manage your items" },
    { title: "Payment QR", desc: "Scan and pay easily" },
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {placeholders.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center animate-float"
              style={{ animationDelay: `${index * 0.5}s` }}
            >
              <div className="w-full aspect-[9/19] bg-[#000] border-[6px] border-gray-800 rounded-[36px] shadow-[0_0_40px_rgba(59,130,246,0.15)] overflow-hidden relative flex flex-col items-center justify-center text-gray-500 group transition-all duration-500 hover:border-blue-500/30 hover:shadow-[0_0_50px_rgba(59,130,246,0.3)]">
                <ImageIcon className="w-10 h-10 mb-2 opacity-50 group-hover:scale-110 transition-transform text-blue-400" />
                <span className="text-sm font-medium">Placeholder</span>
                
                {/* Simulated screen glare */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 pointer-events-none"></div>
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
