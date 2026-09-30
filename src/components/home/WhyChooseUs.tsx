import { motion } from "motion/react";
import { Package, Store, Boxes, Smartphone, ShoppingCart, ShieldCheck, Sparkles, CheckCircle, Award, Compass, HeartHandshake } from "lucide-react";

const stats = [
  { value: "२,९००+", label: "मिटर हिमाली उचाइ", sub: "Pure Alpine Air" },
  { value: "१००%", label: "प्राङ्गारिक प्रमाणीकरण", sub: "Zero Chemicals" },
  { value: "०%", label: "बिचौलिया कमिसन", sub: "Direct to Grower" },
  { value: "४८-७२", label: "घण्टामा देशव्यापी ढुवानी", sub: "Swift Logistics" },
];

const reasons = [
  {
    icon: Package,
    color: "from-emerald-500/20 via-emerald-500/5 to-transparent",
    border: "border-emerald-500/30 hover:border-emerald-400/60",
    iconColor: "text-emerald-400 bg-emerald-500/15 border-emerald-500/30",
    tag: "१००% शुद्ध",
    title: "Pure Mountain Harvest (शुद्ध उत्पादन)",
    desc: "Organic red rice (मार्सी), high-altitude apples, mountain beans, ghee, and Rara honey grown naturally with Himalayan glacier waters.",
  },
  {
    icon: HeartHandshake,
    color: "from-amber-500/20 via-amber-500/5 to-transparent",
    border: "border-amber-500/30 hover:border-amber-400/60",
    iconColor: "text-amber-400 bg-amber-500/15 border-amber-500/30",
    tag: "किसानको सम्मान",
    title: "Empowering Local Farmers (किसानलाई मूल्य)",
    desc: "Direct market connection eliminating middlemen so mountain growers receive fair, dignified earnings directly in their hands.",
  },
  {
    icon: Boxes,
    color: "from-blue-500/20 via-blue-500/5 to-transparent",
    border: "border-blue-500/30 hover:border-blue-400/60",
    iconColor: "text-blue-400 bg-blue-500/15 border-blue-500/30",
    tag: "थोक आपूर्ति",
    title: "Wholesale & Bulk Supply (थोक आपूर्ति)",
    desc: "Streamlined bulk supply pipelines for organic shops, grocery marts, and premium restaurants across Kathmandu, Pokhara, and major cities.",
  },
  {
    icon: Smartphone,
    color: "from-purple-500/20 via-purple-500/5 to-transparent",
    border: "border-purple-500/30 hover:border-purple-400/60",
    iconColor: "text-purple-400 bg-purple-500/15 border-purple-500/30",
    tag: "पारदर्शिता",
    title: "Digital Transparency (पारदर्शी दर)",
    desc: "Real-time mandi prices, trader directory, and verified contacts directly accessible via our Android app and web portal.",
  },
  {
    icon: ShoppingCart,
    color: "from-teal-500/20 via-teal-500/5 to-transparent",
    border: "border-teal-500/30 hover:border-teal-400/60",
    iconColor: "text-teal-400 bg-teal-500/15 border-teal-500/30",
    tag: "घरदैलो पुग्ने",
    title: "Nationwide Doorstep Delivery (देशभर डेलिभरी)",
    desc: "Enjoy authentic, untainted Himalayan gifts delivered straight to your home or store anywhere across Nepal.",
  },
  {
    icon: ShieldCheck,
    color: "from-rose-500/20 via-rose-500/5 to-transparent",
    border: "border-rose-500/30 hover:border-rose-400/60",
    iconColor: "text-rose-400 bg-rose-500/15 border-rose-500/30",
    tag: "गुणस्तर ग्यारेन्टी",
    title: "Certified Origin Guarantee (उत्पत्ति ग्यारेन्टी)",
    desc: "Every batch is sourced strictly from verified organic clusters in Gamgadhi, Talcha, Soru, Sinja, and Simikot.",
  }
];

export function WhyChooseUs() {
  return (
    <section className="py-24 relative z-10 border-t border-white/10 bg-gradient-to-b from-[#0a0d18] via-[#0e1222] to-[#0a0d18] overflow-hidden">
      {/* Background glow highlights */}
      <div className="absolute top-1/3 right-1/4 w-[450px] h-[450px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Highlight Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="p-5 rounded-2xl bg-[#121626]/80 border border-white/10 text-center relative overflow-hidden backdrop-blur-md group hover:border-emerald-500/40 transition-all shadow-lg"
            >
              <div className="text-2xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-blue-300 mb-1">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm font-bold text-white mb-0.5">
                {stat.label}
              </div>
              <div className="text-[10px] text-gray-400 font-medium">
                {stat.sub}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-10 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-4 lg:sticky lg:top-28 text-left"
          >
            <div className="inline-flex items-center gap-2 bg-emerald-500/15 border border-emerald-500/30 rounded-full px-4 py-1.5 mb-5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-xs font-bold text-emerald-300 tracking-wider uppercase">
                Our Mountain Mission
              </span>
            </div>
            
            <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl mb-5 leading-tight font-display">
              Why Karnali Mountain Produce?
              <span className="block text-xl sm:text-2xl text-emerald-400 font-bold mt-2">
                कर्णालीको अग्र्यानिक पहिचान
              </span>
            </h2>
            
            <p className="text-base text-gray-300 mb-6 leading-relaxed">
              हाम्रो उद्देश्य कर्णालीका मुगु, हुम्ला र जुम्लालाई देशभरका भान्सा र मार्टहरूसँग सिधै जोड्नु हो — जहाँ बिचौलिया बिना किसानले उचित मूल्य पाउँछन् र उपभोक्ताले १००% शुद्ध अग्र्यानिक हिमाली स्वाद उपभोग गर्न पाउँछन्।
            </p>

            <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-950/40 via-blue-950/20 to-transparent border border-emerald-500/25 mb-6">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
                <CheckCircle className="w-4 h-4" />
                १००% प्राङ्गारिक प्रत्याभूति
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">
                मुगुको हिमालबाट संकलित मार्सी, सिमी, स्याउ, घिउ र मह कुनै पनि मिसावटविहीन शुद्ध रूपमा डेलिभरी गरिन्छ।
              </p>
            </div>
          </motion.div>

          <div className="lg:col-span-8 grid sm:grid-cols-2 gap-5">
            {reasons.map((reason, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className={`p-6 rounded-3xl bg-gradient-to-br ${reason.color} bg-[#111626]/70 border ${reason.border} flex flex-col justify-between text-left relative overflow-hidden group shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1`}
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center ${reason.iconColor} shadow-inner group-hover:scale-110 transition-transform`}>
                      <reason.icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-black/40 border border-white/10 text-gray-300">
                      {reason.tag}
                    </span>
                  </div>
                  
                  <h3 className="text-base font-bold text-white mb-2 group-hover:text-white transition-colors">
                    {reason.title}
                  </h3>
                  
                  <p className="text-sm text-gray-300/90 leading-relaxed">
                    {reason.desc}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-white/10 flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>प्रमाणित प्रणाली (Verified System)</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
