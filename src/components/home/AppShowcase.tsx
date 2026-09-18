import { motion } from "motion/react";
import herbsImg from "@/assets/images/mugu_herbs_handicrafts_1789571753112.jpg";
import { 
  Store, 
  ShoppingCart, 
  Sparkles, 
  TrendingUp, 
  ShieldCheck, 
  Truck, 
  MapPin, 
  Heart,
  ChevronRight,
  Package,
  Layers,
  ArrowDownToLine
} from "lucide-react";
import { Link } from "react-router-dom";

export function AppShowcase() {
  const categories = [
    { name: "Mugu Apples (मुगुको स्याउ)", tag: "Fresh Harvest", icon: "🍎", count: "12+ Varieties", image: "/extracted_apples.jpg" },
    { name: "Organic Walnuts (ओखर)", tag: "100% Organic", icon: "🥜", count: "Local Harvest", image: "/extracted_walnuts.jpg" },
    { name: "Rara Tourism & Hotels", tag: "Travel & Stay", icon: "🏔️", count: "Hotels & Guides", image: "/extracted_rara.jpg" },
    { name: "Local Handicrafts & Herbs", tag: "High Altitude", icon: "🌿", count: "Pure Himalayan", image: herbsImg },
  ];

  const appModules = [
    {
      title: "होम तथा अफरहरू (Home & Deals)",
      subtitle: "HomeScreen",
      desc: "मुगुका स्थानीय उत्पादनहरू, दैनिक विशेष छुट, र सिधै किसान तथा पसलबाट अर्डर गर्ने सुविधा।",
      badge: "Customer Mode",
      color: "from-emerald-500/20 to-emerald-500/5",
      borderColor: "border-emerald-500/30",
      textColor: "text-emerald-400"
    },
    {
      title: "स्थानिय पसल सूची (Shops & Vendors)",
      subtitle: "ShopsScreen & ShopDetail",
      desc: "गमगढी बजार र मुगुका विभिन्न वडाका पसलहरूको पूरा विवरण, फोन नम्बर र लोकेसन।",
      badge: "Verified Shops",
      color: "from-blue-500/20 to-blue-500/5",
      borderColor: "border-blue-500/30",
      textColor: "text-blue-400"
    },
    {
      title: "कार्ट र तत्काल अर्डर (Cart & Checkout)",
      subtitle: "CartScreen & CheckoutDialog",
      desc: "झन्झट बिना सामान कार्टमा राख्ने, डेलिभरी ठेगाना छान्ने र सुरक्षित भुक्तानी गर्ने सुविधा।",
      badge: "Fast Checkout",
      color: "from-purple-500/20 to-purple-500/5",
      borderColor: "border-purple-500/30",
      textColor: "text-purple-400"
    },
    {
      title: "डिलर तथा होलसेल प्यानल (Dealer Portal)",
      subtitle: "DealerDashboardScreen",
      desc: "ठूलो मात्रामा सामान खरिद-बिक्री गर्ने थोक व्यापारी र डिलरहरूको लागि विशेष व्यवस्थापन प्रणाली।",
      badge: "B2B Wholesale",
      color: "from-amber-500/20 to-amber-500/5",
      borderColor: "border-amber-500/30",
      textColor: "text-amber-400"
    },
    {
      title: "पसले ड्यासबोर्ड (Seller Dashboard)",
      subtitle: "SellerDashboardScreen",
      desc: "आफ्नो पसलका उत्पादनहरू थप्ने, मूल्य तोक्ने र आएका नयाँ अर्डरहरू सजिलै व्यवस्थापन गर्ने।",
      badge: "Merchant Hub",
      color: "from-rose-500/20 to-rose-500/5",
      borderColor: "border-rose-500/30",
      textColor: "text-rose-400"
    },
    {
      title: "ग्राहक खाता र विशलिस्ट (My Account)",
      subtitle: "CustomerAccount & Wishlist",
      desc: "अर्डर ट्र्याकिङ, मनपरेका सामान सुरक्षित राख्ने विशलिस्ट र व्यक्तिगत प्रोफाइल।",
      badge: "User Account",
      color: "from-cyan-500/20 to-cyan-500/5",
      borderColor: "border-cyan-500/30",
      textColor: "text-cyan-400"
    }
  ];

  return (
    <section className="py-20 relative z-10 border-t border-white/5 bg-gradient-to-b from-[#0a0c14] via-[#0d111d] to-[#0a0c14]">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-1.5 mb-4">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-bold text-emerald-400 tracking-wider uppercase">Inside The Official Android App</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight">
            App Features & Ecosystem
            <span className="block text-2xl sm:text-3xl text-emerald-400 font-semibold mt-2">
              एपका मुख्य विशेषताहरू
            </span>
          </h2>
          <p className="text-base sm:text-lg text-gray-400 leading-relaxed">
            Built specifically for consumers, local producers, and wholesale supply chains across Nepal.
          </p>
        </div>

        {/* Featured Organic Produce from APK */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <Package className="w-5 h-5 text-emerald-400" />
                मुगुका मुख्य उत्पादन तथा सेवाहरू
              </h3>
              <p className="text-sm text-gray-400 mt-1">एपमा सिधै उपलब्ध र अर्डर गर्न सकिने</p>
            </div>
            <Link 
              to="/download" 
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              सबै एपमा हेर्नुहोस् <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="group relative overflow-hidden rounded-2xl bg-gray-900/60 border border-white/10 hover:border-emerald-500/40 transition-all duration-300 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)] flex flex-col"
              >
                <div className="h-44 w-full relative overflow-hidden bg-gray-950">
                  <img 
                    src={cat.image} 
                    alt={cat.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/mugu-logo.jpg";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/20 to-transparent"></div>
                  <span className="absolute top-3 left-3 bg-emerald-500/90 backdrop-blur-md text-gray-950 text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-md">
                    {cat.tag}
                  </span>
                  <span className="absolute top-3 right-3 text-xl bg-black/40 backdrop-blur-md p-1.5 rounded-xl border border-white/10">
                    {cat.icon}
                  </span>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-white text-base group-hover:text-emerald-300 transition-colors">
                      {cat.name}
                    </h4>
                    <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                      मुगु जिल्ला, कर्णाली प्रदेश
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                    <span className="text-gray-400">{cat.count}</span>
                    <span className="text-emerald-400 font-semibold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                      Order Available <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 6 Core Screen Modules from Kotlin APK */}
        <div>
          <div className="text-center mb-10">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              एपका मुख्य मोड्युल तथा स्क्रिनहरू
            </h3>
            <p className="text-sm text-gray-400">Hamro Mugu Market APK भित्र समावेश गरिएका फिचरहरू</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {appModules.map((module, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className={`p-6 rounded-2xl bg-gradient-to-br ${module.color} border ${module.borderColor} relative overflow-hidden backdrop-blur-sm group hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full bg-black/40 border border-white/10 ${module.textColor}`}>
                      {module.badge}
                    </span>
                    <span className="text-[10px] text-gray-400 font-mono">
                      {module.subtitle}
                    </span>
                  </div>

                  <h4 className="text-lg font-bold text-white mb-2 group-hover:text-white transition-colors">
                    {module.title}
                  </h4>
                  <p className="text-sm text-gray-300/80 leading-relaxed mb-6">
                    {module.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-gray-400">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    सुरक्षित र प्रमाणित
                  </span>
                  <span className="text-white/60 group-hover:text-white transition-colors flex items-center gap-0.5 font-medium">
                    उपलब्ध <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Quick App Install CTA */}
        <div className="mt-16 bg-gradient-to-r from-emerald-900/40 via-blue-900/40 to-gray-900/60 border border-emerald-500/20 rounded-3xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-3xl shrink-0">
              📱
            </div>
            <div>
              <h4 className="text-xl sm:text-2xl font-bold text-white mb-1">
                यी सबै फिचरहरू आफ्नै मोबाइलमा चलाउनुहोस्
              </h4>
              <p className="text-sm text-gray-300">
                Hamro Mugu Market Android App आजै डाउनलोड गरी मुगुको बजारसँग जोडिनुहोस्।
              </p>
            </div>
          </div>
          <Link
            to="/download"
            className="shrink-0 inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-400 hover:to-blue-500 text-white font-bold px-7 py-3.5 rounded-xl shadow-lg hover:shadow-emerald-500/25 transition-all text-sm"
          >
            <ArrowDownToLine className="w-4 h-4" />
            DOWNLOAD APP NOW
          </Link>
        </div>

      </div>
    </section>
  );
}
