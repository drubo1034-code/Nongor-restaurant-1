import { motion } from "motion/react";

const galleryImages = [
  { id: 1, src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80", alt: "নঙ্গর রেস্তোরাঁর মনোরম ইন্টেরিয়র ১" },
  { id: 2, src: "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=800&q=80", alt: "অসাধারণ ডাইনিং অভিজ্ঞতা" },
  { id: 3, src: "https://images.unsplash.com/photo-1502301103665-0b95cc738daf?auto=format&fit=crop&w=800&q=80", alt: "বসার সুন্দর পরিবেশ" },
  { id: 4, src: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=800&q=80", alt: "রেস্তোরাঁর সুন্দর ডেকোরেশন" },
  { id: 5, src: "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?auto=format&fit=crop&w=800&q=80", alt: "নঙ্গর রেস্তোরাঁর চমৎকার পরিবেশ" },
];

export default function Gallery() {
  return (
    <section id="gallery" className="bento-card bg-[#1c1917] overflow-hidden">
      <div className="p-6 md:p-8 lg:p-10 border-b border-stone-800">
        <h2 className="text-2xl md:text-3xl font-extrabold text-stone-100 flex items-center gap-3">
          আমাদের নান্দনিক পরিবেশ
        </h2>
        <p className="text-stone-400 mt-2 text-sm max-w-lg">
          নঙ্গর রেস্তোরাঁর সুন্দর ও স্বাগত জানানো পরিবেশ উপভোগ করুন। আপনার পারিবারিক আনন্দ উদযাপন ও আড্ডার জন্য এক নিখুঁত জায়গা।
        </p>
      </div>

      <div className="relative w-full overflow-hidden flex items-center py-8">
        <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-[#1c1917] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-[#1c1917] to-transparent z-10 pointer-events-none" />
        
        <div className="flex animate-marquee w-max gap-4 px-4 hover:cursor-grab active:cursor-grabbing">
          {[...galleryImages, ...galleryImages].map((image, index) => (
            <div
              key={`${image.id}-${index}`}
              className="relative w-[280px] md:w-[400px] h-[200px] md:h-[280px] rounded-2xl overflow-hidden bg-stone-900 border border-stone-800 shadow-xl flex-shrink-0 group"
            >
              <div className="absolute inset-0 bg-stone-800 animate-pulse z-0 flex items-center justify-center text-stone-600 text-[10px] font-bold uppercase tracking-widest">
                Loading...
              </div>
              <img
                src={image.src}
                alt={image.alt}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 z-10 relative"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c0a09]/80 via-[#0c0a09]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 flex flex-col justify-end p-4 md:p-6 pointer-events-none">
                <h3 className="text-stone-100 font-bold translate-y-2 group-hover:translate-y-0 text-xs md:text-sm tracking-wide transition-transform duration-500 drop-shadow-md">
                  {image.alt}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
