import { Link } from "react-router-dom";
import { APP_CONFIG } from "@/config";
import { Button } from "@/components/ui/button";
import appLogo from "@/assets/images/logo_final_polished_nature_1788511126581.jpg";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-black/20 backdrop-blur-md">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-3 font-semibold text-xl tracking-tight text-white group">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/20 shadow-lg group-hover:scale-105 transition-transform">
                <img src={appLogo} alt="Mugu Local Market Logo" className="w-full h-full object-cover" />
              </div>
              <span>{APP_CONFIG.BRAND_NAME}</span>
            </Link>
          </div>
          
          <nav className="hidden md:flex items-center gap-8 h-full">
            <Link to="/" className="text-sm font-medium h-full flex items-center tab-active hover:text-white transition-colors">
              Home
            </Link>
            <a href="/#features" className="text-sm font-medium h-full flex items-center text-gray-400 hover:text-white transition-colors border-b-2 border-transparent hover:border-white/20">
              Features
            </a>
            <a href="/#produce" className="text-sm font-medium h-full flex items-center text-gray-400 hover:text-white transition-colors border-b-2 border-transparent hover:border-white/20">
              Products
            </a>
            <a href="/#contact-hub" className="text-sm font-medium h-full flex items-center text-emerald-400 hover:text-emerald-300 transition-colors border-b-2 border-transparent hover:border-emerald-400/40">
              Contact
            </a>
            <a href="/#about" className="text-sm font-medium h-full flex items-center text-gray-400 hover:text-white transition-colors border-b-2 border-transparent hover:border-white/20">
              About Us
            </a>
          </nav>

          <div className="flex items-center gap-2 sm:gap-4">
            <Button variant="outline" asChild className="hidden sm:inline-flex rounded-full text-xs font-semibold px-5">
              <Link to="/terms">Terms</Link>
            </Button>
            <Button asChild className="inline-flex rounded-full text-xs font-bold px-4 sm:px-6">
              <Link to="/download">
                Get App
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
