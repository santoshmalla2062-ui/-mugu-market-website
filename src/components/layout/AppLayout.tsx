import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export function AppLayout() {
  const { pathname } = useLocation();
  const isFullScreenPage = pathname === "/login" || pathname === "/design-preview";

  if (isFullScreenPage) {
    return (
      <main className="flex-1 flex flex-col min-h-screen">
        <Outlet />
      </main>
    );
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
