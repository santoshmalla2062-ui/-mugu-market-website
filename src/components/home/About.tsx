import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Store, Users, Handshake, MapPin, Camera, X, Maximize2, Layers } from "lucide-react";

import sunsetImg from "@/assets/images/sunset_valley_1788081186609.jpg";
import snowyVillageImg from "@/assets/images/snowy_village_1788081215217.jpg";
import lushTerraceImg from "@/assets/images/lush_terrace_1788081236555.jpg";
import villageViewImg from "@/assets/images/village_view_1788081252406.jpg";
import goldenFieldImg from "@/assets/images/golden_field_1788081270515.jpg";

interface LocationPhoto {
  id: string;
  title: string;
  location: string;
  image: string;
  shortLabel: string;
  description: string;
}

const MUGU_PHOTOS: LocationPhoto[] = [
  {
    id: "dhainkot-sunset",
    title: "धैनाकोट र सोरु उपत्यकामा स्वर्णिम सूर्यास्त",
    location: "मुगु, नेपाल",
    image: sunsetImg,
    shortLabel: "धैनाकोट सूर्यास्त",
    description: "हिमालको खोचबाट पोखिएको स्वर्णिम घाम र सोरुका सुन्दर गरा परेका खेतबारीहरू।"
  },
  {
    id: "mugu-snow-village",
    title: "मुगुका हिउँले ढाकिएका अग्ला पहाडी बस्ती",
    location: "मुगु जिल्ला",
    image: snowyVillageImg,
    shortLabel: "हिउँले ढाकिएको बस्ती",
    description: "विशाल चट्टानी पहराहरूको फेदीमा अवस्थित परम्परागत मुगुली सुन्दर बस्ती।"
  },
  {
    id: "soru-valley-green",
    title: "कर्णाली खोच र सोरुका हरियाली फाँटहरू",
    location: "मुगु, नेपाल",
    image: lushTerraceImg,
    shortLabel: "सोरु फाँट र नदी",
    description: "कर्णाली नदी किनार माथि फैलिएका गरा परेका अन्नबालीका सुन्दर फाँटहरू।"
  },
  {
    id: "dhainkot-village-life",
    title: "धैनाकोट गाउँ र स्थानीय बस्तीको परिवेश",
    location: "मुगु, नेपाल",
    image: villageViewImg,
    shortLabel: "धैनाकोट परिवेश",
    description: "पहाडको काखमा बसेको धैनाकोट गाउँ, टिनका छाना र खुला प्रांगण।"
  },
  {
    id: "dhainkot-golden-fields",
    title: "धैनाकोटका सुनौला गरा र ढुङ्गे कान्लाहरू",
    location: "मुगु, नेपाल",
    image: goldenFieldImg,
    shortLabel: "सुनौला कान्ला",
    description: "स्थानीय कृषकहरूले वर्षौंदेखि संरक्षण गरेका परम्परागत ढुङ्गे पर्खाल र बालीनाली।"
  }
];

export function About() {
  const [activeTab, setActiveTab] = useState<"map" | "photos">("map");
  const [selectedPhoto, setSelectedPhoto] = useState<LocationPhoto | null>(null);

  return (
    <section id="about" className="py-20 relative z-10 border-t border-white/5">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Text & Value Propositions */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-xs font-semibold mb-4">
              <MapPin className="w-3.5 h-3.5" />
              Mugu, Nepal
            </div>
            
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-6 font-display">
              Empowering Mugu's Local Economy
            </h2>
            <p className="text-base text-gray-300 mb-6 leading-relaxed">
              Mugu Local Market is a digital platform built specifically for our community. Our main goal is to bridge the gap between local customers, small shopkeepers, and large wholesale dealers across Mugu, bringing them all under one digital umbrella.
            </p>
            
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-5 md:p-6 mb-8 shadow-lg">
              <p className="text-lg md:text-xl text-blue-200 leading-relaxed font-semibold italic">
                "हामी एउटा एप मात्र होइनौं। हामी यस्तो डिजिटल पूर्वाधार निर्माण गर्दैछौं जसले सम्पूर्ण स्थानीय उत्पादन र कृषिलाई व्यवस्थित बनाउँछ भने यसले हामी सबैका लागि व्यापारमा पहुँच र आर्थिक रूपमा बलियो बनाउन मद्दत पुर्याउनेछ।"
              </p>
            </div>
            
            <div className="space-y-4 mt-8">
              <div className="flex items-start gap-4 apk-card p-4 hover:border-blue-500/30 transition-all">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0 mt-1">
                  <Users className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">For Customers</h4>
                  <p className="text-xs text-gray-400 mt-1">Browse and purchase products from all shops in Mugu and Soru right from your home.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 apk-card p-4 hover:border-emerald-500/30 transition-all">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 mt-1">
                  <Store className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">For Local Sellers</h4>
                  <p className="text-xs text-gray-400 mt-1">Digitize your shop and reach more customers across the district.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 apk-card p-4 hover:border-purple-500/30 transition-all">
                <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0 mt-1">
                  <Handshake className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">For Wholesale Dealers</h4>
                  <p className="text-xs text-gray-400 mt-1">A transparent and fast medium to supply bulk goods to village shops.</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Right Column: Interactive Map & Mugu/Dhainkot Photo Experience */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 flex flex-col gap-4"
          >
            {/* Header controls for Map / Photos */}
            <div className="flex items-center justify-between bg-black/40 border border-white/10 rounded-2xl p-2 backdrop-blur-md">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab("map")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                    activeTab === "map"
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-900/40"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5" />
                  मुगु नक्सा (Map)
                </button>
                <button
                  onClick={() => setActiveTab("photos")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                    activeTab === "photos"
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-900/40"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Camera className="w-3.5 h-3.5" />
                  धैनाकोट र सोरु फोटोहरू ({MUGU_PHOTOS.length})
                </button>
              </div>

              <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] text-gray-400 pr-3 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                सोरु गाउँपालिका, मुगु
              </span>
            </div>

            {/* Main Interactive Stage */}
            <div className="relative h-[380px] sm:h-[440px] apk-card overflow-hidden group p-0 border border-white/10 shadow-2xl">
              {activeTab === "map" ? (
                <>
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-transparent z-10 pointer-events-none mix-blend-overlay" />
                  
                  <iframe 
                    src="https://maps.google.com/maps?q=Dhainkot,+Soru,+Mugu,+Nepal&t=p&z=10&ie=UTF8&iwloc=&output=embed"
                    width="100%" 
                    height="100%" 
                    style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) contrast(85%) grayscale(20%)" }} 
                    allowFullScreen={true} 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    className="absolute inset-0 opacity-85 group-hover:opacity-100 transition-opacity duration-500"
                  ></iframe>

                  {/* Interactive Map Overlay Badges */}
                  <div className="absolute top-4 right-4 z-20 flex flex-wrap gap-2 justify-end">
                    <button
                      onClick={() => setSelectedPhoto(MUGU_PHOTOS[0])}
                      className="flex items-center gap-1.5 bg-black/80 hover:bg-blue-600 text-white text-[11px] font-semibold px-3 py-1.5 rounded-full border border-white/15 backdrop-blur-md shadow-lg transition-all transform hover:scale-105"
                    >
                      <Camera className="w-3 h-3 text-blue-400 hover:text-white" />
                      📸 धैनाकोट दृश्य हेर्नुहोस्
                    </button>
                  </div>

                  {/* Location Info Banner at bottom */}
                  <div className="absolute bottom-4 left-4 right-4 p-3.5 bg-black/75 backdrop-blur-md rounded-xl border border-white/10 shadow-xl z-20 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-900/50 shrink-0">
                        <MapPin className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-white leading-tight">मुगु जिल्ला (Mugu District)</h3>
                        <p className="text-xs text-blue-300 font-medium">पिन गरिएको: धैनाकोट, सोरु गाउँपालिका</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setActiveTab("photos")}
                        className="text-xs text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1 bg-blue-500/10 hover:bg-blue-500/20 px-3 py-1.5 rounded-lg border border-blue-500/20 transition-all"
                      >
                        सबै फोटो <Layers className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                /* Photo Grid View */
                <div className="absolute inset-0 p-4 overflow-y-auto bg-gray-950/90 backdrop-blur-sm grid grid-cols-2 gap-3 z-20">
                  {MUGU_PHOTOS.map((photo) => (
                    <div
                      key={photo.id}
                      onClick={() => setSelectedPhoto(photo)}
                      className="relative group/card cursor-pointer rounded-xl overflow-hidden border border-white/10 bg-black/40 aspect-[4/3] flex flex-col justify-end p-3 hover:border-blue-500/50 transition-all duration-300 shadow-md"
                    >
                      <img
                        src={photo.image}
                        alt={photo.title}
                        referrerPolicy="no-referrer"
                        className="absolute inset-0 w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
                      
                      <div className="relative z-10">
                        <span className="text-[10px] text-blue-300 font-medium flex items-center gap-1 mb-0.5">
                          <MapPin className="w-2.5 h-2.5" /> {photo.location}
                        </span>
                        <h4 className="text-xs font-bold text-white line-clamp-1 leading-snug">{photo.title}</h4>
                      </div>

                      <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-opacity">
                        <Maximize2 className="w-3 h-3 text-white" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Thumbnail Preview Strip below the map */}
            <div className="grid grid-cols-5 gap-1.5 sm:gap-2.5">
              {MUGU_PHOTOS.map((photo) => (
                <button
                  key={photo.id}
                  onClick={() => setSelectedPhoto(photo)}
                  className="relative group rounded-xl overflow-hidden border border-white/10 hover:border-blue-500/50 aspect-[16/10] bg-black/40 transition-all text-left"
                >
                  <img
                    src={photo.image}
                    alt={photo.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  <span className="absolute bottom-1 left-1 right-1 text-[8px] sm:text-[9px] text-gray-200 font-semibold truncate text-center block">
                    {photo.shortLabel}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Lightbox / Modal for High Resolution Photo Review */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-lg"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative max-w-3xl w-full bg-gray-900 border border-white/15 rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Photo Display */}
              <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-black overflow-hidden">
                <img
                  src={selectedPhoto.image}
                  alt={selectedPhoto.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center border border-white/20 transition-colors shadow-lg"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Photo Details */}
              <div className="p-5 bg-gray-900 flex flex-col gap-1.5">
                <div className="flex items-center gap-1.5 text-xs text-blue-400 font-semibold">
                  <MapPin className="w-3.5 h-3.5" />
                  {selectedPhoto.location}
                </div>
                <h3 className="text-lg font-bold text-white">{selectedPhoto.title}</h3>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mt-1">
                  {selectedPhoto.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

