import React, { useState, useEffect, useRef } from 'react';
import { collection, query, updateDoc, doc, onSnapshot, addDoc, deleteDoc, getDocs, setDoc } from 'firebase/firestore';
import { auth, db, handleFirestoreError, OperationType } from '../lib/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { format } from 'date-fns';
import { menuData } from '../data/menu';

export default function Admin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [orders, setOrders] = useState<any[]>([]);
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'orders' | 'menu'>('orders');
  
  // New Item State
  const [newItemNameBn, setNewItemNameBn] = useState('');
  const [newItemNameEn, setNewItemNameEn] = useState('');
  const [newItemPrice, setNewItemPrice] = useState('');
  const [newItemCategoryId, setNewItemCategoryId] = useState(menuData[0]?.id || '');
  
  // Editing Price State
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [editingPrice, setEditingPrice] = useState('');

  const initialLoadDone = useRef(false);

  // Migration/Seed helper
  const seedMenuItems = async () => {
    if (menuItems.length > 0) return;
    try {
        let seeded = 0;
        for (const cat of menuData) {
            for (const item of cat.items) {
                await setDoc(doc(db, 'menuItems', item.id), {
                    nameBn: item.nameBn,
                    nameEn: item.nameEn,
                    price: item.price,
                    categoryId: cat.id,
                    category: cat.name
                });
                seeded++;
            }
        }
        alert(`${seeded} items seeded to database!`);
    } catch(err) {
        console.error(err);
        alert('Error seeding items');
    }
  };

  useEffect(() => {
    let unsubscribeOrders = () => {};
    let unsubscribeMenu = () => {};
    
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user && user.email === 'drubo1034@gmail.com') {
        setIsLoggedIn(true);
        try {
            if ('Notification' in window && Notification.permission !== 'granted' && Notification.permission !== 'denied') {
                Notification.requestPermission().catch(console.error);
            }
        } catch (e) {}
        
        const qOrders = query(collection(db, 'orders'));
        unsubscribeOrders = onSnapshot(qOrders, (snapshot) => {
            const ordersData = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
            ordersData.sort((a: any, b: any) => {
                const aTime = a.createdAt?.toMillis ? a.createdAt.toMillis() : 0;
                const bTime = b.createdAt?.toMillis ? b.createdAt.toMillis() : 0;
                return bTime - aTime;
            });
            setOrders(ordersData);

            if (initialLoadDone.current) {
                const hasNew = snapshot.docChanges().some(change => change.type === 'added');
                if (hasNew) playNotification();
            } else {
                initialLoadDone.current = true;
            }
        }, (error) => {
            handleFirestoreError(error, OperationType.LIST, 'orders');
        });

        const qMenu = query(collection(db, 'menuItems'));
        unsubscribeMenu = onSnapshot(qMenu, (snapshot) => {
            setMenuItems(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
        }, (error) => {
           handleFirestoreError(error, OperationType.LIST, 'menuItems'); 
        });

      } else {
        setIsLoggedIn(false);
        unsubscribeOrders();
        unsubscribeMenu();
      }
    });
    return () => {
        unsubscribe();
        unsubscribeOrders();
        unsubscribeMenu();
    };
  }, []);

  const playNotification = () => {
    try {
        if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('🛍️ নতুন অর্ডার এসেছে!', { body: 'অ্যাডমিন প্যানেলে চেক করুন' });
        }
        const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, ctx.currentTime);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        osc.start();
        gain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 1);
        osc.stop(ctx.currentTime + 1);
    } catch (e) {
        console.error(e);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    if (email !== 'drubo1034@gmail.com' || (password !== '6969' && password !== '696969')) {
        setError('ভুল ইমেইল বা পাসওয়ার্ড।');
        setLoading(false);
        return;
    }

    const firebasePassword = password === '6969' ? '696969' : password;

    try {
      await signInWithEmailAndPassword(auth, email, firebasePassword);
    } catch (err: any) {
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential' || err.code === 'auth/invalid-login-credentials') {
         try {
             await createUserWithEmailAndPassword(auth, email, firebasePassword);
         } catch(createErr: any) {
             setError('অ্যাকাউন্ট তৈরি করা যায়নি: ' + createErr.message);
         }
      } else {
         setError(err.message);
      }
    }
    setLoading(false);
  };

  const markCompleted = async (orderId: string) => {
      try {
          await updateDoc(doc(db, 'orders', orderId), { status: 'completed' });
      } catch (err) {
          handleFirestoreError(err, OperationType.UPDATE, 'orders');
      }
  };

  const handleAddItem = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!newItemNameBn || !newItemNameEn || !newItemPrice) return;
      const cat = menuData.find(c => c.id === newItemCategoryId);
      if (!cat) return;
      try {
          await addDoc(collection(db, 'menuItems'), {
              nameBn: newItemNameBn,
              nameEn: newItemNameEn,
              price: newItemPrice,
              category: cat.name,
              categoryId: cat.id
          });
          setNewItemNameBn('');
          setNewItemNameEn('');
          setNewItemPrice('');
          alert('Item added successfully!');
      } catch(err) {
          handleFirestoreError(err, OperationType.CREATE, 'menuItems');
      }
  };
  
  const handleEditPrice = async (itemId: string) => {
      if (!editingPrice) return;
      try {
          await updateDoc(doc(db, 'menuItems', itemId), { price: editingPrice });
          setEditingItemId(null);
          setEditingPrice('');
      } catch(err) {
           handleFirestoreError(err, OperationType.UPDATE, 'menuItems');
      }
  };

  const handleDeleteItem = async (itemId: string) => {
      if (!window.confirm('Delete this item?')) return;
      try {
          await deleteDoc(doc(db, 'menuItems', itemId));
      } catch(err) {
           handleFirestoreError(err, OperationType.DELETE, 'menuItems');
      }
  };

  if (!isLoggedIn) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-[#1c1917] rounded-3xl min-h-[50vh]">
        <h2 className="text-2xl font-bold text-stone-100 mb-6">অ্যাডমিন লগইন</h2>
        <form onSubmit={handleLogin} className="flex flex-col gap-4 w-full max-w-sm">
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="px-4 py-3 bg-stone-800 border border-stone-700 rounded-xl text-stone-200 outline-none focus:border-red-600" required />
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="px-4 py-3 bg-stone-800 border border-stone-700 rounded-xl text-stone-200 outline-none focus:border-red-600" required />
          {error && <p className="text-red-500 text-sm font-medium">{error}</p>}
          <button type="submit" disabled={loading} className="px-4 py-3 bg-red-700 hover:bg-red-800 text-white font-bold rounded-xl mt-2 disabled:opacity-50">
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 bg-[#1c1917] rounded-3xl text-stone-200 min-h-[60vh]">
      <div className="flex justify-between items-center mb-6 border-b border-stone-800 pb-4">
          <h2 className="text-2xl font-extrabold text-stone-100">অ্যাডমিন ড্যাশবোর্ড</h2>
          <button onClick={() => auth.signOut()} className="text-sm bg-stone-800 hover:bg-stone-700 px-4 py-2 rounded-lg">Logout</button>
      </div>

      <div className="flex gap-4 mb-6">
          <button 
              onClick={() => setActiveTab('orders')}
              className={`px-4 py-2 rounded-lg font-bold text-sm ${activeTab === 'orders' ? 'bg-red-700 text-white' : 'bg-stone-800 text-stone-400'}`}
          >
              অর্ডার সমূহ
          </button>
          <button 
              onClick={() => setActiveTab('menu')}
              className={`px-4 py-2 rounded-lg font-bold text-sm ${activeTab === 'menu' ? 'bg-red-700 text-white' : 'bg-stone-800 text-stone-400'}`}
          >
              মেন্যু ম্যানেজমেন্ট
          </button>
      </div>
      
      {activeTab === 'orders' && (
      <div className="flex flex-col gap-4">
        {orders.length === 0 ? (
            <p className="text-stone-400">No orders found.</p>
        ) : (
            orders.map(order => (
                <div key={order.id} className="p-4 bg-stone-800 rounded-xl border border-stone-700 flex flex-col md:flex-row justify-between gap-4">
                    <div>
                        <div className="flex gap-3 mb-2">
                            <span className={`text-xs px-2 py-1 rounded-full font-bold uppercase ${order.status === 'completed' ? 'bg-green-900/50 text-green-400' : 'bg-yellow-900/50 text-yellow-400'}`}>
                                {order.status}
                            </span>
                            <span className="text-xs text-stone-400 mt-1">{order.id}</span>
                        </div>
                        <p className="text-xs text-stone-400">Time: {order.createdAt?.toMillis ? format(order.createdAt.toMillis(), 'PPpp') : 'N/A'}</p>
                        <p className="text-xs font-semibold mt-1">Payment: {
                            order.paymentMethod === 'cod' ? 'Cash on Delivery' : 
                            order.paymentMethod === 'bkash' ? 'bKash' : 
                            order.paymentMethod === 'nagad' ? 'Nagad' : 
                            order.paymentMethod === 'whatsapp' ? 'WhatsApp' : 'N/A'
                        }</p>
                        {(order.paymentMethod === 'bkash' || order.paymentMethod === 'nagad') && order.trxId && (
                            <p className="text-[11px] text-green-400 font-bold mt-0.5">TrxID: {order.trxId}</p>
                        )}
                        {order.customerPhone && (
                            <p className="text-[12px] text-stone-300 font-bold mt-2">Phone: {order.customerPhone}</p>
                        )}
                        {order.deliveryAddress && (
                            <p className="text-[12px] text-stone-300 mt-0.5">Address: {order.deliveryAddress}</p>
                        )}
                    </div>
                    <div className="flex flex-col md:items-end">
                        <p className="text-sm font-bold text-stone-300 mb-1">Items:</p>
                        <ul className="list-disc pl-5 md:pl-0 md:list-none text-sm text-stone-400 text-left md:text-right mb-2">
                            {order.items.map((item: any, idx: number) => (
                                <li key={idx}>x{item.quantity} {item.name} <span className="opacity-50">({item.price * item.quantity} tk)</span></li>
                            ))}
                        </ul>
                        <p className="text-md font-bold text-red-500 mb-3">Total: {order.totalPrice} ৳</p>
                        
                        {order.status !== 'completed' && (
                            <button 
                                onClick={() => markCompleted(order.id)}
                                className="bg-green-700 hover:bg-green-600 text-white text-xs font-bold px-4 py-2 rounded-lg self-start md:self-end"
                            >
                                Mark Completed
                            </button>
                        )}
                    </div>
                </div>
            ))
        )}
      </div>
      )}

      {activeTab === 'menu' && (
      <div className="flex flex-col gap-8">
          <div className="bg-stone-800 p-6 rounded-2xl border border-stone-700">
              <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-stone-100">নতুন প্রোডাক্ট যুক্ত করুন</h3>
                  {menuItems.length === 0 && (
                      <button onClick={seedMenuItems} className="text-xs bg-yellow-600 hover:bg-yellow-500 text-white px-3 py-1.5 rounded-md font-bold">
                          Seed Initial Data
                      </button>
                  )}
              </div>
              <form onSubmit={handleAddItem} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
                  <div className="flex flex-col gap-1">
                      <label className="text-xs text-stone-400">Category</label>
                      <select required value={newItemCategoryId} onChange={e => setNewItemCategoryId(e.target.value)} className="px-3 py-2 bg-stone-900 border border-stone-700 rounded-lg text-sm text-stone-200">
                          {menuData.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                      </select>
                  </div>
                  <div className="flex flex-col gap-1">
                      <label className="text-xs text-stone-400">Name (Bangla)</label>
                      <input required type="text" value={newItemNameBn} onChange={e => setNewItemNameBn(e.target.value)} placeholder="উদাঃ চিকেন বার্গার" className="px-3 py-2 bg-stone-900 border border-stone-700 rounded-lg text-sm" />
                  </div>
                  <div className="flex flex-col gap-1">
                      <label className="text-xs text-stone-400">Name (English)</label>
                      <input required type="text" value={newItemNameEn} onChange={e => setNewItemNameEn(e.target.value)} placeholder="e.g. Chicken Burger" className="px-3 py-2 bg-stone-900 border border-stone-700 rounded-lg text-sm" />
                  </div>
                  <div className="flex flex-col gap-1">
                      <label className="text-xs text-stone-400">Price (৳)</label>
                      <input required type="number" min="0" value={newItemPrice} onChange={e => setNewItemPrice(e.target.value)} placeholder="120" className="px-3 py-2 bg-stone-900 border border-stone-700 rounded-lg text-sm" />
                  </div>
                  <button type="submit" className="bg-red-700 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg text-sm h-[38px]">
                      যুক্ত করুন
                  </button>
              </form>
          </div>

          <div className="flex flex-col gap-4">
              <h3 className="text-lg font-bold text-stone-100">সকল প্রোডাক্ট ({menuItems.length})</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {menuItems.map(item => (
                      <div key={item.id} className="bg-stone-800 p-4 rounded-xl border border-stone-700 flex flex-col justify-between">
                          <div>
                              <div className="flex justify-between items-start mb-1">
                                  <p className="font-bold text-stone-200">{item.nameBn}</p>
                                  <button onClick={() => handleDeleteItem(item.id)} className="text-red-500 hover:text-red-400 text-xs py-1 px-2 rounded hover:bg-red-950/30">Delete</button>
                              </div>
                              <p className="text-xs text-stone-400 mb-2">{item.nameEn}</p>
                              <span className="text-[10px] bg-stone-700 px-2 py-0.5 rounded-full text-stone-300">{item.category}</span>
                          </div>
                          
                          <div className="mt-4 flex items-center gap-2">
                              {editingItemId === item.id ? (
                                  <>
                                      <input 
                                          type="number" 
                                          value={editingPrice} 
                                          onChange={e => setEditingPrice(e.target.value)} 
                                          className="w-20 px-2 py-1 bg-stone-900 border border-red-500/50 rounded text-sm outline-none"
                                          autoFocus
                                      />
                                      <button onClick={() => handleEditPrice(item.id)} className="bg-green-700 hover:bg-green-600 text-white text-xs px-3 py-1.5 rounded">Save</button>
                                      <button onClick={() => setEditingItemId(null)} className="bg-stone-700 hover:bg-stone-600 text-white text-xs px-3 py-1.5 rounded">Cancel</button>
                                  </>
                              ) : (
                                  <>
                                      <p className="font-bold text-red-400 text-lg flex-1">৳ {item.price}</p>
                                      <button 
                                          onClick={() => {
                                              setEditingItemId(item.id);
                                              setEditingPrice(item.price);
                                          }} 
                                          className="bg-stone-700 hover:bg-stone-600 text-xs px-3 py-1.5 rounded"
                                      >
                                          Edit Price
                                      </button>
                                  </>
                              )}
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      </div>
      )}
    </div>
  );
}
