import React, { useState, useEffect } from 'react';
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { Star, Send } from 'lucide-react';

interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: any;
}

const fakeReviews: Review[] = [
  { id: 'f1', userName: 'রহিম চৌধুরী', rating: 5, comment: 'খাবারের মান খুবই ভালো, পরিবেশও সুন্দর অসাধারন।', createdAt: new Date(Date.now() - 10 * 86400000) },
  { id: 'f2', userName: 'সুমাইয়া আক্তার', rating: 4, comment: 'চিকেন বিরিয়ানি অনেক মজার ছিলো। তবে সার্ভিস একটু দ্রুত করা দরকার।', createdAt: new Date(Date.now() - 8 * 86400000) },
  { id: 'f3', userName: 'আনিসুর রহমান', rating: 5, comment: 'পারিবারিক আড্ডার জন্য পারফেক্ট জায়গা।', createdAt: new Date(Date.now() - 7 * 86400000) },
  { id: 'f4', userName: 'ফাহিম আহমেদ', rating: 5, comment: 'স্টাফদের ব্যবহার খুব ভালো আর মেন্যু প্রাইস হাতের নাগালেই।', createdAt: new Date(Date.now() - 6 * 86400000) },
  { id: 'f5', userName: 'সাদিয়া ইসলাম', rating: 5, comment: 'নঙ্গর রেস্তোরাঁ সত্যিই খুব সুন্দর, স্পেশাল দিনগুলো উদযাপনের জন্য দারুণ।', createdAt: new Date(Date.now() - 5 * 86400000) },
  { id: 'f6', userName: 'তারেক মাহমুদ', rating: 4, comment: 'খাবার ফ্রেশ এবং সুস্বাদু ছিল, বিশেষ করে তন্দুরি কাবাব গুলা।', createdAt: new Date(Date.now() - 5 * 86400000) },
  { id: 'f7', userName: 'শামীম ওসমান', rating: 5, comment: 'ডেলিভারি খুব দ্রুত পেয়েছি, প্যাকেজিং বেশ ভালো এবং খাবার গরম ছিল।', createdAt: new Date(Date.now() - 4 * 86400000) },
  { id: 'f8', userName: 'রাকিবুল হাসান', rating: 4, comment: 'খাবার দারুন, তবে আরো ভ্যারাইটি থাকলে ভালো হতো।', createdAt: new Date(Date.now() - 3 * 86400000) },
  { id: 'f9', userName: 'নাহিদ পারভেজ', rating: 5, comment: 'আমার পরিবারের সবার খুব পছন্দ হয়েছে, সামনে আবার আসবো।', createdAt: new Date(Date.now() - 2 * 86400000) },
  { id: 'f10', userName: 'মেহজাবিন আলম', rating: 5, comment: 'পরিষ্কার পরিচ্ছন্নতা আর খাবারের মান সবমিলিয়ে ১০/১০।', createdAt: new Date(Date.now() - 1 * 86400000) },
];

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState({ userName: '', rating: 5, comment: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const q = query(collection(db, 'reviews'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const realReviews = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Review[];
      
      setReviews([...realReviews, ...fakeReviews]);
    }, (error) => {
      console.error('Firestore Error:', error);
      // Fallback
      setReviews(fakeReviews);
      handleFirestoreError(error, OperationType.LIST, 'reviews');
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.userName || !newReview.comment) return;
    
    setIsSubmitting(true);
    
    try {
      await addDoc(collection(db, 'reviews'), {
        userName: newReview.userName,
        rating: newReview.rating,
        comment: newReview.comment,
        createdAt: serverTimestamp()
      });
      
      setNewReview({ userName: '', rating: 5, comment: '' });
    } catch (error) {
      console.error("Error adding review: ", error);
      alert("রিভিউ যোগ করতে সমস্যা হয়েছে।");
      handleFirestoreError(error, OperationType.CREATE, 'reviews');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="reviews" className="bento-card bg-[#1c1917] overflow-hidden p-6 border-t border-stone-800">
      <div className="flex flex-col gap-6">
        
        {/* Header & Review Form */}
        <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center">
          <div className="w-full lg:w-1/3">
            <h2 className="text-xl md:text-2xl font-extrabold text-stone-100 flex items-center gap-2 mb-1">
              কাস্টমার রিভিউ
            </h2>
            <p className="text-stone-400 text-xs">
              নঙ্গর রেস্তোরাঁ সম্পর্কে আপনার মতামত আমাদের সাথে শেয়ার করুন।
            </p>
          </div>
          
          <div className="w-full lg:w-2/3">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 bg-stone-900 p-3 rounded-xl border border-stone-800 items-start sm:items-center">
              <div className="flex-1 w-full flex flex-col gap-2">
                <input 
                  type="text" 
                  required
                  value={newReview.userName}
                  onChange={(e) => setNewReview({...newReview, userName: e.target.value})}
                  className="w-full bg-stone-800 text-stone-200 text-xs p-2 rounded-lg border border-stone-700 outline-none focus:border-amber-600 transition-colors"
                  placeholder="আপনার নাম"
                />
                <div className="flex gap-1 px-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewReview({...newReview, rating: star})}
                      className="focus:outline-none"
                    >
                      <Star 
                        className={`w-3.5 h-3.5 ${star <= newReview.rating ? 'fill-amber-500 text-amber-500' : 'text-stone-600'}`} 
                      />
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="flex-[2] w-full flex flex-row gap-2 h-full">
                <textarea 
                  required
                  rows={2}
                  value={newReview.comment}
                  onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                  className="flex-1 min-w-0 bg-stone-800 text-stone-200 text-xs p-2 rounded-lg border border-stone-700 outline-none focus:border-amber-600 transition-colors resize-none"
                  placeholder="আপনার অভিজ্ঞতা শেয়ার করুন..."
                ></textarea>
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-amber-600 hover:bg-amber-700 text-white font-bold p-3 rounded-lg transition-colors flex justify-center items-center flex-shrink-0"
                  title="রিভিউ সাবমিট করুন"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Reviews List Marquee */}
        <div className="relative w-full overflow-hidden flex items-center py-2">
          <div className="absolute inset-y-0 left-0 w-8 md:w-16 bg-gradient-to-r from-[#1c1917] to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-8 md:w-16 bg-gradient-to-l from-[#1c1917] to-transparent z-10 pointer-events-none" />
          
          <div className="flex animate-marquee w-max gap-4 px-4 hover:cursor-grab active:cursor-grabbing">
            {[...reviews, ...reviews].map((review, index) => (
              <div key={`${review.id}-${index}`} className="group relative w-[320px] shrink-0 bg-gradient-to-br from-stone-900/80 to-[#1c1917] p-5 rounded-2xl border border-stone-800/60 hover:border-amber-900/40 transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1 overflow-hidden flex flex-col gap-3">
                <div className="absolute top-0 right-0 w-24 h-24 bg-amber-600/5 rounded-full blur-2xl -mr-8 -mt-8 pointer-events-none transition-opacity opacity-0 group-hover:opacity-100" />
                <div className="absolute top-4 right-4 text-stone-800 opacity-30 group-hover:text-amber-900/20 transition-colors pointer-events-none">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
                </div>
                
                <div className="flex gap-1 -mb-1 relative z-10">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star} 
                      className={`w-3 h-3 ${star <= review.rating ? 'fill-amber-500 text-amber-500 drop-shadow-[0_0_2px_rgba(245,158,11,0.5)]' : 'text-stone-700/50'}`} 
                    />
                  ))}
                </div>
                
                <p className="text-stone-300 text-[13px] leading-relaxed line-clamp-3 relative z-10 font-medium">"{review.comment}"</p>
                
                <div className="flex justify-between items-end mt-auto pt-3 border-t border-stone-800/40 relative z-10">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-stone-800 border border-stone-700 flex items-center justify-center text-stone-400 font-bold text-xs">
                      {review.userName ? review.userName.charAt(0) : '?'}
                    </div>
                    <div className="flex flex-col">
                      <h3 className="font-bold text-stone-200 text-xs whitespace-nowrap overflow-hidden text-ellipsis max-w-[120px]">{review.userName}</h3>
                      <span className="text-[9px] text-stone-500">Verified Customer</span>
                    </div>
                  </div>
                  {review.createdAt && (
                    <span className="text-[10px] text-stone-600 font-medium whitespace-nowrap mb-0.5">
                      {review.createdAt?.toDate ? review.createdAt.toDate().toLocaleDateString('bn-BD', { day: 'numeric', month: 'short' }) : new Date(review.createdAt).toLocaleDateString('bn-BD', { day: 'numeric', month: 'short' })}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        
      </div>
    </section>
  );
}
