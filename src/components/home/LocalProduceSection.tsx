import { useMemo } from "react";
import { motion } from "motion/react";
import { 
  TrendingUp, 
  Activity, 
  Truck, 
  Store, 
  Clock, 
  Scale, 
  MapPin, 
  ShieldCheck, 
  Users,
  Flame,
  ArrowUpRight,
  Phone,
  MessageCircle,
  CheckCircle2,
  PhoneCall
} from "lucide-react";
import { useSettings } from "@/hooks/useSettings";
import { DEFAULT_MARKET_PRODUCE, MarketProduceItem, TraderContact } from "@/types/market";

export function LocalProduceSection() {
  const { settings } = useSettings();
  const defaultAdminPhone = !settings.loading && settings.phone ? settings.phone : "९८४८१२३४५६";
  const showSellerContacts = settings.showSellerContacts !== false;
  const useAdminPhoneForSellers = Boolean(settings.useAdminPhoneForSellers);

  // Merge custom market data from admin if available
  const produceList: MarketProduceItem[] = useMemo(() => {
    if (!settings.loading && settings.marketProduceJson) {
      try {
        const parsed = JSON.parse(settings.marketProduceJson);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      } catch (e) {
        console.error("Failed to parse custom marketProduceJson:", e);
      }
    }
    return DEFAULT_MARKET_PRODUCE;
  }, [settings.loading, settings.marketProduceJson]);

  const handleSellerWhatsApp = (seller: TraderContact, productName: string) => {
    const targetPhone = useAdminPhoneForSellers ? defaultAdminPhone : seller.phone;
    const rawNumber = targetPhone.replace(/[^0-9]/g, "");
    const recipientName = useAdminPhoneForSellers ? "मुगु बजार व्यवस्थापक" : seller.name;
    const msg = `नमस्ते ${recipientName} ज्यू! म हाम्रो मुगु बजार वेबसाइटबाट "${productName}" (बिक्रेता: ${seller.name}) सम्बन्धी सोधपुछ तथा खरिद गर्न सम्पर्क गर्दैछु।`;
    window.open(`https://wa.me/977${rawNumber}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <section className="py-20 relative z-10 border-t border-white/5 bg-[#090b13] overflow-hidden">
      {/* Background Ambience Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-600/10 blur-[150px] pointer-events-none rounded-full"></div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header with Live Ticker Badge */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
          <div className="max-w-3xl text-left">
            <div className="inline-flex items-center gap-2 bg-emerald-500/15 border border-emerald-500/30 rounded-full px-4 py-1.5 mb-4 backdrop-blur-md">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="text-xs font-bold text-emerald-300 tracking-wider uppercase flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5" /> High-Altitude Harvest • Direct Market Link
              </span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              Mountain Produce & Direct Traders Directory
            </h2>
            <p className="text-gray-300 text-sm sm:text-base mt-3 leading-relaxed">
              Order authentic Himalayan produce directly from verified farmers and cooperatives in Mugu & Humla with nationwide delivery to Kathmandu, Pokhara, and major urban centers.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="px-4 py-2 rounded-2xl bg-white/5 border border-white/10 text-xs text-emerald-300 flex items-center gap-2 font-mono">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              Direct Contacts Available • Verified Sellers
            </div>
          </div>
        </div>

        {/* Product Cards with Live Rates, Consumption Metrics & Direct Trader Contacts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {produceList.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.07 }}
              className="bg-gradient-to-b from-white/[0.07] to-white/[0.02] border border-white/10 hover:border-emerald-500/40 rounded-3xl p-6 transition-all duration-300 flex flex-col justify-between hover:shadow-[0_14px_40px_rgba(16,185,129,0.14)] group relative overflow-hidden text-left"
            >
              {/* Top Status & Trader Count */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className={`px-3 py-1 rounded-full text-[11px] font-bold tracking-wide flex items-center gap-1.5 ${
                    item.priceTrend === "high-demand"
                      ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                      : item.priceTrend === "up"
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                      : "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                  }`}>
                    <Flame className="w-3 h-3 text-current" />
                    {item.priceTrend === "high-demand" ? "High Demand" : item.priceTrend === "up" ? "Peak Season" : "Steady Demand"}
                  </span>

                  <span className="text-[11px] text-emerald-400 font-semibold bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    100% Organic
                  </span>
                </div>

                {/* Title & Origin */}
                <div className="mb-4">
                  <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-emerald-300 transition-colors leading-snug">
                    {item.nameEnglish}
                  </h3>
                  <p className="text-xs text-emerald-400/90 font-medium mt-0.5">{item.nameNepali}</p>
                  <div className="flex items-center gap-1 text-[11px] text-gray-400 mt-2">
                    <MapPin className="w-3 h-3 text-emerald-400 shrink-0" />
                    <span>Origin: <strong className="text-gray-200">{item.mainOrigin}</strong></span>
                  </div>
                </div>

                {/* Price & Consumption Grid */}
                <div className="bg-black/40 border border-white/5 rounded-2xl p-4 mb-4 space-y-3">
                  
                  {/* Live Rate */}
                  <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-gray-400 block font-semibold">
                        Current Market Rate
                      </span>
                      <span className="text-xl sm:text-2xl font-black text-emerald-400 tracking-tight">
                        {item.rateCurrent}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-gray-300 block font-medium">
                        {item.unit.includes("लिटर") ? "Per Liter" : "Per Kg"}
                      </span>
                      <span className="text-[10px] text-emerald-300 font-bold bg-emerald-500/15 px-2 py-0.5 rounded-full inline-block mt-0.5">
                        {item.priceTrend === "high-demand" ? "+12% High Demand" : item.priceTrend === "up" ? "Seasonal Peak" : "Regular Demand"}
                      </span>
                    </div>
                  </div>

                  {/* Real Origin and Delivery Hubs Info */}
                  <div className="grid grid-cols-2 gap-2 text-left pt-1">
                    <div>
                      <span className="text-[10px] text-gray-400 block">Harvest Region:</span>
                      <span className="text-xs font-bold text-white flex items-center gap-1 mt-0.5 truncate">
                        <MapPin className="w-3 h-3 text-emerald-400 shrink-0" />
                        {item.mainOrigin}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-400 block">Delivery Destination:</span>
                      <span className="text-xs font-bold text-emerald-300 flex items-center gap-1 mt-0.5 truncate">
                        <Truck className="w-3 h-3 text-emerald-400 shrink-0" />
                        Kathmandu & Major Cities
                      </span>
                    </div>
                  </div>
                </div>

                {/* Direct Verified Sellers Section */}
                {showSellerContacts && item.featuredSellers && item.featuredSellers.length > 0 ? (
                  <div className="border-t border-white/10 pt-3.5 mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                        <Store className="w-3 h-3" /> Verified Sellers & Contacts:
                      </span>
                      <span className="text-[10px] text-gray-400">Direct Chat / Call</span>
                    </div>

                    <div className="space-y-2">
                      {item.featuredSellers.map((seller, sIdx) => {
                        const callPhone = useAdminPhoneForSellers ? defaultAdminPhone : seller.phone;
                        return (
                          <div 
                            key={sIdx}
                            className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-2.5 transition-colors flex items-center justify-between gap-2"
                          >
                            <div className="min-w-0 flex-1">
                              <div className="text-xs font-bold text-white truncate flex items-center gap-1">
                                <span>{seller.name}</span>
                                <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                              </div>
                              <div className="text-[10px] text-gray-400 truncate">
                                {seller.role} • {seller.location}
                              </div>
                            </div>

                            <div className="flex items-center gap-1.5 shrink-0">
                              {/* WhatsApp Chat Button */}
                              <button
                                type="button"
                                onClick={() => handleSellerWhatsApp(seller, item.nameEnglish)}
                                title="Chat on WhatsApp"
                                className="w-7 h-7 rounded-lg bg-emerald-600/20 hover:bg-emerald-600 text-emerald-400 hover:text-white flex items-center justify-center transition-colors"
                              >
                                <MessageCircle className="w-3.5 h-3.5" />
                              </button>

                              {/* Phone Call Button */}
                              <a
                                href={`tel:${callPhone}`}
                                title="Call directly"
                                className="w-7 h-7 rounded-lg bg-blue-600/20 hover:bg-blue-600 text-blue-400 hover:text-white flex items-center justify-center transition-colors"
                              >
                                <Phone className="w-3.5 h-3.5" />
                              </a>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="border-t border-white/10 pt-3 pb-2 text-center text-xs text-gray-400">
                    <p className="flex items-center justify-center gap-1.5 text-emerald-400 font-medium">
                      <PhoneCall className="w-3.5 h-3.5" />
                      For wholesale orders or queries, call hotline:
                    </p>
                    <a href={`tel:${defaultAdminPhone}`} className="text-white font-mono font-bold mt-1 inline-block hover:underline">
                      {defaultAdminPhone}
                    </a>
                  </div>
                )}
              </div>

              {/* Action Button: App Download or Inquiry */}
              <a
                href="#contact-hub"
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-600/20 hover:bg-emerald-600 border border-emerald-500/30 hover:border-emerald-500 text-emerald-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all mt-2"
              >
                <span>Wholesale Orders & Direct Inquiries</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </motion.div>
          ))}
        </div>

        {/* Seller Registration Callout */}
        <div className="mt-14 bg-gradient-to-r from-emerald-950/40 via-blue-950/30 to-emerald-950/40 border border-emerald-500/25 rounded-3xl p-6 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-6 text-center lg:text-left">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-widest mb-1">
              <TrendingUp className="w-4 h-4" /> For Farmers, Cooperatives & Local Collectors of Mugu, Humla & Jumla
            </div>
            <h4 className="text-xl sm:text-2xl font-bold text-white">
              Want to supply your local Himalayan produce to Kathmandu and nationwide?
            </h4>
            <p className="text-xs sm:text-sm text-gray-300 mt-2 leading-relaxed">
              Register your organic products, available quantity, and direct phone contact. We connect you directly with wholesale buyers and consumers with zero middlemen.
            </p>
          </div>
          
          <a
            href="#contact-hub"
            className="shrink-0 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-500 hover:to-blue-500 text-white font-bold text-sm transition-all shadow-lg hover:shadow-emerald-500/30 hover:scale-[1.02]"
          >
            Register Produce & Store
          </a>
        </div>

      </div>
    </section>
  );
}
