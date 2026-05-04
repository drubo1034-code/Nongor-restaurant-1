/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Menu from "./components/Menu";
import Gallery from "./components/Gallery";
import Reviews from "./components/Reviews";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import CartSidebar from "./components/CartSidebar";
import Admin from "./components/Admin";

export default function App() {
  const [currentHash, setCurrentHash] = useState(window.location.hash);

  useEffect(() => {
    const handleHashChange = () => setCurrentHash(window.location.hash);
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return (
    <div className="font-sans antialiased min-h-screen flex flex-col p-4 md:p-6 lg:p-8 gap-6 max-w-[1400px] mx-auto selection:bg-amber-900 selection:text-amber-100">
      <Navbar />
      <main className="flex flex-col gap-6 w-full">
        {currentHash === "#admin" ? (
          <Admin />
        ) : (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Hero />
              <About />
            </div>
            <Gallery />
            <Menu />
            <Reviews />
            <Contact />
          </>
        )}
      </main>
      <Footer />
      <FloatingWhatsApp />
      {currentHash !== "#admin" && <CartSidebar />}
    </div>
  );
}
