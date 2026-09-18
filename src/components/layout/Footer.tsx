import { Link } from "react-router-dom";
import { Mail, MapPin, Phone, Lock } from "lucide-react";
import { APP_CONFIG } from "@/config";
import { useSettings } from "@/hooks/useSettings";

export function Footer() {
  const { settings } = useSettings();
  const phone = !settings.loading ? settings.phone : APP_CONFIG.CONTACT.PHONE;
  const email = !settings.loading ? settings.email : APP_CONFIG.CONTACT.EMAIL;
  const location = !settings.loading ? settings.location : APP_CONFIG.CONTACT.LOCATION;
  const apkUrl = !settings.loading ? settings.apkUrl : APP_CONFIG.APK_DOWNLOAD_URL;

  return (
    <footer className="bg-black/20 backdrop-blur-sm border-t border-white/5 text-gray-400 relative z-20">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-3 font-semibold text-xl tracking-tight text-white mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-sm text-white">
                M
              </div>
              <span>{APP_CONFIG.BRAND_NAME}</span>
            </Link>
            <p className="text-sm text-gray-500 mb-6 leading-relaxed">
              मुगु, हुम्ला र जुम्लाका अग्र्यानिक उत्पादनहरू (मार्सी, स्याउ, सिमी, घिउ, ओखर र मह) सिधै काठमाडौँ र देशभरका ग्राहक तथा व्यापारीसम्म पुर्‍याउने डिजिटल प्लेटफर्म।
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-200 mb-4">Quick Links</h3>
            <ul className="space-y-3 text-sm text-gray-500">
              <li>
                <Link to="/" className="hover:text-blue-400 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/download" className="hover:text-blue-400 transition-colors">Download App</Link>
              </li>
              <li>
                <a href="/#features" className="hover:text-blue-400 transition-colors">Features</a>
              </li>
              <li>
                <a href="/#about" className="hover:text-blue-400 transition-colors">About Us</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-200 mb-4">Legal & Privacy</h3>
            <ul className="space-y-3 text-sm text-gray-500">
              <li>
                <Link to="/privacy-policy" className="hover:text-blue-400 transition-colors">Privacy Policy (गोपनीयता नीति)</Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-blue-400 transition-colors">Terms of Service (नियम तथा सर्तहरू)</Link>
              </li>
            </ul>
          </div>

          <div id="contact">
            <h3 className="font-semibold text-gray-200 mb-4 text-[10px] uppercase tracking-widest">Contact Information</h3>
            <ul className="space-y-3 text-sm text-gray-500">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-blue-500 shrink-0" />
                <span>{location}</span>
              </li>
              {phone && (
                <li className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-blue-500 shrink-0" />
                  <a href={`tel:${phone}`} className="hover:text-white transition-colors">{phone}</a>
                </li>
              )}
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-blue-500 shrink-0" />
                <a href={`mailto:${email}`} className="hover:text-white transition-colors">{email}</a>
              </li>
            </ul>
          </div>
          
        </div>
        
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-600">
          <div className="flex flex-col gap-1">
            <p>© {new Date().getFullYear()} {APP_CONFIG.BRAND_NAME}. All rights reserved.</p>
            <div className="flex items-center gap-2">
              <span className="text-gray-500 font-medium tracking-wide">MADE By SMT THAKURI</span>
              {/* Discreet Secret Admin Link for Owner only */}
              <Link 
                to="/login" 
                title="Staff / Admin Portal" 
                className="text-gray-700 hover:text-gray-400 transition-colors p-1"
              >
                <Lock className="w-3 h-3" />
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-bold tracking-widest text-gray-500">Installation Config:</span>
            <div className="text-[10px] font-mono text-blue-400 bg-blue-400/5 px-2 py-1 rounded border border-blue-400/20">
              APK_DOWNLOAD_URL = '{apkUrl || "NOT SET"}'
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
