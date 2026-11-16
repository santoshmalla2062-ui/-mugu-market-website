import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { APP_CONFIG } from "@/config";
import { Button } from "@/components/ui/button";
import appLogo from "@/assets/images/logo_final_polished_nature_1788511126581.jpg";

export function Navbar() {
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-black/20 backdrop-blur-md">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link to="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 font-semibold text-xl tracking-tight text-white group">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/20 shadow-lg group-hover:scale-105 transition-transform">
                <img src={appLogo} alt="Mugu Local Market Logo" className="w-full h-full object-cover" />
              </div>
              <span>{APP_CONFIG.BRAND_NAME}</span>
            </Link>
          </div>
          
          <nav className="hidden md:flex items-center gap-8 h-full">
            <Link
              to="/"
              className={`text-sm font-medium h-full flex items-center transition-colors ${
                pathname === "/"
                  ? "tab-active hover:text-white"
                  : "text-gray-400 hover:text-white border-b-2 border-transparent hover:border-white/20"
              }`}
            >
              Home
            </Link>
            <Link to="/#features" className="text-sm font-medium h-full flex items-center text-gray-400 hover:text-white transition-colors border-b-2 border-transparent hover:border-white/20">
              Features
            </Link>
            <Link to="/#market-index" className="text-sm font-medium h-full flex items-center text-gray-400 hover:text-white transition-colors border-b-2 border-transparent hover:border-white/20">
              Products
            </Link>
            <Link to="/#contact-hub" className="text-sm font-medium h-full flex items-center text-emerald-400 hover:text-emerald-300 transition-colors border-b-2 border-transparent hover:border-emerald-400/40">
              Contact
            </Link>
            <Link to="/#about" className="text-sm font-medium h-full flex items-center text-gray-400 hover:text-white transition-colors border-b-2 border-transparent hover:border-white/20">
              About Us
            </Link>
          </nav>

          <div className="flex items-center gap-2 sm:gap-4">
            <Button variant="outline" asChild className="hidden sm:inline-flex rounded-full text-xs font-semibold px-5">
              <Link to="/terms">
                Terms
              </Link>
            </Button>
            <Button asChild className="inline-flex rounded-full text-xs font-bold px-4 sm:px-6">
              <Link to="/download">
                Get App
              </Link>
            </Button>
            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-white/5 text-gray-200 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#0a0c14]/95 backdrop-blur-lg">
          <nav className="container mx-auto max-w-7xl px-4 py-4 flex flex-col gap-1">
            <Link
              to="/"
              onClick={() => setMobileOpen(false)}
              className={`px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                pathname === "/" ? "bg-blue-600/15 text-blue-400" : "text-gray-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              Home
            </Link>
            <Link
              to="/#features"
              onClick={() => setMobileOpen(false)}
              className="px-3 py-2.5 rounded-xl text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
            >
              Features
            </Link>
            <Link
              to="/#market-index"
              onClick={() => setMobileOpen(false)}
              className="px-3 py-2.5 rounded-xl text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
            >
              Products
            </Link>
            <Link
              to="/#contact-hub"
              onClick={() => setMobileOpen(false)}
              className="px-3 py-2.5 rounded-xl text-sm font-medium text-emerald-400 hover:bg-white/5 transition-colors"
            >
              Contact
            </Link>
            <Link
              to="/#about"
              onClick={() => setMobileOpen(false)}
              className="px-3 py-2.5 rounded-xl text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
            >
              About Us
            </Link>
            <Link
              to="/terms"
              onClick={() => setMobileOpen(false)}
              className="px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:bg-white/5 hover:text-white transition-colors sm:hidden"
            >
              Terms
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
