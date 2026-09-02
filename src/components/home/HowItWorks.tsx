import { motion } from "motion/react";
import { Users, Store, Truck, ShieldCheck, ArrowRight, ArrowDown } from "lucide-react";

const steps = [
  { 
    id: 1,
    icon: Users, 
    title: "Customer", 
    desc: "Browses and orders local products" 
  },
  { 
    id: 2,
    icon: Store, 
    title: "Seller / Shop", 
    desc: "Receives orders and sells directly" 
  },
  { 
    id: 3,
    icon: Truck, 
    title: "Dealer", 
    desc: "Supplies wholesale goods to sellers" 
  },
  { 
    id: 4,
    icon: ShieldCheck, 
    title: "Admin", 
    desc: "Manages the marketplace ecosystem" 
  }
];

export function HowItWorks() {
  return (
    <section className="py-12 relative z-10 border-t border-white/5 bg-black/20">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full px-3 py-1 mb-4">
            <span className="text-[10px] font-bold text-blue-400 tracking-wider uppercase">The Flow</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl mb-3">
            How Mugu Local Market Works
          </h2>
          <p className="text-sm text-gray-400">
            A seamless digital supply chain connecting everyone from the buyer to the wholesaler.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 relative max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div key={step.id} className="flex flex-col lg:flex-row items-center gap-4 w-full lg:w-auto flex-1">
              {/* Step Card */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="apk-card p-4 flex flex-col items-center text-center w-full relative group hover:border-blue-500/30 transition-colors z-10"
              >
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-3 group-hover:bg-blue-500/20 group-hover:text-blue-400 transition-all group-hover:scale-110">
                  <step.icon className="w-5 h-5 text-gray-300 group-hover:text-blue-400 transition-colors" />
                </div>
                <h3 className="text-base font-bold text-white mb-1.5">{step.title}</h3>
                <p className="text-xs text-gray-400">{step.desc}</p>
                <div className="absolute top-3 left-3 text-[10px] font-black text-white/10 text-2xl">
                  {step.id}
                </div>
              </motion.div>

              {/* Arrow Indicator */}
              {index < steps.length - 1 && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
                  className="flex items-center justify-center shrink-0 lg:w-6 text-blue-500/40"
                >
                  <ArrowRight className="w-5 h-5 hidden lg:block" />
                  <ArrowDown className="w-5 h-5 block lg:hidden" />
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
