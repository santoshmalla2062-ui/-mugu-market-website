import React from "react";
import { Download, Sparkles } from "lucide-react";
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
