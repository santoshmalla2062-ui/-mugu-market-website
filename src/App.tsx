/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { AppLayout } from "./components/layout/AppLayout";
import Home from "./pages/Home";
import Download from "./pages/Download";
import PrivacyPolicy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import DesignPreview from "./pages/DesignPreview";

function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    // Attempt to handle hash scrolling for #features and #about links
    if (window.location.hash) {
      const element = document.getElementById(window.location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/download" element={<Download />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/design-preview" element={<DesignPreview />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

