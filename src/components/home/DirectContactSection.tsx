import { useState, FormEvent } from "react";
import { MessageCircle, Phone, MapPin, Send, CheckCircle2, User, HelpCircle, Store } from "lucide-react";
import { useSettings } from "@/hooks/useSettings";

export function DirectContactSection() {
  const { settings } = useSettings();
  const phone = !settings.loading && settings.phone ? settings.phone : "";
  const email = !settings.loading && settings.email ? settings.email : "info@hamromugu.com";
  const location = !settings.loading && settings.location ? settings.location : "गमगढी बजार, छायाँनाथ रारा, मुगु";

  // Clean phone for whatsapp
  const cleanPhone = phone.replace(/[^0-9]/g, "");
  const hasPhone = Boolean(cleanPhone && cleanPhone.length >= 7);
  const whatsappUrl = hasPhone 
    ? `https://wa.me/977${cleanPhone}?text=${encodeURIComponent("नमस्ते! म हाम्रो मुगु लोकल बजार एप र उत्पादनबारे जानकारी लिन चाहन्छु।")}`
    : "#contact-hub";

  const [formState, setFormState] = useState({
    name: "",
    phone: "",
    interest: "उत्पादन किन्न चाहन्छु (Buyer)",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.phone) return;
    
    if (hasPhone) {
      const msg = `नमस्ते! म ${formState.name} (${formState.phone})। म ${formState.interest} बारे बुझ्न चाहन्छु। थप सन्देश: ${formState.message || "कुनै छैन"}`;
      window.open(`https://wa.me/977${cleanPhone}?text=${encodeURIComponent(msg)}`, "_blank");
    }
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="contact-hub" className="py-20 relative z-10 border-t border-white/5 bg-[#060810] overflow-hidden">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-1.5 mb-4">
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-bold text-emerald-400 tracking-wider uppercase">
              Direct Contact & Wholesale Hub
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Connect With Our Team • सिधै सम्पर्क गर्नुहोस्
          </h2>
          <p className="text-gray-300 text-sm sm:text-base mt-2 max-w-2xl mx-auto">
            Contact us directly for bulk orders, wholesale supply, store registration, or consumer delivery from Mugu and Humla across Nepal.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Contact Direct Cards */}
          <div className="space-y-4">
            {/* WhatsApp Card */}
            {hasPhone ? (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="group p-6 rounded-3xl bg-gradient-to-br from-emerald-950/40 via-emerald-900/10 to-transparent border border-emerald-500/30 hover:border-emerald-400/60 transition-all flex items-start gap-4 block hover:shadow-[0_10px_30px_rgba(16,185,129,0.15)]"
              >
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-white">ह्वाट्सएप च्याट (WhatsApp)</h3>
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded-full">
                      Online
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                    सिधै म्यासेज पठाउनुहोस् र तत्काल जवाफ पाउनुहोस्।
                  </p>
                  <span className="text-xs font-bold text-emerald-400 mt-3 inline-block group-hover:underline">
                    {phone} • च्याट सुरु गर्नुहोस् &rarr;
                  </span>
                </div>
              </a>
            ) : (
              <div className="p-6 rounded-3xl bg-white/5 border border-white/10 flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">ह्वाट्सएप च्याट (WhatsApp)</h3>
                  <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                    एडमिन ड्यासबोर्डबाट फोन नम्बर सेट गरेपछि यहाँ सक्रिय हुनेछ।
                  </p>
                </div>
              </div>
            )}

            {/* Direct Phone Call Card */}
            {hasPhone ? (
              <a
                href={`tel:${cleanPhone}`}
                className="group p-6 rounded-3xl bg-gradient-to-br from-blue-950/40 via-blue-900/10 to-transparent border border-blue-500/30 hover:border-blue-400/60 transition-all flex items-start gap-4 block hover:shadow-[0_10px_30px_rgba(59,130,246,0.15)]"
              >
                <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">सिधै फोन गर्नुहोस् (Call)</h3>
                  <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                    कुनै पनि सोधपुछ वा प्राविधिक सहयोगका लागि।
                  </p>
                  <span className="text-xs font-bold text-blue-400 mt-3 inline-block group-hover:underline">
                    {phone} • सिधै कल गर्नुहोस् &rarr;
                  </span>
                </div>
              </a>
            ) : (
              <div className="p-6 rounded-3xl bg-white/5 border border-white/10 flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">सिधै फोन गर्नुहोस्</h3>
                  <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                    एडमिन ड्यासबोर्डबाट नम्बर अपडेट गर्नुहोस्।
                  </p>
                </div>
              </div>
            )}

            {/* Office Location Card */}
            <div className="p-6 rounded-3xl bg-white/5 border border-white/10 flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">सम्पर्क कार्यालय</h3>
                <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                  {location}
                </p>
                <span className="text-[11px] text-gray-500 block mt-2 font-mono">
                  {email}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Inquiry Form */}
          <div className="lg:col-span-2 bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-white/10 rounded-3xl p-6 sm:p-8">
            <h3 className="text-xl font-bold text-white mb-2">Send Instant Inquiry • सन्देश पठाउनुहोस्</h3>
            <p className="text-xs sm:text-sm text-gray-400 mb-6">
              Fill the form below to connect instantly with our supply team via WhatsApp.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1.5 flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-emerald-400" />
                    Full Name (पूरा नाम)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Your Name (उदा: रमेश मल्ल)"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1.5 flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-blue-400" />
                    Phone Number (सम्पर्क फोन)
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="Phone number (98XXXXXXXX)"
                    value={formState.phone}
                    onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1.5 flex items-center gap-1">
                  <Store className="w-3.5 h-3.5 text-amber-400" />
                  Inquiry Purpose (सम्पर्कको उद्देश्य)
                </label>
                <select
                  value={formState.interest}
                  onChange={(e) => setFormState({ ...formState, interest: e.target.value })}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
                >
                  <option value="Consumer Order (काठमाडौँ/अन्य सहरमा सामान मगाउन)">Order for Home / Personal Use (घरको लागि खरिद)</option>
                  <option value="Wholesale Supply (थोक आपूर्ति / होलसेल)">Wholesale Supply for Stores & Restaurants (थोक खरिद)</option>
                  <option value="Farmer / Supplier (मुगु/हुम्लाबाट उत्पादन पठाउन)">Register as Farmer or Collector (उत्पादन पठाउन दर्ता)</option>
                  <option value="Logistics & General Inquiry (ढुवानी तथा अन्य)">Logistics, Transport & App Support (ढुवानी तथा सहायता)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1.5">
                  Message / Requirements (थप सन्देश वा माग)
                </label>
                <textarea
                  rows={3}
                  placeholder="Which products are you interested in and what quantity? (कुन सामान कति चाहिन्छ?)"
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-500 hover:to-blue-500 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-emerald-500/25 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>सन्देश पठाउनुहोस् (Send via WhatsApp)</span>
              </button>

              {submitted && (
                <div className="p-3 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>धन्यवाद! तपाईंको अनुरोध पठाइएको छ, हामी छिट्टै सम्पर्क गर्नेछौँ।</span>
                </div>
              )}
            </form>
          </div>

        </div>

      </div>
    </section>
  );
}
