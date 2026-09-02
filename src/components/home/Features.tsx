import { motion } from "motion/react";
import { ShoppingCart, Store, QrCode, Truck, ShieldCheck, CreditCard, Bell, WifiOff } from "lucide-react";

const features = [
  {
    title: "Customer Shopping",
    description: "Browse locally available products, compare prices, and order directly from shops in Mugu.",
    icon: ShoppingCart,
  },
  {
    title: "Seller Shops",
    description: "Easily set up a digital storefront. Add products, manage inventory, and reach more customers.",
    icon: Store,
  },
  {
    title: "Digital Payments",
    description: "Integrated eSewa and Khalti payment QR codes for quick, cashless transactions.",
    icon: QrCode,
  },
  {
    title: "Wholesale Dealers",
    description: "Dedicated portal for dealers to buy and sell goods in bulk quantities efficiently.",
    icon: Truck,
  },
  {
    title: "Cart & Checkout",
    description: "Smooth shopping experience with an easy-to-use cart and secure checkout process.",
    icon: CreditCard,
  },
  {
    title: "Order Management",
    description: "Track your orders in real-time. Sellers can easily manage fulfillment.",
    icon: ShieldCheck,
  },
  {
    title: "Push Notifications",
    description: "Stay updated with instant alerts on orders, messages, and special offers.",
    icon: Bell,
  },
  {
    title: "Offline-first",
    description: "App works smoothly even with unstable internet connections, saving your data locally.",
    icon: WifiOff,
  },
];

export function Features() {
  return (
    <section id="features" className="py-20 relative z-10 border-t border-white/5">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-4">
            Powerful Features
          </h2>
          <p className="text-lg text-gray-400">
            Mugu Local Market provides everything you need to buy and sell, designed specifically for our local community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="apk-card p-6 group hover:bg-white/5 hover:border-blue-500/30 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-500/20 group-hover:text-blue-300 transition-all duration-300">
                <feature.icon className="w-6 h-6 text-blue-400 group-hover:text-blue-300" />
              </div>
              <h3 className="text-lg font-bold text-white mb-3 group-hover:text-blue-100 transition-colors">{feature.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
