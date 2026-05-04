import { useState, useEffect } from "react";
import { Menu as MenuIcon, X, Phone, Package } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import MyOrdersModal from "./MyOrdersModal";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);

  useEffect(() => {
    const handleOpenOrders = () => setIsOrdersOpen(true);
    window.addEventListener('open-orders', handleOpenOrders);
    return () => window.removeEventListener('open-orders', handleOpenOrders);
  }, []);

  const navLinks = [
    { name: "হোম", href: "#home" },
    { name: "আমাদের সম্পর্কে", href: "#about" },
    { name: "মেনু", href: "#menu" },
    { name: "রিভিউ", href: "#reviews" },
    { name: "যোগাযোগ", href: "#contact" },
  ];

  return (
    <>
      <header className="flex items-center justify-between h-16 bg-[#1c1917] rounded-3xl px-6 md:px-8 shadow-sm border border-stone-800 relative z-40 flex-shrink-0">
        <div className="container mx-auto flex items-center justify-between w-full relative">
          <a href="#home" className="flex items-center gap-3 group shrink-0 py-2">
            <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-[#991b1b] rounded-full drop-shadow-md group-hover:scale-105 transition-transform">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="w-5 h-5 md:w-6 md:h-6 text-white"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/>
                <path d="m12 11 3-3-3-3-3 3 3 3"/>
                <path d="m12 11-3 3 3 3 3-3-3-3"/>
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg md:text-xl text-stone-100 tracking-tight leading-none group-hover:text-stone-300 transition-colors">
                NONGOR
              </span>
              <span className="font-medium text-[10px] md:text-xs text-[#991b1b] tracking-widest uppercase">
                Restora
              </span>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="font-semibold text-sm text-stone-400 hover:text-stone-100 transition-colors"
              >
                {link.name}
              </a>
            ))}
            <button
              onClick={() => setIsOrdersOpen(true)}
              className="font-bold text-sm text-[#d97706] hover:text-yellow-400 transition-colors flex items-center gap-1.5"
            >
              <Package className="w-4 h-4" />
              আমার অর্ডার
            </button>
            <a
              href="tel:+8801919671919"
              className="bg-[#991b1b] text-white px-5 py-2 rounded-full text-xs font-bold hover:bg-[#7f1d1d] transition flex items-center gap-2"
            >
              <Phone className="w-3 h-3" />
              কল করুন
            </a>
          </nav>

          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setIsOrdersOpen(true)}
              className="px-3 py-1.5 text-[#d97706] hover:bg-stone-800/80 rounded-full transition-colors flex items-center gap-1.5 bg-stone-800/50"
              aria-label="আমার অর্ডার"
            >
              <Package className="w-4 h-4" />
              <span className="text-xs font-bold">আমার অর্ডার</span>
            </button>
            <button
              className="p-2 text-stone-300 hover:bg-stone-800 rounded-full transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X /> : <MenuIcon />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto", marginTop: "1rem" }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              className="md:hidden bg-[#1c1917] text-stone-200 rounded-2xl border border-stone-800 overflow-hidden shadow-lg absolute top-full left-0 right-0 w-full"
            >
              <div className="flex flex-col px-4 py-4 space-y-2">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="font-semibold text-sm border-b border-stone-800/50 pb-2 pt-2 px-2 hover:bg-stone-800/50 rounded text-stone-300"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </a>
                ))}
                
                <a
                  href="tel:+8801919671919"
                  className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#991b1b] text-white font-bold text-sm mt-2"
                  onClick={() => setIsOpen(false)}
                >
                  <Phone className="w-5 h-5" />
                  <span>কল করুন</span>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <MyOrdersModal isOpen={isOrdersOpen} onClose={() => setIsOrdersOpen(false)} />
    </>
  );
}
