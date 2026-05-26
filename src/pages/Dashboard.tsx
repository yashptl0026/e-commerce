import React, { useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { User, ShoppingBag, Heart, Settings, MapPin, Mail, Phone, Calendar } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';

export const Dashboard: React.FC = () => {
  const { userProfile, orders, wishlist, products, updateProfile } = useApp();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  // Dashboard Tabs: 'profile' | 'orders' | 'wishlist'
  const activeTab = (searchParams.get('tab') || (location.state as any)?.tab || 'profile') as 'profile' | 'orders' | 'wishlist';

  const handleTabChange = (tab: 'profile' | 'orders' | 'wishlist') => {
    setSearchParams({ tab });
  };


  // Edit details forms
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(userProfile.fullName);
  const [phone, setPhone] = useState(userProfile.phone);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ fullName: name, phone });
    setIsEditing(false);
  };

  // Find wishlist products
  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <main className="flex-grow pt-20 pb-16 md:pt-28 md:pb-24 px-4 md:px-6 max-w-7xl mx-auto w-full">
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        
        {/* Navigation Sidebar Drawer */}
        <aside className="w-full lg:w-64 shrink-0 premium-glass p-4 rounded-2xl shadow-xl flex lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible whitespace-nowrap scrollbar-none">
          <button
            onClick={() => handleTabChange('profile')}
            className={`w-auto lg:w-full shrink-0 text-center lg:text-left px-5 py-3 rounded-xl font-display text-xs font-bold uppercase tracking-wider flex items-center justify-center lg:justify-start gap-3 transition-all ${
              activeTab === 'profile'
                ? 'bg-primary text-on-primary shadow-[0_0_15px_rgba(173,198,255,0.3)]'
                : 'text-on-surface hover:bg-white/5'
            }`}
          >
            <User className="w-4.5 h-4.5" /> Profile Overview
          </button>
          
          <button
            onClick={() => handleTabChange('orders')}
            className={`w-auto lg:w-full shrink-0 text-center lg:text-left px-5 py-3 rounded-xl font-display text-xs font-bold uppercase tracking-wider flex items-center justify-center lg:justify-start gap-3 transition-all ${
              activeTab === 'orders'
                ? 'bg-primary text-on-primary shadow-[0_0_15px_rgba(173,198,255,0.3)]'
                : 'text-on-surface hover:bg-white/5'
            }`}
          >
            <ShoppingBag className="w-4.5 h-4.5" /> Order History ({orders.length})
          </button>

          <button
            onClick={() => handleTabChange('wishlist')}
            className={`w-auto lg:w-full shrink-0 text-center lg:text-left px-5 py-3 rounded-xl font-display text-xs font-bold uppercase tracking-wider flex items-center justify-center lg:justify-start gap-3 transition-all ${
              activeTab === 'wishlist'
                ? 'bg-primary text-on-primary shadow-[0_0_15px_rgba(173,198,255,0.3)]'
                : 'text-on-surface hover:bg-white/5'
            }`}
          >
            <Heart className="w-4.5 h-4.5" /> My Wishlist ({wishlist.length})
          </button>
        </aside>

        {/* Content Pane Area */}
        <section className="flex-grow w-full premium-glass p-6 md:p-8 rounded-2xl shadow-xl min-h-[50vh]">

          <AnimatePresence mode="wait">
            {activeTab === 'profile' && (
              <motion.div
                key="profile"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-8"
              >
                <div className="flex justify-between items-center border-b border-white/5 pb-4">
                  <h2 className="text-xl font-display font-bold uppercase tracking-wider text-on-surface">
                    Profile Details
                  </h2>
                  <button
                    onClick={() => {
                      setIsEditing(!isEditing);
                      setName(userProfile.fullName);
                      setPhone(userProfile.phone);
                    }}
                    className="text-xs font-display font-bold uppercase tracking-widest text-primary hover:underline flex items-center gap-1.5"
                  >
                    <Settings className="w-3.5 h-3.5" /> {isEditing ? 'Cancel' : 'Edit Profile'}
                  </button>
                </div>

                {!isEditing ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 text-on-surface-variant text-sm font-semibold">
                        <User className="w-5 h-5 text-primary shrink-0" />
                        <div>
                          <span className="text-[10px] text-on-surface-variant/50 uppercase block">Name</span>
                          <span className="text-on-surface">{userProfile.fullName}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 text-on-surface-variant text-sm font-semibold">
                        <Mail className="w-5 h-5 text-primary shrink-0" />
                        <div>
                          <span className="text-[10px] text-on-surface-variant/50 uppercase block">Email Address</span>
                          <span className="text-on-surface">{userProfile.email}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 text-on-surface-variant text-sm font-semibold">
                        <Phone className="w-5 h-5 text-primary shrink-0" />
                        <div>
                          <span className="text-[10px] text-on-surface-variant/50 uppercase block">Phone</span>
                          <span className="text-on-surface">{userProfile.phone}</span>
                        </div>
                      </div>
                    </div>

                    {/* Address summaries */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-4">
                      <h3 className="text-xs font-display font-extrabold uppercase text-primary flex items-center gap-1.5">
                        <MapPin className="w-4 h-4" /> Default Delivery Address
                      </h3>
                      {userProfile.addresses.map((addr) => (
                        <div key={addr.id} className="text-xs text-on-surface-variant space-y-1">
                          <p className="font-semibold text-on-surface">{addr.fullName}</p>
                          <p>{addr.addressLine1}, {addr.addressLine2}</p>
                          <p>{addr.city}, {addr.state} {addr.zipCode}</p>
                          <p>{addr.country}</p>
                          <p>Phone: {addr.phone}</p>
                          {addr.isDefault && (
                            <span className="inline-block mt-2 bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 rounded text-[9px] uppercase tracking-wider font-bold">
                              Default
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSaveProfile} className="space-y-4 max-w-md">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-on-surface-variant uppercase">Full Name</label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-primary text-on-surface"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-on-surface-variant uppercase">Phone Number</label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-primary text-on-surface"
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-primary text-on-primary font-display font-bold py-2.5 px-6 rounded-full text-xs"
                    >
                      Save Changes
                    </button>
                  </form>
                )}
              </motion.div>
            )}

            {activeTab === 'orders' && (
              <motion.div
                key="orders"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <h2 className="text-xl font-display font-bold uppercase tracking-wider text-on-surface border-b border-white/5 pb-4">
                  Past Transactions
                </h2>

                {orders.length > 0 ? (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div
                        key={order.id}
                        className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-4 hover:border-white/20 transition-all"
                      >
                        <div className="flex flex-wrap justify-between items-center gap-4">
                          <div className="flex items-center gap-4">
                            <Calendar className="w-5 h-5 text-primary shrink-0" />
                            <div>
                              <span className="text-[10px] text-on-surface-variant/50 uppercase block">Date & Transaction ID</span>
                              <span className="text-xs font-semibold">{order.date} &bull; <span className="text-primary font-display font-bold">{order.id}</span></span>
                            </div>
                          </div>
                          <div>
                            <span className="text-[10px] text-on-surface-variant/50 uppercase block">Status</span>
                            <span className="bg-primary/10 text-primary border border-primary/20 px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider">
                              {order.status}
                            </span>
                          </div>
                          <div>
                            <span className="text-[10px] text-on-surface-variant/50 uppercase block">Total Amount</span>
                            <span className="text-sm font-display font-bold text-on-surface">${order.total.toLocaleString()}</span>
                          </div>
                        </div>

                        <div className="border-t border-white/5 pt-3 space-y-2">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="flex justify-between items-center text-xs text-on-surface-variant">
                              <span className="font-semibold text-on-surface truncate pr-4">
                                {item.product.name} ({item.selectedColor} &bull; {item.selectedSize}) x {item.quantity}
                              </span>
                              <span className="font-display">${(item.product.price * item.quantity).toLocaleString()}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 space-y-4">
                    <ShoppingBag className="w-12 h-12 text-on-surface-variant/20 mx-auto" />
                    <p className="text-on-surface-variant text-sm">No transaction records found in your profile history.</p>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'wishlist' && (
              <motion.div
                key="wishlist"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <h2 className="text-xl font-display font-bold uppercase tracking-wider text-on-surface border-b border-white/5 pb-4">
                  My Wishlist ({wishlistedProducts.length})
                </h2>

                {wishlistedProducts.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {wishlistedProducts.map((prod) => (
                      <ProductCard key={prod.id} product={prod} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16 space-y-4">
                    <Heart className="w-12 h-12 text-on-surface-variant/20 mx-auto" />
                    <p className="text-on-surface-variant text-sm">You haven't added any products to your wishlist yet.</p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </div>
    </main>
  );
};
export default Dashboard;
