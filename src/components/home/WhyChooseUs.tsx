import { motion } from "motion/react";
import { Package, Store, Boxes, Smartphone, ShoppingCart } from "lucide-react";

const reasons = [
  {
    icon: Package,
    title: "Mugu का स्थानीय उत्पादन",
    desc: "Promoting and distributing authentic local products directly from Mugu to the consumers.",
  },
  {
    icon: Store,
    title: "Local Sellers Empowered",
    desc: "Providing a modern digital storefront for small businesses to reach a wider audience effortlessly.",
  },
  {
    icon: Boxes,
    title: "Wholesale Opportunity",
    desc: "Direct and efficient connections between bulk dealers and shop owners for seamless B2B trading.",
  },
  {
    icon: Smartphone,
    title: "Digital Marketplace",
    desc: "Bringing traditional commerce into the digital age with a unified, transparent platform.",
  },
  {
    icon: ShoppingCart,
    title: "Customer-Friendly Ordering",
    desc: "An easy, fast, and secure purchasing process designed specifically for a smooth mobile experience.",
  }
];

export function WhyChooseUs() {
  return (
    <section className="py-20 relative z-10 border-t border-white/5 bg-black/10">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-12 lg:gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-1 lg:sticky lg:top-32"
          >
            <div className="inline-flex items-center gap-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1.5 mb-6">
              <span className="text-[10px] font-bold text-blue-400 tracking-wider uppercase">Why Choose Us</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-4">
              Why Mugu Local Market?
            </h2>
            <p className="text-lg text-gray-400 mb-8 leading-relaxed">
              We are more than just an app. We are building a digital infrastructure that uplifts the entire local economy, making commerce accessible and profitable for everyone in Mugu.
            </p>
          </motion.div>

          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-6">
            {reasons.map((reason, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`apk-card p-6 flex flex-col group hover:bg-white/5 hover:border-blue-500/30 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] transition-all duration-300 ${
                  index === reasons.length - 1 && reasons.length % 2 !== 0 ? 'sm:col-span-2' : ''
                }`}
              >
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-500/20 group-hover:text-blue-300 transition-all duration-300">
                  <reason.icon className="w-6 h-6 text-blue-400 group-hover:text-blue-300" />
                </div>
                <h3 className="text-lg font-bold text-white mb-3 group-hover:text-blue-100 transition-colors">{reason.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {reason.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
