import { Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bento-card bg-[#1c1917] text-stone-300 p-6 md:p-8 border border-stone-800 mt-2">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 w-full">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#d97706] text-[#fffbeb] flex items-center justify-center text-sm font-bold">
            N
          </div>
          <div className="flex flex-col">
            <h2 className="text-sm font-extrabold text-stone-100 tracking-widest uppercase">নঙ্গর রেস্তোরাঁ</h2>
            <p className="text-[10px] text-stone-400 font-medium">সাশ্রয়ী মূল্যে সুস্বাদু খাবার</p>
          </div>
        </div>

        <div className="flex items-center gap-6 text-xs font-semibold">
          <a href="tel:+8801919671919" className="hover:text-stone-100 transition-colors">
            +880 1919-671919
          </a>
          <a href="mailto:nongorrestora.patiya@yahoo.com" className="hover:text-stone-100 transition-colors hidden sm:block">
            nongorrestora.patiya@yahoo.com
          </a>
        </div>

          <div className="flex gap-4">
            <a 
              href="https://www.facebook.com/share/18PGixzXJu/"
              target="_blank"
              rel="noreferrer"
              className="text-stone-500 hover:text-stone-200 transition-colors"
            >
              <Facebook className="w-5 h-5" />
            </a>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-stone-800 text-center text-[10px] text-stone-500 font-bold uppercase tracking-wider flex flex-col md:flex-row justify-between items-center w-full">
          <p>© {new Date().getFullYear()} NONGOR RESTORA. <a href="#admin" className="ml-2 hover:text-white underline">Admin Portal</a></p>
          <p className="mt-2 md:mt-0">PATIYA, CHATTOGRAM</p>
        </div>
    </footer>
  );
}
