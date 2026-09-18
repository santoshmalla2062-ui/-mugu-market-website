import { Sparkles, Megaphone, Zap, Info, Star, Bell } from "lucide-react";
import { useSettings } from "@/hooks/useSettings";

const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'Sparkles': return Sparkles;
    case 'Megaphone': return Megaphone;
    case 'Zap': return Zap;
    case 'Info': return Info;
    case 'Star': return Star;
    case 'Bell': return Bell;
    default: return Sparkles;
  }
};

export function NewsTicker() {
  const { settings } = useSettings();

  // Parse apps to dynamically show in ticker if we want to
  let tickerItems = [];
  
  if (settings.tickerMessages && settings.tickerMessages !== "[]") {
    try {
      tickerItems = JSON.parse(settings.tickerMessages);
    } catch (e) {
      console.error("Failed to parse ticker messages", e);
    }
  }

  // Fallback default
  if (tickerItems.length === 0) {
    tickerItems = [
      { text: "मुगु, हुम्ला र जुम्लाका अग्र्यानिक उत्पादन अब सिधै काठमाडौँ, पोखरा र देशभर डेलिभरी! 🏔️", icon: "Sparkles", color: "text-yellow-400", textColor: "text-gray-300" },
      { text: "मार्सी चामल, सिमी, शुद्ध घिउ, राराको मह, ओखर र स्याउ सुकुटी थोक तथा खुद्रा उपलब्ध।", icon: "Zap", color: "text-emerald-400", textColor: "text-gray-300" },
      { text: "मुगु, हुम्ला र जुम्लाका किसानबाट सिधै कोसेली मगाउन 'Hamro Mugu Market' एप डाउनलोड गर्नुहोस्!", icon: "Megaphone", color: "text-blue-400", textColor: "text-gray-300" },
      { text: "थोक अर्डर तथा ढुवानी सोधपुछका लागि सम्पर्क गर्नुहोस्।", icon: "Zap", color: "text-green-400", textColor: "text-gray-300" }
    ];
  }

  return (
    <div className="relative bg-[#060a14]/80 border-b border-white/[0.05] py-2.5 overflow-hidden flex items-center z-40 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
      
      {/* Ticker Animation Styles */}
      <style>
        {`
          @keyframes ticker-scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-10%); }
          }
          .animate-ticker-scroll {
            animation: ticker-scroll 20s linear infinite;
            display: flex;
            width: max-content;
          }
        `}
      </style>

      {/* Left fixed fade edge */}
      <div className="absolute left-0 top-0 bottom-0 w-20 z-20 bg-gradient-to-r from-[#060a14] via-[#060a14] to-transparent pointer-events-none"></div>

      {/* Scrolling Content Container - no padding here to ensure accurate % translation */}
      <div className="flex">
        <div className="animate-ticker-scroll">
          {/* Render 10 copies for a robust infinite loop. TranslateX(-10%) shifts exactly 1 copy. */}
          {[...Array(10)].map((_, groupIndex) => (
            <div key={groupIndex} className="flex">
              {tickerItems.map((item, index) => {
                const Icon = getIcon(item.icon);
                return (
                  <div key={index} className="flex items-center gap-2 mx-3 sm:mx-6 group cursor-pointer">
                    <div className={`p-1.5 rounded-full bg-white/5 ${item.color} transition-colors`}>
                      <Icon className="w-5 h-5 transition-transform" />
                    </div>
                    <span className={`text-lg md:text-xl font-bold ${item.textColor || item.color || 'text-gray-300'} transition-colors whitespace-nowrap tracking-wide`}>
                      {item.text}
                    </span>
                    <div className="w-1.5 h-1.5 rounded-full bg-white/10 mx-3 shadow-[0_0_10px_rgba(255,255,255,0.2)]"></div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
      
      {/* Right fade edge */}
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#060a14] to-transparent z-10 pointer-events-none"></div>
    </div>
  );
}