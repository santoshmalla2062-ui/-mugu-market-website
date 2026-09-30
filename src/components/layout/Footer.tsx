import { Link } from "react-router-dom";
import { Mail, MapPin, Phone, Lock, ShieldCheck, Heart } from "lucide-react";
import { APP_CONFIG } from "@/config";
import { useSettings } from "@/hooks/useSettings";

export function Footer() {
  const { settings } = useSettings();
  const phone = !settings.loading ? settings.phone : APP_CONFIG.CONTACT.PHONE;
  const email = !settings.loading ? settings.email : APP_CONFIG.CONTACT.EMAIL;
  const location = !settings.loading ? settings.location : APP_CONFIG.CONTACT.LOCATION;

  return (
    <footer className="bg-[#05070f] border-t border-white/10 text-gray-400 relative z-20">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-3 font-bold text-xl tracking-tight text-white mb-4">
              <img 
                src="/mugu-logo.jpg" 
                alt={APP_CONFIG.BRAND_NAME} 
                className="w-9 h-9 rounded-xl object-cover border border-white/15 shadow-md"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/icon-192.png";
                }} 
              />
              <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                {APP_CONFIG.BRAND_NAME}
              </span>
            </Link>
            <p className="text-xs sm:text-sm text-gray-400 mb-4 leading-relaxed">
              मुगु, हुम्ला र जुम्लाका अग्र्यानिक उत्पादनहरू (मार्सी, स्याउ, सिमी, घिउ, ओखर र मह) सिधै काठमाडौँ र देशभरका ग्राहक तथा व्यापारीसम्म पुर्‍याउने डिजिटल प्लेटफर्म।
            </p>
            <div className="flex items-center gap-2 text-[11px] text-emerald-400 font-semibold bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full w-fit">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>१००% प्राङ्गारिक ग्यारेन्टी</span>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-white text-sm mb-4 tracking-wide uppercase">Quick Links</h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-gray-400">
              <li>
                <Link to="/" className="hover:text-emerald-400 transition-colors">Home (गृहपृष्ठ)</Link>
              </li>
              <li>
                <Link to="/download" className="hover:text-emerald-400 transition-colors">Download App (एप डाउनलोड)</Link>
              </li>
              <li>
                <a href="/#market-index" className="hover:text-emerald-400 transition-colors">Market Rate Index (मण्डी दर)</a>
              </li>
              <li>
                <a href="/#services" className="hover:text-emerald-400 transition-colors">Ecosystem (सेवा सञ्जाल)</a>
              </li>
              <li>
                <a href="/#about" className="hover:text-emerald-400 transition-colors">About Us (हाम्रोबारे)</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white text-sm mb-4 tracking-wide uppercase">Legal & Security</h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-gray-400">
              <li>
                <Link to="/privacy-policy" className="hover:text-emerald-400 transition-colors">Privacy Policy (गोपनीयता नीति)</Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-emerald-400 transition-colors">Terms of Service (नियम तथा सर्तहरू)</Link>
              </li>
              <li>
                <span className="text-gray-500 text-xs">Direct Farmer-to-Consumer Link</span>
              </li>
              <li>
                <span className="text-gray-500 text-xs">Zero Middleman Surcharge</span>
              </li>
            </ul>
          </div>

          <div id="contact">
            <h3 className="font-bold text-white text-sm mb-4 tracking-wide uppercase">Contact Information</h3>
            <ul className="space-y-3 text-xs sm:text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-gray-300">{location}</span>
              </li>
              {phone && (
                <li className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-emerald-400 shrink-0" />
                  <a href={`tel:${phone}`} className="text-white hover:text-emerald-400 font-semibold transition-colors">{phone}</a>
                </li>
              )}
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-emerald-400 shrink-0" />
                <a href={`mailto:${email}`} className="hover:text-white transition-colors">{email}</a>
              </li>
            </ul>
          </div>
          
        </div>
        
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div className="flex flex-col sm:flex-row items-center gap-2">
            <p>© {new Date().getFullYear()} {APP_CONFIG.BRAND_NAME}. All rights reserved.</p>
            <span className="hidden sm:inline text-gray-700">•</span>
            <div className="flex items-center gap-1.5 text-gray-400">
              <span>Dedicated to the Mountain Farmers of Mugu, Humla & Jumla</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-gray-500 font-medium tracking-wide">MADE By SMT THAKURI</span>
            {/* Discreet Secret Admin Link for Owner only */}
            <Link 
              to="/login" 
              title="Staff / Admin Portal" 
              className="text-gray-600 hover:text-gray-300 transition-colors p-1"
            >
              <Lock className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
