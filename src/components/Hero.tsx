import { motion } from "motion/react";

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.489-1.761-1.663-2.06-.173-.299-.018-.461.13-.611.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
  </svg>
);

export default function Hero() {
  return (
    <section 
      id="home" 
      className="bento-card relative p-8 md:p-12 lg:p-16 justify-end lg:col-span-2 min-h-[400px] lg:min-h-[500px] bg-zinc-900"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&w=1920&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20 z-0"></div>
      
      <div className="absolute top-6 right-6 bg-[#d97706] text-amber-50 px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-widest z-20 shadow-sm border border-amber-500/50">
        গরম ও তাজা
      </div>

      <div className="relative z-10 sm:max-w-2xl mt-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-stone-100 tracking-tight mb-4 leading-none drop-shadow-lg">
            সাশ্রয়ী মূল্যে<br/>সুস্বাদু খাবার
          </h1>
          <p className="text-lg md:text-xl text-stone-300 mb-8 max-w-md font-medium leading-snug drop-shadow">
            পটিয়ার সেরা রেস্তোরাঁয় আপনাকে স্বাগতম। নদীর মোহনায় আমাদের আসল বাঙালি ও চাইনিজ খাবারের স্বাদ নিন।
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-start gap-4">
            <a
              href="https://wa.me/8801919671919"
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-6 py-3 bg-[#1c1917]/80 backdrop-blur-md border border-stone-700 text-stone-200 font-bold rounded-2xl shadow-lg hover:bg-stone-800 hover:border-stone-500 hover:scale-105 transition-all duration-300 text-sm flex items-center justify-center gap-3"
            >
              <WhatsAppIcon className="w-5 h-5" />
              <span>হোয়াটসঅ্যাপে অর্ডার করুন</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
