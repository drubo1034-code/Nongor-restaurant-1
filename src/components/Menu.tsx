import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { menuData } from "../data/menu";
import { cn } from "../lib/utils";
import { useCartStore } from "../store/cartStore";
import { Plus } from "lucide-react";
import { collection, query, onSnapshot } from "firebase/firestore";
import { db, handleFirestoreError, OperationType } from "../lib/firebase";

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

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState(menuData[0].id);
  const addItem = useCartStore((state) => state.addItem);
  const [firestoreItems, setFirestoreItems] = useState<any[]>([]);

  useEffect(() => {
    const q = query(collection(db, 'menuItems'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
        const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setFirestoreItems(items);
    }, (error) => {
        handleFirestoreError(error, OperationType.LIST, 'menuItems');
    });
    return () => unsubscribe();
  }, []);

  const handleAddToCart = (item: any) => {
    addItem({
      id: item.id,
      name: item.nameBn || item.nameEn,
      price: parseInt(item.price, 10),
      quantity: 1
    });
  };

  // Merge categories from static data, but use firestore items if they exist
  const getCategoryItems = (categoryId: string) => {
      const dbItems = firestoreItems.filter(item => item.categoryId === categoryId);
      if (dbItems.length > 0) return dbItems;
      return menuData.find(c => c.id === categoryId)?.items || [];
  };

  const activeItems = getCategoryItems(activeCategory);

  return (
    <section id="menu" className="bento-card p-6 md:p-8 lg:p-10 shadow-sm border border-stone-800 bg-[#1c1917]">
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4 border-b border-stone-800 pb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-stone-100 flex items-center gap-3">
            আমাদের মেনু <span className="text-[10px] bg-[#991b1b] text-white px-2 py-1 rounded leading-none">জনপ্রিয়</span>
          </h2>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center justify-start gap-2 mb-8">
        {menuData.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={cn(
              "px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 border",
              activeCategory === category.id
                ? "bg-[#991b1b] text-white border-[#991b1b] shadow-sm transform scale-105"
                : "bg-stone-900 text-stone-400 border-stone-800 hover:bg-stone-800 hover:text-stone-200"
            )}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Menu Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        <AnimatePresence mode="popLayout">
          {activeItems.map((item, index) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              key={item.id}
              className="group relative bg-[#2a2623] border border-stone-800/80 hover:border-amber-500/50 rounded-xl p-1 pr-2 pl-4 flex flex-row items-center justify-between gap-3 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-amber-600/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              
              <div className="flex items-center gap-3 flex-1 min-w-0 py-2 relative z-10">
                <span className="text-amber-500/80 font-mono text-xs font-bold w-4 shrink-0 text-center">
                  {index + 1}
                </span>
                <div className="w-[1px] h-6 bg-stone-700/80" />
                <div className="flex flex-col gap-0.5 min-w-0">
                  <h3 className="font-bold text-[14px] text-white truncate group-hover:text-amber-400 transition-colors tracking-wide drop-shadow-sm">
                    {item.nameBn}
                  </h3>
                  <p className="text-[11px] font-medium text-stone-300 truncate tracking-wide">{item.nameEn}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 shrink-0 relative z-10">
                <div className="font-bold text-amber-400 text-[15px] tracking-wide">
                  ৳{item.price}
                </div>
                
                <button
                  onClick={() => handleAddToCart(item)}
                  title="কার্টে যোগ করুন"
                  className="w-8 h-8 flex items-center justify-center rounded-[10px] bg-[#1c1917] text-stone-200 hover:text-white hover:bg-amber-600 border border-stone-700/80 hover:border-transparent transition-all shadow-sm active:scale-95 shrink-0"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
            ))}
          </AnimatePresence>
      </div>
    </section>
  );
}
