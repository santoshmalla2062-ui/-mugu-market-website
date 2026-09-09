import React from "react";
import { Download, Sparkles, Image as ImageIcon } from "lucide-react";
import logoFinal from "@/assets/images/logo_final_polished_nature_1788511126581.jpg";
import loginFinal from "@/assets/images/login_final_nature_logo_1788511149027.jpg";

export default function DesignPreview() {
  return (
    <div className="min-h-screen bg-[#0a0c14] flex flex-col items-center p-4 pt-24 pb-20">
      <div className="flex items-center gap-3 mb-2">
        <Sparkles className="w-8 h-8 text-emerald-400" />
        <h1 className="text-3xl sm:text-4xl font-bold text-white text-center">फाइनल डिजाइन तयार छ!</h1>
      </div>
      <p className="text-gray-400 mb-12 text-center max-w-xl">
        तपाईंले रोज्नुभएको 'प्रकृति र मार्केट' को लोगोलाई अझै चम्किलो र आकर्षक बनाएर, त्यसलाई हाम्रो एपको लगइन पेजमा राखेर फाइनल रूप दिएको छु।
      </p>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl w-full mb-16">
        
        {/* Polished Logo Section */}
        <div className="flex flex-col items-center justify-center bg-white/5 rounded-[3rem] p-8 sm:p-12 border border-white/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
          
          <h2 className="text-emerald-400 font-semibold mb-8 text-xl z-10">१. फाइनल एप लोगो (App Icon)</h2>
          <div className="w-48 h-48 sm:w-64 sm:h-64 rounded-[3rem] overflow-hidden shadow-[0_0_60px_rgba(16,185,129,0.3)] border border-white/20 mb-8 z-10">
            <img 
              src={logoFinal} 
              alt="Final Polished Logo" 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" 
            />
          </div>
          <a 
            href={logoFinal} 
            download="Hamro_Mugu_Final_Logo.jpg"
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 rounded-2xl text-white font-bold transition-all shadow-lg shadow-emerald-600/30 hover:shadow-emerald-500/50 hover:-translate-y-1 z-10"
          >
            <Download className="w-5 h-5" />
            लोगो डाउनलोड गर्नुहोस्
          </a>
          <p className="text-xs text-gray-500 mt-6 text-center z-10">
            (Play Store र मोबाइलको स्क्रिनमा ठ्याक्कै यस्तै देखिनेछ)
          </p>
        </div>

        {/* Final Login UI Section */}
        <div className="flex flex-col items-center justify-center bg-white/5 rounded-[3rem] p-8 sm:p-12 border border-white/10 relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -ml-32 -mb-32"></div>
          <h2 className="text-blue-400 font-semibold mb-8 text-xl z-10">२. फाइनल लगइन पेज</h2>
          <div className="w-full max-w-sm rounded-[2.5rem] overflow-hidden shadow-[0_0_60px_rgba(59,130,246,0.15)] border border-white/10 z-10 group">
            <img 
              src={loginFinal} 
              alt="Final Login UI with Logo" 
              className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-1000" 
            />
          </div>
        </div>
      </div>

      {/* NEW: APP UI MOCKUP SECTION */}
      <div className="max-w-6xl w-full bg-emerald-900/20 rounded-[3rem] p-8 sm:p-12 border border-emerald-500/20 relative overflow-hidden mb-12">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-left">
            <h2 className="text-3xl font-bold text-white mb-4">
              "Hamro Mugu" नयाँ होम स्क्रिन डिजाइन
            </h2>
            <p className="text-emerald-100/70 mb-6 text-lg leading-relaxed">
              तपाईंले दिनुभएको उत्कृष्ट खाका (Prompt) मा आधारित रहेर तयार पारिएको प्रिमियम मोबाइल एपको डिजाइन यस्तो देखिनेछ। यसमा गाढा हरियो रङ, थ्रीडी हिरो सेक्सन, र मुगुको सुगन्ध झल्किने स्थानीय उत्पादनहरू समावेश छन्।
            </p>
            <ul className="text-gray-300 space-y-3 mb-8">
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div> प्रिमियम र क्लिन हेडर (Premium Header)</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div> थ्रीडी एनिमेटेड हिरो सेक्सन (3D Hero Carousel)</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div> स्वागत कार्ड र स्पेसल अफर (Welcome & Offers)</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div> मोडर्न क्याटागोरी र बटम न्याभिगेसन (Modern UI)</li>
            </ul>
            <a href="/app-mockup.jpg" download="hamro_mugu_app_design.jpg" className="inline-flex h-12 items-center justify-center rounded-full bg-emerald-600 px-8 text-sm font-medium text-white shadow transition-colors hover:bg-emerald-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-700">
              <Download className="mr-2 h-4 w-4" /> डिजाइन डाउनलोड गर्नुहोस्
            </a>
          </div>
          <div className="w-full max-w-sm rounded-[2.5rem] overflow-hidden shadow-[0_0_60px_rgba(16,185,129,0.15)] border border-emerald-500/30 z-10">
            <img 
              src="/app-mockup.jpg" 
              alt="Hamro Mugu App UI Design" 
              className="w-full h-auto object-cover" 
            />
          </div>
        </div>
      </div>

      {/* NEW: Extra Logos Section */}
      <div className="max-w-6xl w-full bg-white/5 rounded-[3rem] p-8 sm:p-12 border border-white/10 relative overflow-hidden mb-12">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="relative z-10">
          <h2 className="text-2xl font-bold text-white mb-2 flex items-center justify-center gap-2">
            <ImageIcon className="w-6 h-6 text-purple-400" />
            थप नयाँ मुगु विशेष लोगोहरू (अति यथार्थवादी)
          </h2>
          <p className="text-gray-400 text-center mb-8">
            तपाईंको रोजाइ अनुसार तयार पारिएका प्रिमियम डिजाइनहरू।
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

            {/* NEW 8A: 3D Vibrant */}
            <div className="flex flex-col items-center text-center group bg-teal-500/5 rounded-2xl p-4 border border-teal-500/20">
              <div className="w-40 h-40 rounded-[2rem] overflow-hidden border border-teal-500/30 mb-4 shadow-[0_0_30px_rgba(20,184,166,0.2)] group-hover:scale-105 transition-transform">
                <img src="/mugu-logo-3d-v1.jpg" alt="Vibrant 3D Glass" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-teal-400 font-bold mb-1">८. मोडर्न थ्रीडी (भाइब्रेन्ट)</h3>
              <p className="text-gray-400 text-xs mb-2">चम्किलो र आकर्षक</p>
              <a href="/mugu-logo-3d-v1.jpg" download="mugu_logo_3d_vibrant.jpg" className="text-emerald-400 hover:text-emerald-300 text-sm flex items-center gap-1">
                <Download className="w-4 h-4" /> डाउनलोड
              </a>
            </div>

            {/* NEW 8B: 3D Crystal */}
            <div className="flex flex-col items-center text-center group bg-emerald-500/5 rounded-2xl p-4 border border-emerald-500/20">
              <div className="w-40 h-40 rounded-[2rem] overflow-hidden border border-emerald-500/30 mb-4 shadow-[0_0_30px_rgba(16,185,129,0.2)] group-hover:scale-105 transition-transform">
                <img src="/mugu-logo-3d-v2.jpg" alt="Crystal 3D Glass" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-emerald-400 font-bold mb-1">९. मोडर्न थ्रीडी (क्रिस्टल)</h3>
              <p className="text-gray-400 text-xs mb-2">प्रिमियम र सफा</p>
              <a href="/mugu-logo-3d-v2.jpg" download="mugu_logo_3d_crystal.jpg" className="text-emerald-400 hover:text-emerald-300 text-sm flex items-center gap-1">
                <Download className="w-4 h-4" /> डाउनलोड
              </a>
            </div>

            {/* NEW 8C: 3D Neon */}
            <div className="flex flex-col items-center text-center group bg-lime-500/5 rounded-2xl p-4 border border-lime-500/20">
              <div className="w-40 h-40 rounded-[2rem] overflow-hidden border border-lime-500/30 mb-4 shadow-[0_0_30px_rgba(132,204,22,0.2)] group-hover:scale-105 transition-transform">
                <img src="/mugu-logo-3d-v3.jpg" alt="Neon 3D" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-lime-400 font-bold mb-1">१०. मोडर्न थ्रीडी (नियोन)</h3>
              <p className="text-gray-400 text-xs mb-2">फ्युचरिस्टिक टेक डिजाइन</p>
              <a href="/mugu-logo-3d-v3.jpg" download="mugu_logo_3d_neon.jpg" className="text-emerald-400 hover:text-emerald-300 text-sm flex items-center gap-1">
                <Download className="w-4 h-4" /> डाउनलोड
              </a>
            </div>

            {/* NEW 11: Minimal Line Art */}
            <div className="flex flex-col items-center text-center group bg-zinc-800/50 rounded-2xl p-4 border border-zinc-600/30">
              <div className="w-40 h-40 rounded-[2rem] overflow-hidden border border-zinc-500/30 mb-4 shadow-lg group-hover:scale-105 transition-transform">
                <img src="/mugu-logo-minimal.jpg" alt="Minimal Line Art" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-zinc-300 font-bold mb-1">११. मिनिमल (Minimalist)</h3>
              <p className="text-gray-400 text-xs mb-2">सरल, प्रिमियम र सफा</p>
              <a href="/mugu-logo-minimal.jpg" download="mugu_logo_minimal.jpg" className="text-emerald-400 hover:text-emerald-300 text-sm flex items-center gap-1">
                <Download className="w-4 h-4" /> डाउनलोड
              </a>
            </div>

            {/* NEW 12: Watercolor */}
            <div className="flex flex-col items-center text-center group bg-sky-500/5 rounded-2xl p-4 border border-sky-500/20">
              <div className="w-40 h-40 rounded-[2rem] overflow-hidden border border-sky-500/30 mb-4 shadow-lg group-hover:scale-105 transition-transform">
                <img src="/mugu-logo-watercolor.jpg" alt="Watercolor Art" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-sky-400 font-bold mb-1">१२. वाटरकलर (Watercolor)</h3>
              <p className="text-gray-400 text-xs mb-2">कलात्मक र सुन्दर</p>
              <a href="/mugu-logo-watercolor.jpg" download="mugu_logo_watercolor.jpg" className="text-emerald-400 hover:text-emerald-300 text-sm flex items-center gap-1">
                <Download className="w-4 h-4" /> डाउनलोड
              </a>
            </div>

            {/* NEW 13: Vintage Stamp */}
            <div className="flex flex-col items-center text-center group bg-stone-500/10 rounded-2xl p-4 border border-stone-500/30">
              <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-stone-500/50 mb-4 shadow-lg group-hover:scale-105 transition-transform">
                <img src="/mugu-logo-vintage.jpg" alt="Vintage Stamp" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-stone-300 font-bold mb-1">१३. भिन्टेज स्ट्याम्प (Vintage)</h3>
              <p className="text-gray-400 text-xs mb-2">क्लासिक र भरपर्दो</p>
              <a href="/mugu-logo-vintage.jpg" download="mugu_logo_vintage.jpg" className="text-emerald-400 hover:text-emerald-300 text-sm flex items-center gap-1">
                <Download className="w-4 h-4" /> डाउनलोड
              </a>
            </div>

            {/* NEW 14: Material Design */}
            <div className="flex flex-col items-center text-center group bg-blue-500/5 rounded-2xl p-4 border border-blue-500/20">
              <div className="w-40 h-40 rounded-[2rem] overflow-hidden border border-blue-500/30 mb-4 shadow-lg group-hover:scale-105 transition-transform">
                <img src="/mugu-logo-material.jpg" alt="Material Design" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-blue-400 font-bold mb-1">१४. म्याटेरियल डिजाइन</h3>
              <p className="text-gray-400 text-xs mb-2">गुगल/एन्ड्रोइड स्टाइल</p>
              <a href="/mugu-logo-material.jpg" download="mugu_logo_material.jpg" className="text-emerald-400 hover:text-emerald-300 text-sm flex items-center gap-1">
                <Download className="w-4 h-4" /> डाउनलोड
              </a>
            </div>

            {/* NEW 15A: Neumorphism White */}
            <div className="flex flex-col items-center text-center group bg-gray-500/10 rounded-2xl p-4 border border-gray-500/20">
              <div className="w-40 h-40 rounded-[2rem] overflow-hidden border border-gray-400/30 mb-4 shadow-lg group-hover:scale-105 transition-transform">
                <img src="/mugu-logo-neu-v1.jpg" alt="Neumorphism White" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-gray-300 font-bold mb-1">१५ क. सफ्ट UI (सेतो)</h3>
              <p className="text-gray-400 text-xs mb-2">सफा र प्रिमियम</p>
              <a href="/mugu-logo-neu-v1.jpg" download="mugu_logo_neu_white.jpg" className="text-emerald-400 hover:text-emerald-300 text-sm flex items-center gap-1">
                <Download className="w-4 h-4" /> डाउनलोड
              </a>
            </div>

            {/* NEW 15B: Neumorphism Emerald */}
            <div className="flex flex-col items-center text-center group bg-emerald-500/10 rounded-2xl p-4 border border-emerald-500/20">
              <div className="w-40 h-40 rounded-[2rem] overflow-hidden border border-emerald-400/30 mb-4 shadow-lg group-hover:scale-105 transition-transform">
                <img src="/mugu-logo-neu-v2.jpg" alt="Neumorphism Emerald" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-emerald-400 font-bold mb-1">१५ ख. सफ्ट UI (हरियो)</h3>
              <p className="text-gray-400 text-xs mb-2">अर्गानिक र महँगो</p>
              <a href="/mugu-logo-neu-v2.jpg" download="mugu_logo_neu_emerald.jpg" className="text-emerald-400 hover:text-emerald-300 text-sm flex items-center gap-1">
                <Download className="w-4 h-4" /> डाउनलोड
              </a>
            </div>

            {/* NEW 15C: Neumorphism Dark */}
            <div className="flex flex-col items-center text-center group bg-zinc-800/50 rounded-2xl p-4 border border-zinc-600/30">
              <div className="w-40 h-40 rounded-[2rem] overflow-hidden border border-zinc-500/30 mb-4 shadow-lg group-hover:scale-105 transition-transform">
                <img src="/mugu-logo-neu-v3.jpg" alt="Neumorphism Dark" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-zinc-300 font-bold mb-1">१५ ग. सफ्ट UI (डार्क)</h3>
              <p className="text-gray-400 text-xs mb-2">मोडर्न डार्क मोड</p>
              <a href="/mugu-logo-neu-v3.jpg" download="mugu_logo_neu_dark.jpg" className="text-emerald-400 hover:text-emerald-300 text-sm flex items-center gap-1">
                <Download className="w-4 h-4" /> डाउनलोड
              </a>
            </div>

            {/* NEW 16: Modern Gradient */}
            <div className="flex flex-col items-center text-center group bg-green-500/5 rounded-2xl p-4 border border-green-500/20">
              <div className="w-40 h-40 rounded-[2rem] overflow-hidden border border-green-500/30 mb-4 shadow-lg group-hover:scale-105 transition-transform">
                <img src="/mugu-logo-gradient.jpg" alt="Modern Gradient Design" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-green-400 font-bold mb-1">१६. मोडर्न ग्रेडियन्ट</h3>
              <p className="text-gray-400 text-xs mb-2">एप्पल (iOS) एप स्टाइल</p>
              <a href="/mugu-logo-gradient.jpg" download="mugu_logo_gradient.jpg" className="text-emerald-400 hover:text-emerald-300 text-sm flex items-center gap-1">
                <Download className="w-4 h-4" /> डाउनलोड
              </a>
            </div>

            {/* NEW 17: GOLDEN COLLECTION */}
            {/* 17A: Luxury Gold */}
            <div className="flex flex-col items-center text-center group bg-yellow-500/5 rounded-2xl p-4 border border-yellow-500/20">
              <div className="w-40 h-40 rounded-[2rem] overflow-hidden border border-yellow-500/30 mb-4 shadow-[0_0_30px_rgba(234,179,8,0.2)] group-hover:scale-105 transition-transform">
                <img src="/mugu-logo-luxury-gold.jpg" alt="Luxury Gold" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-yellow-400 font-bold mb-1">१७ क. लक्जरी गोल्ड</h3>
              <p className="text-gray-400 text-xs mb-2">सुनौलो र महँगो</p>
              <a href="/mugu-logo-luxury-gold.jpg" download="mugu_logo_luxury_gold.jpg" className="text-emerald-400 hover:text-emerald-300 text-sm flex items-center gap-1">
                <Download className="w-4 h-4" /> डाउनलोड
              </a>
            </div>

            {/* 17B: Real Gold Metal */}
            <div className="flex flex-col items-center text-center group bg-yellow-600/10 rounded-2xl p-4 border border-yellow-600/30">
              <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-yellow-600/50 mb-4 shadow-lg group-hover:scale-105 transition-transform">
                <img src="/mugu-logo-real-gold.jpg" alt="Real Gold Emblem" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-yellow-500 font-bold mb-1">१७ ख. रियल गोल्ड मेडल</h3>
              <p className="text-gray-400 text-xs mb-2">सुनको छाप जस्तो</p>
              <a href="/mugu-logo-real-gold.jpg" download="mugu_logo_real_gold.jpg" className="text-emerald-400 hover:text-emerald-300 text-sm flex items-center gap-1">
                <Download className="w-4 h-4" /> डाउनलोड
              </a>
            </div>

            {/* 17C: Soft Gold (Original Gold) */}
            <div className="flex flex-col items-center text-center group bg-yellow-700/5 rounded-2xl p-4 border border-yellow-700/20">
              <div className="w-40 h-40 rounded-[2rem] overflow-hidden border border-yellow-600/30 mb-4 shadow-[0_0_30px_rgba(202,138,4,0.1)] group-hover:scale-105 transition-transform">
                <img src="/mugu-logo-gold.jpg" alt="Soft Gold" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-yellow-300 font-bold mb-1">१७ ग. सफ्ट गोल्ड</h3>
              <p className="text-gray-400 text-xs mb-2">सिम्पल र क्लासिक</p>
              <a href="/mugu-logo-gold.jpg" download="mugu_logo_soft_gold.jpg" className="text-emerald-400 hover:text-emerald-300 text-sm flex items-center gap-1">
                <Download className="w-4 h-4" /> डाउनलोड
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <a 
          href="/" 
          className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white transition-colors inline-block"
        >
          मुख्य पेजमा फर्किनुहोस्
        </a>
      </div>
    </div>
  );
}
