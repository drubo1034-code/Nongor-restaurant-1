import { useState, useEffect } from 'react';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db, ensureAuthenticated, handleFirestoreError, OperationType } from '../lib/firebase';
import { format } from 'date-fns';
import { X, Package, Clock, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface MyOrdersModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MyOrdersModal({ isOpen, onClose }: MyOrdersModalProps) {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchOrders();
    }
  }, [isOpen]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const user = await ensureAuthenticated();
      const q = query(
        collection(db, 'orders'),
        where('userId', '==', user.uid)
      );
      
      const snapshot = await getDocs(q);
      const ordersData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
      // Sort client-side
      ordersData.sort((a: any, b: any) => {
          const aTime = a.createdAt?.toMillis ? a.createdAt.toMillis() : 0;
          const bTime = b.createdAt?.toMillis ? b.createdAt.toMillis() : 0;
          return bTime - aTime;
      });
      
      setOrders(ordersData);
    } catch (err) {
      console.error('Error fetching orders:', err);
      handleFirestoreError(err, OperationType.LIST, 'orders');
    }
    setLoading(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[80]"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-lg bg-[#1c1917] rounded-3xl shadow-2xl border border-stone-800 z-[90] overflow-hidden flex flex-col max-h-[80vh]"
          >
            <div className="p-6 border-b border-stone-800 flex items-center justify-between bg-stone-900/50">
              <h2 className="text-xl font-extrabold text-stone-100 flex items-center gap-2">
                <Package className="w-5 h-5 text-[#d97706]" />
                আমার অর্ডার সমূহ
              </h2>
              <button onClick={onClose} className="p-2 bg-stone-800 hover:bg-stone-700 rounded-full text-stone-300 transition">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
              {loading ? (
                <div className="flex justify-center items-center py-10">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#d97706]"></div>
                </div>
              ) : orders.length === 0 ? (
                <div className="text-center py-10 text-stone-500 flex flex-col items-center gap-3">
                  <Package className="w-12 h-12 opacity-20" />
                  <p className="font-medium text-lg">আপনার কোন অর্ডার নেই</p>
                </div>
              ) : (
                orders.map(order => (
                  <div key={order.id} className="bg-stone-800/50 border border-stone-700 rounded-2xl p-4 flex flex-col gap-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-xs font-mono text-stone-500">#{order.id.slice(-6).toUpperCase()}</p>
                        <p className="text-xs text-stone-400 mt-1">
                          {order.createdAt?.toMillis ? format(order.createdAt.toMillis(), 'dd MMM, hh:mm a') : 'Recently'}
                        </p>
                        <p className="text-[10px] text-stone-500 font-semibold mt-1 uppercase">
                          {order.paymentMethod === 'cod' ? 'Cash on Delivery' : 
                           order.paymentMethod === 'bkash' ? 'bKash' :
                           order.paymentMethod === 'nagad' ? 'Nagad' :
                           order.paymentMethod === 'whatsapp' ? 'WhatsApp' : ''}
                        </p>
                        {(order.paymentMethod === 'bkash' || order.paymentMethod === 'nagad') && order.trxId && (
                          <p className="text-[10px] text-green-400 font-bold mt-0.5">TrxID: {order.trxId}</p>
                        )}
                        {order.deliveryAddress && (
                          <p className="text-[10px] text-stone-400 mt-1 line-clamp-1">{order.deliveryAddress}</p>
                        )}
                      </div>
                      <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold uppercase ${
                        order.status === 'completed' ? 'bg-green-900/40 text-green-400' : 'bg-yellow-900/40 text-[#d97706]'
                      }`}>
                        {order.status === 'completed' ? <CheckCircle className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                        {order.status === 'completed' ? 'ডেলিভার্ড' : 'পেন্ডিং'}
                      </div>
                    </div>
                    
                    <div className="pt-3 border-t border-stone-700/50">
                      <ul className="text-sm text-stone-300 space-y-1">
                        {order.items.map((item: any, idx: number) => (
                          <li key={idx} className="flex justify-between">
                            <span><span className="text-stone-500 mr-2">{item.quantity}x</span> {item.name}</span>
                            <span className="text-stone-400">৳{item.price * item.quantity}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-3 flex justify-between items-center font-bold">
                        <span className="text-stone-200">মোট বিল:</span>
                        <span className="text-lg text-white">৳{order.totalPrice}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
