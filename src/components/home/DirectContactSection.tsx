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
    <section id="contact-hub" className="py-24 relative z-10 border-t border-white/10 bg-gradient-to-b from-[#070a14] via-[#0b0f1e] to-[#070a14] overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-emerald-600/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500/15 via-teal-500/15 to-transparent border border-emerald-500/30 rounded-full px-4 py-1.5 mb-4 shadow-inner">
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-extrabold text-emerald-300 tracking-wider uppercase">
              Direct Contact & Wholesale Hub
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-display mb-3">
            Connect With Our Team
            <span className="block text-xl sm:text-2xl text-emerald-400 font-bold mt-2">
              सिधै सम्पर्क तथा थोक अर्डर
            </span>
          </h2>
          <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            मुगु, हुम्ला र जुम्लाका किसान तथा संकलकहरूसँग सिधा सम्पर्क, ठूलो परिमाणको होलसेल आपूर्ति, वा उपभोक्ता होम डेलिभरीका लागि सम्पर्क गर्नुहोस्।
          </p>

          {/* Verified Regional Coverage Badges */}
          <div className="flex flex-wrap justify-center items-center gap-2 mt-6">
            <span className="text-[11px] font-bold bg-[#141a2c] text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-full flex items-center gap-1.5 shadow">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              मुगु: गमगढी, ताल्चा, सोरु, खत्याड, कार्मारोङ
            </span>
            <span className="text-[11px] font-bold bg-[#141a2c] text-blue-300 border border-blue-500/30 px-3 py-1 rounded-full flex items-center gap-1.5 shadow">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
              हुम्ला: सिमिकोट उच्च लेक
            </span>
            <span className="text-[11px] font-bold bg-[#141a2c] text-amber-300 border border-amber-500/30 px-3 py-1 rounded-full flex items-center gap-1.5 shadow">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
              जुम्ला: सिँजा उपत्यका व मार्सी क्षेत्र
            </span>
          </div>
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
                className="group p-6 rounded-3xl bg-gradient-to-br from-emerald-950/50 via-emerald-900/20 to-transparent border border-emerald-500/40 hover:border-emerald-400/80 transition-all flex items-start gap-4 block hover:shadow-[0_10px_30px_rgba(16,185,129,0.25)] shadow-lg"
              >
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-inner border border-emerald-500/30">
                  <MessageCircle className="w-7 h-7" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-white">ह्वाट्सएप च्याट (WhatsApp)</h3>
                    <span className="text-[10px] bg-emerald-500/30 text-emerald-200 font-extrabold px-2.5 py-0.5 rounded-full border border-emerald-500/40">
                      Online
                    </span>
                  </div>
                  <p className="text-xs text-gray-300 mt-1 leading-relaxed">
                    सिधै म्यासेज पठाउनुहोस् र तत्काल जवाफ पाउनुहोस्।
                  </p>
                  <span className="text-xs font-bold text-emerald-400 mt-3 inline-block group-hover:underline">
                    {phone} • च्याट सुरु गर्नुहोस् &rarr;
                  </span>
                </div>
              </a>
            ) : (
              <div className="p-6 rounded-3xl bg-[#111524] border border-white/10 flex items-start gap-4 shadow-lg">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/25">
                  <MessageCircle className="w-7 h-7" />
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
                className="group p-6 rounded-3xl bg-gradient-to-br from-blue-950/50 via-blue-900/20 to-transparent border border-blue-500/40 hover:border-blue-400/80 transition-all flex items-start gap-4 block hover:shadow-[0_10px_30px_rgba(59,130,246,0.25)] shadow-lg"
              >
                <div className="w-14 h-14 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-inner border border-blue-500/30">
                  <Phone className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">सिधै फोन गर्नुहोस् (Direct Call)</h3>
                  <p className="text-xs text-gray-300 mt-1 leading-relaxed">
                    थोक अर्डर, किसान समन्वय वा प्राविधिक सहयोगका लागि।
                  </p>
                  <span className="text-xs font-bold text-blue-400 mt-3 inline-block group-hover:underline">
                    {phone} • सिधै कल गर्नुहोस् &rarr;
                  </span>
                </div>
              </a>
            ) : (
              <div className="p-6 rounded-3xl bg-[#111524] border border-white/10 flex items-start gap-4 shadow-lg">
                <div className="w-14 h-14 rounded-2xl bg-blue-500/15 text-blue-400 flex items-center justify-center shrink-0 border border-blue-500/25">
                  <Phone className="w-7 h-7" />
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
            <div className="p-6 rounded-3xl bg-gradient-to-br from-purple-950/40 via-purple-900/10 to-transparent border border-purple-500/30 flex items-start gap-4 shadow-lg">
              <div className="w-14 h-14 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0 border border-purple-500/30 shadow-inner">
                <MapPin className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">सम्पर्क कार्यालय</h3>
                <p className="text-xs text-gray-300 mt-1 leading-relaxed">
                  {location}
                </p>
                <span className="text-[11px] text-purple-300 block mt-2 font-mono">
                  {email}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Inquiry Form */}
          <div className="lg:col-span-2 bg-[#101424] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-60 h-60 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">Send Instant Inquiry • सन्देश पठाउनुहोस्</h3>
            <p className="text-xs sm:text-sm text-gray-300 mb-6">
              तपाईंलाई चाहिएको उत्पादन वा होलसेल माग यहाँबाट सिधै पठाउनुहोस्, हाम्रो टोली तुरुन्तै सम्पर्कमा आउनेछ।
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 text-left relative z-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-200 mb-1.5 flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-emerald-400" />
                    Full Name (पूरा नाम)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Your Name (उदा: रमेश मल्ल)"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="w-full bg-[#090c16] border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition-colors shadow-inner"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-200 mb-1.5 flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-blue-400" />
                    Phone Number (सम्पर्क फोन)
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="Phone number (98XXXXXXXX)"
                    value={formState.phone}
                    onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                    className="w-full bg-[#090c16] border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors shadow-inner"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-200 mb-1.5 flex items-center gap-1">
                  <Store className="w-3.5 h-3.5 text-amber-400" />
                  Inquiry Purpose (सम्पर्कको उद्देश्य)
                </label>
                <select
                  value={formState.interest}
                  onChange={(e) => setFormState({ ...formState, interest: e.target.value })}
                  className="w-full bg-[#090c16] border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
                >
                  <option value="Consumer Order (काठमाडौँ/अन्य सहरमा सामान मगाउन)">Order for Home / Personal Use (घरको लागि खरिद)</option>
                  <option value="Wholesale Supply (थोक आपूर्ति / होलसेल)">Wholesale Supply for Stores & Restaurants (थोक खरिद)</option>
                  <option value="Farmer / Supplier (मुगु, हुम्ला, जुम्लाबाट उत्पादन पठाउन)">Register as Farmer or Collector (उत्पादन पठाउन दर्ता)</option>
                  <option value="Logistics & General Inquiry (ढुवानी तथा अन्य)">Logistics, Transport & App Support (ढुवानी तथा सहायता)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-200 mb-1.5">
                  Message / Requirements (थप सन्देश वा माग)
                </label>
                <textarea
                  rows={3}
                  placeholder="Which products are you interested in and what quantity? (कुन सामान कति चाहिन्छ?)"
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  className="w-full bg-[#090c16] border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition-colors shadow-inner"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 hover:from-emerald-500 hover:to-blue-500 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-xl hover:shadow-emerald-500/30 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>सन्देश पठाउनुहोस् (Send via WhatsApp)</span>
              </button>

              {submitted && (
                <div className="p-3.5 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-xs text-emerald-200 flex items-center gap-2 shadow-lg">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
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
