import { Utensils, HeartHandshake, Wallet } from "lucide-react";
import { motion } from "motion/react";

export default function About() {
  const features = [
    {
      icon: <Utensils className="w-8 h-8 text-red-600" />,
      title: "বাংলা ও চাইনিজ",
      description: "ঐতিহ্যবাহী বাঙালি এবং মজাদার চাইনিজ খাবারের এক অনন্য স্বাদ।"
    },
    {
      icon: <Wallet className="w-8 h-8 text-red-600" />,
      title: "সাশ্রয়ী মূল্য",
      description: "আপনাদের বাজেটের মধ্যেই সেরা মানের সুস্বাদু খাবার।"
    },
    {
      icon: <HeartHandshake className="w-8 h-8 text-red-600" />,
      title: "পারিবারিক পরিবেশ",
      description: "পরিবার ও বন্ধুদের সাথে আড্ডা ও খাওয়া-দাওয়ার জন্য মনরোম পরিবেশ।"
    }
  ];

  return (
    <section id="about" className="bento-card p-6 md:p-8 lg:p-10 shadow-sm border-l-4 border-l-[#d97706] lg:col-span-1 border-t-0 space-y-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h3 className="text-xs font-bold text-[#d97706] uppercase tracking-widest mb-2">আমাদের সম্পর্কে</h3>
        <p className="text-sm md:text-base text-stone-300 leading-snug font-medium mb-6">
          পটিয়ার সেরা বাঙালি ও চাইনিজ রেস্তোরাঁ। সাশ্রয়ী, পারিবারিক এবং সব ধরনের অনুষ্ঠানের জন্য উপযুক্ত।
          <br className="mb-2"/><span className="text-stone-400 font-normal">নির্ভেজাল ও সুস্বাদু খাবারের নির্ভরযোগ্য প্রতিষ্ঠান।</span>
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-4 flex-grow content-end">
        {features.map((feature, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="bg-[#292524] p-4 rounded-2xl shadow-sm border border-stone-800 flex items-center gap-4"
          >
            <div className="w-12 h-12 bg-stone-900 rounded-xl shadow-sm flex items-center justify-center flex-shrink-0 text-[#d97706]">
              {feature.icon}
            </div>
            <div>
              <h3 className="font-bold text-sm text-stone-200">{feature.title}</h3>
              <p className="text-xs text-stone-400 font-medium line-clamp-2">{feature.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
