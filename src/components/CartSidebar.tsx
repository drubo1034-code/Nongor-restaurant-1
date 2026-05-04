import { useState } from 'react';
import { useCartStore } from '../store/cartStore';
import { ShoppingCart, X, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { auth, db, ensureAuthenticated, handleFirestoreError, OperationType } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function CartSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [showSuccessAnim, setShowSuccessAnim] = useState(false);
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [trxId, setTrxId] = useState('');
  const { items, removeItem, updateQuantity, clearCart, totalPrice } = useCartStore();

  const total = totalPrice();

  const handleCheckout = async () => {
    if (items.length === 0) return;
    
    if (!phone.trim() || !address.trim()) {
        alert('দয়া করে আপনার ফোন নম্বর এবং ডেলিভারি ঠিকানা দিন।');
        return;
    }
    
    if ((paymentMethod === 'bkash' || paymentMethod === 'nagad') && !trxId.trim()) {
        alert('দয়া করে Transaction ID (TrxID) দিন');
        return;
    }

    setIsCheckingOut(true);

    try {
      const user = await ensureAuthenticated();
      
      const orderData: any = {
        userId: user.uid,
        items: items,
        totalPrice: total,
        status: 'pending',
        paymentMethod: paymentMethod,
        customerPhone: phone.trim(),
        deliveryAddress: address.trim(),
        createdAt: serverTimestamp(),
      };
      
      if (paymentMethod === 'bkash' || paymentMethod === 'nagad') {
          orderData.trxId = trxId.trim();
      }

      await addDoc(collection(db, 'orders'), orderData);
      
      clearCart();
      setTrxId('');
      setPhone('');
      setAddress('');
      setIsOpen(false);
      
      if (paymentMethod === 'whatsapp') {
          // WhatsApp message formatting
          let message = `*নতুন অর্ডার (ওয়েবসাইট থেকে)*\n\n*আইটেমসমূহ:*\n`;
          items.forEach((item, index) => {
            message += `${index + 1}. ${item.name} - ${item.quantity}টি\n`;
          });
          message += `\n*মোট বিল:* ${total} ৳`;
          message += `\n*ফোন নম্বর:* ${orderData.customerPhone}`;
          message += `\n*ঠিকানা:* ${orderData.deliveryAddress}`;
          
          const whatsappUrl = `https://wa.me/8801919671919?text=${encodeURIComponent(message)}`;
          window.open(whatsappUrl, '_blank');
          
          setShowSuccessAnim(true);
          setTimeout(() => {
              setShowSuccessAnim(false);
              window.dispatchEvent(new CustomEvent('open-orders'));
          }, 2500);
      } else {
          setShowSuccessAnim(true);
          setTimeout(() => {
              setShowSuccessAnim(false);
              window.dispatchEvent(new CustomEvent('open-orders'));
          }, 2500);
      }
      
    } catch (err) {
      console.error('Checkout failed:', err);
      alert('অর্ডার সম্পন্ন করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।');
      handleFirestoreError(err, OperationType.CREATE, 'orders');
    }
    
    setIsCheckingOut(false);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-[#991b1b] text-white p-4 rounded-full shadow-lg shadow-black/50 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
        style={{ marginBottom: '80px' }} // Above WhatsApp floating button if that exists
      >
        <ShoppingCart className="w-6 h-6" />
        {items.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-yellow-500 text-stone-900 text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full">
            {items.reduce((acc, item) => acc + item.quantity, 0)}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] max-w-md max-h-[90dvh] bg-[#1c1917] rounded-2xl border border-stone-800 z-[70] flex flex-col shadow-2xl overflow-hidden"
            >
              <div className="p-4 sm:p-6 border-b border-stone-800 flex items-center justify-between shrink-0 bg-[#1c1917]">
                <h2 className="text-xl font-extrabold text-stone-100 flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5 text-[#d97706]" />
                  আপনার অর্ডার
                </h2>
                <button onClick={() => setIsOpen(false)} className="bg-stone-800 hover:bg-stone-700 p-2 rounded-full text-stone-300 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto flex flex-col">
                <div className="p-4 sm:p-6 flex flex-col gap-4">
                  {items.length === 0 ? (
                    <div className="flex flex-col items-center justify-center text-stone-500 gap-4 py-12">
                      <ShoppingCart className="w-16 h-16 opacity-20" />
                      <p className="font-bold text-lg">কার্ট খালি</p>
                      <button onClick={() => setIsOpen(false)} className="text-[#d97706] text-sm underline">মেনু থেকে খাবার যোগ করুন</button>
                    </div>
                  ) : (
                    items.map((item) => (
                      <div key={item.id} className="flex flex-col gap-3 bg-stone-800/50 border border-stone-700/50 p-4 rounded-2xl">
                        <div className="flex justify-between items-start gap-2">
                          <h4 className="text-stone-200 font-bold leading-tight">{item.name}</h4>
                          <span className="text-[#d97706] font-extrabold text-sm whitespace-nowrap">৳{item.price * item.quantity}</span>
                        </div>
                        
                        <div className="flex items-center justify-between mt-1">
                          <div className="flex items-center bg-stone-900 rounded-lg border border-stone-700 overflow-hidden">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="bg-stone-800 hover:bg-stone-700 p-1.5 sm:p-2 text-stone-300 transition-colors"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-8 text-center text-sm font-bold text-stone-200">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="bg-stone-800 hover:bg-stone-700 p-1.5 sm:p-2 text-stone-300 transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          <button 
                            onClick={() => removeItem(item.id)}
                            className="text-red-500 hover:text-red-400 p-2"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {items.length > 0 && (
                  <div className="p-4 sm:p-6 border-t border-stone-800 bg-[#292524] mt-auto">
                    
                    <div className="mb-5 flex flex-col gap-4">
                      <div>
                          <label className="text-stone-400 text-xs font-bold mb-1 block">ফোন নম্বর <span className="text-red-500">*</span></label>
                          <input
                              type="tel"
                              placeholder="আপনার ফোন নম্বর দিন"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              className="w-full bg-stone-800 border border-stone-700 rounded-lg text-stone-200 px-4 py-3 outline-none focus:border-[#d97706] transition-colors"
                          />
                      </div>
                      <div>
                          <label className="text-stone-400 text-xs font-bold mb-1 block">ডেলিভারি ঠিকানা <span className="text-red-500">*</span></label>
                          <textarea
                              placeholder="আপনার সম্পূর্ণ ঠিকানা দিন"
                              value={address}
                              onChange={(e) => setAddress(e.target.value)}
                              className="w-full bg-stone-800 border border-stone-700 rounded-lg text-stone-200 px-4 py-3 outline-none focus:border-[#d97706] transition-colors resize-none h-24"
                          />
                      </div>
                    </div>

                    <div className="mb-2">
                      <p className="text-stone-400 text-sm font-bold mb-3">অর্ডার কনফার্ম করার মাধ্যম পছন্দ করুন:</p>
                      <div className="flex flex-col gap-2">
                          <label className="flex items-center gap-3 bg-stone-800 p-3.5 rounded-xl border border-stone-700 cursor-pointer hover:border-[#d97706] transition-colors">
                              <input 
                                  type="radio" 
                                  name="payment" 
                                  value="cod" 
                                  checked={paymentMethod === 'cod'} 
                                  onChange={() => setPaymentMethod('cod')}
                                  className="w-5 h-5 accent-[#d97706]"
                              />
                              <span className="text-stone-200 font-medium text-sm sm:text-base">Cash on Delivery (ক্যাশ অন ডেলিভারি)</span>
                          </label>
                          <label className="flex items-center gap-3 bg-stone-800 p-3.5 rounded-xl border border-stone-700 cursor-pointer hover:border-[#d97706] transition-colors">
                              <input 
                                  type="radio" 
                                  name="payment" 
                                  value="bkash" 
                                  checked={paymentMethod === 'bkash'} 
                                  onChange={() => setPaymentMethod('bkash')}
                                  className="w-5 h-5 accent-[#d97706]"
                              />
                              <span className="text-stone-200 font-medium text-sm sm:text-base">bKash (বিকাশ)</span>
                          </label>
                          <label className="flex items-center gap-3 bg-stone-800 p-3.5 rounded-xl border border-stone-700 cursor-pointer hover:border-[#d97706] transition-colors">
                              <input 
                                  type="radio" 
                                  name="payment" 
                                  value="nagad" 
                                  checked={paymentMethod === 'nagad'} 
                                  onChange={() => setPaymentMethod('nagad')}
                                  className="w-5 h-5 accent-[#d97706]"
                              />
                              <span className="text-stone-200 font-medium text-sm sm:text-base">Nagad (নগদ)</span>
                          </label>
                          <label className="flex items-center gap-3 bg-stone-800 p-3.5 rounded-xl border border-stone-700 cursor-pointer hover:border-green-500 transition-colors">
                              <input 
                                  type="radio" 
                                  name="payment" 
                                  value="whatsapp" 
                                  checked={paymentMethod === 'whatsapp'} 
                                  onChange={() => setPaymentMethod('whatsapp')}
                                  className="w-5 h-5 accent-green-500"
                              />
                              <span className="text-stone-200 font-medium text-sm sm:text-base whitespace-nowrap">Order via WhatsApp (হোয়াটসঅ্যাপ)</span>
                          </label>
                      </div>
                      
                      {(paymentMethod === 'bkash' || paymentMethod === 'nagad') && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }} 
                          animate={{ opacity: 1, height: 'auto' }} 
                          className="mt-3 p-4 bg-stone-900 border border-stone-700 rounded-xl"
                        >
                           <p className="text-sm font-medium text-stone-300 mb-2">
                               আমাদের পার্সোনাল {paymentMethod === 'bkash' ? 'বিকাশ' : 'নগদ'} নম্বর: <br/>
                               <span className="text-[#d97706] font-bold text-lg select-all">01919671919</span> (Send Money)
                           </p>
                           <p className="text-xs text-stone-500 mb-3 block">অবশ্যই আপনার টোটাল বিলটি সেন্ড মানি করুন। এরপর নিচের বক্সে Transaction ID (TrxID) দিন।</p>
                           <input
                               type="text"
                               placeholder="TrxID দিন (যেমন: 8N2K3A9B)"
                               value={trxId}
                               onChange={(e) => setTrxId(e.target.value)}
                               className="w-full bg-stone-800 border border-stone-700 rounded-lg text-stone-200 px-4 py-3 outline-none focus:border-[#d97706] transition-colors"
                           />
                        </motion.div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {items.length > 0 && (
                <div className="p-4 sm:p-6 border-t border-stone-800 bg-[#1c1917] shrink-0">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-stone-400 font-medium">মোট দাম:</span>
                    <span className="text-2xl font-extrabold text-white">৳{total}</span>
                  </div>
                  <button 
                    onClick={handleCheckout}
                    disabled={isCheckingOut}
                    className="w-full py-4 bg-[#991b1b] hover:bg-[#7f1d1d] text-white font-extrabold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:scale-100"
                  >
                    {isCheckingOut ? (
                      <span className="animate-pulse">প্রসেস হচ্ছে...</span>
                    ) : (
                      <>
                        অর্ডার কনফার্ম করুন <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showSuccessAnim && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.5, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="bg-[#1c1917] p-8 sm:p-10 rounded-3xl flex flex-col items-center shadow-2xl shadow-green-900/20 border border-stone-800 shrink-0 max-w-[90%] mx-auto"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
                className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-5 shadow-lg shadow-green-500/50 shrink-0"
              >
                <motion.svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="3"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <motion.path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </motion.svg>
              </motion.div>
              <motion.h2 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-2xl sm:text-3xl font-bold text-white mb-2 text-center"
              >
                অর্ডার কনফার্ম!
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-stone-400 text-sm text-center"
              >
                আপনার অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে।
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
