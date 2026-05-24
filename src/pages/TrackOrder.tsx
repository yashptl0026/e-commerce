import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, Truck, Search, CheckCircle2, ShieldCheck, MapPin, Clock } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const TrackOrder: React.FC = () => {
  const { showToast } = useApp();
  const [orderId, setOrderId] = useState('');
  const [email, setEmail] = useState('');
  const [trackingResult, setTrackingResult] = useState<any>(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId.trim() || !email.trim()) return;

    setIsSearching(true);
    setTrackingResult(null);

    // Mock search delay for premium feeling
    setTimeout(() => {
      setIsSearching(false);
      const cleanId = orderId.trim().toUpperCase();

      // Check format
      if (!cleanId.startsWith('ORD-') && cleanId.length < 8) {
        showToast('Invalid Order ID format. Please use ORD-XXXXXX.', 'error');
        return;
      }

      // Generate a mock order matching the ID
      const mockResult = {
        orderId: cleanId,
        date: "May 22, 2026",
        carrier: "DHL Express Signature",
        trackingNumber: "DHL-9842795-LXM",
        estimatedDelivery: "May 28, 2026",
        statusStep: 2, // 0: Placed, 1: Processing, 2: In Transit, 3: Delivered
        address: "742 Frost Obsidian Boulevard, Soho, New York, NY 10001",
        items: [
          { name: "Obsidian Smart Watch", qty: 1, color: "Cosmic Black", size: "One Size", price: 420 },
          { name: "Technical Silk Parka", qty: 1, color: "Stone Grey", size: "M", price: 850 }
        ],
        history: [
          { status: "In Transit - Departed Sorting Facility", location: "Cincinnati Hub, OH", time: "May 24, 2026 - 11:20 AM" },
          { status: "Processing - Arrived at Hub", location: "Cincinnati Hub, OH", time: "May 23, 2026 - 04:45 PM" },
          { status: "Order Picked & Inspected", location: "Lumina Distribution Center, NY", time: "May 23, 2026 - 09:15 AM" },
          { status: "Payment Confirmed - Order Placed", location: "Digital Boutique Terminal", time: "May 22, 2026 - 08:30 PM" }
        ]
      };

      setTrackingResult(mockResult);
      showToast('Order records loaded.', 'success');
    }, 1500);
  };

  const statusPipeline = [
    { label: "Order Placed", desc: "Payment accepted" },
    { label: "Processing", desc: "Quality inspection" },
    { label: "In Transit", desc: "On the way" },
    { label: "Delivered", desc: "Signature required" }
  ];

  return (
    <main className="flex-grow pt-24 pb-16 md:pt-32 md:pb-24 px-4 md:px-6 max-w-4xl mx-auto w-full">
      {/* Header */}
      <header className="text-center space-y-4 mb-10 relative">
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-primary/5 via-secondary/10 to-transparent blur-3xl rounded-full opacity-40 w-3/4 h-3/4 mx-auto pointer-events-none"></div>
        <div className="relative z-10 space-y-3">
          <span className="text-xs tracking-[0.2em] font-semibold text-primary uppercase">Shipping Registry</span>
          <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-on-surface uppercase tracking-tight">
            Track Your Order
          </h1>
          <p className="text-xs sm:text-sm text-on-surface-variant max-w-md mx-auto font-body leading-relaxed">
            Input your signature Order ID and checkout email address to view real-time delivery status, courier logs, and shipping updates.
          </p>
        </div>
      </header>

      {/* Lookup Form */}
      <div className="glass-level-2 p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl mb-8 relative z-10">
        <form onSubmit={handleTrack} className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-end">
          <div className="sm:col-span-5 space-y-2">
            <label className="text-[10px] text-on-surface-variant uppercase font-bold tracking-wider">
              Order Identifier (ID)
            </label>
            <input
              type="text"
              required
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              placeholder="e.g. ORD-109283"
              className="w-full bg-white/5 border border-white/10 rounded-full px-5 py-3 text-xs text-on-surface placeholder:text-on-surface-variant/30 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>

          <div className="sm:col-span-5 space-y-2">
            <label className="text-[10px] text-on-surface-variant uppercase font-bold tracking-wider">
              Billing Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. john@example.com"
              className="w-full bg-white/5 border border-white/10 rounded-full px-5 py-3 text-xs text-on-surface placeholder:text-on-surface-variant/30 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>

          <div className="sm:col-span-2">
            <button
              type="submit"
              disabled={isSearching}
              className="w-full bg-primary text-[#002e6a] hover:bg-primary-container font-display font-extrabold text-xs h-[42px] rounded-full flex items-center justify-center gap-1.5 btn-primary-glow transition-all active:scale-98 disabled:opacity-50 disabled:scale-100"
            >
              {isSearching ? (
                <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
              ) : (
                <>
                  <Search className="w-4 h-4" /> FIND
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Result Panel */}
      <AnimatePresence mode="wait">
        {trackingResult && (
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -25 }}
            transition={{ duration: 0.5 }}
            className="space-y-6 relative z-10"
          >
            {/* Tracking Status Pipeline */}
            <div className="glass-level-1 p-6 sm:p-8 rounded-3xl border border-white/5 shadow-xl space-y-8">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-white/5">
                <div>
                  <span className="text-[10px] text-on-surface-variant uppercase font-bold tracking-wider">Order Reference</span>
                  <h3 className="text-xl font-display font-extrabold text-on-surface">{trackingResult.orderId}</h3>
                </div>
                <div className="text-left sm:text-right">
                  <span className="text-[10px] text-on-surface-variant uppercase font-bold tracking-wider block">Estimated Signature Delivery</span>
                  <span className="font-display font-bold text-sm text-primary">{trackingResult.estimatedDelivery}</span>
                </div>
              </div>

              {/* Steps Indicator */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 relative">
                {statusPipeline.map((step, idx) => {
                  const isDone = idx <= trackingResult.statusStep;
                  const isCurrent = idx === trackingResult.statusStep;
                  return (
                    <div key={idx} className="flex flex-col items-center text-center space-y-3 relative z-10">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all ${
                        isDone
                          ? 'bg-primary text-[#002e6a] border-primary font-bold shadow-lg shadow-primary/20'
                          : 'bg-white/5 border-white/10 text-on-surface-variant'
                      } ${isCurrent ? 'ring-4 ring-primary/20 animate-pulse' : ''}`}>
                        {isDone ? <CheckCircle2 className="w-5 h-5" /> : <Package className="w-5 h-5" />}
                      </div>
                      <div className="space-y-0.5">
                        <span className={`text-xs font-display font-bold uppercase tracking-wider block ${isDone ? 'text-on-surface' : 'text-on-surface-variant/60'}`}>
                          {step.label}
                        </span>
                        <span className="text-[10px] text-on-surface-variant/40 leading-snug block">
                          {step.desc}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Grid for shipping details and logs */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Shipping Logs */}
              <div className="md:col-span-7 glass-level-1 p-6 rounded-3xl border border-white/5 shadow-xl space-y-6">
                <h4 className="font-display font-extrabold text-xs uppercase tracking-widest text-on-surface flex items-center gap-2">
                  <Truck className="w-4.5 h-4.5 text-primary" /> Delivery Audit Log
                </h4>
                
                <div className="space-y-6 pl-2 relative border-l border-white/10 ml-3">
                  {trackingResult.history.map((log: any, idx: number) => (
                    <div key={idx} className="relative pl-6 space-y-1">
                      {/* Bullet point indicator */}
                      <span className={`absolute -left-[5px] top-1.5 w-2 h-2 rounded-full ${
                        idx === 0 ? 'bg-primary ring-4 ring-primary/20 scale-125' : 'bg-white/20'
                      }`}></span>
                      <h5 className={`text-xs font-semibold ${idx === 0 ? 'text-primary' : 'text-on-surface'}`}>
                        {log.status}
                      </h5>
                      <div className="flex gap-2 text-[10px] text-on-surface-variant/60">
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {log.location}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {log.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Delivery Metadata */}
              <div className="md:col-span-5 space-y-6">
                {/* Details card */}
                <div className="glass-level-1 p-6 rounded-3xl border border-white/5 shadow-xl space-y-4">
                  <h4 className="font-display font-extrabold text-xs uppercase tracking-widest text-on-surface flex items-center gap-2">
                    <ShieldCheck className="w-4.5 h-4.5 text-primary" /> Shipment Details
                  </h4>
                  <div className="space-y-3 text-xs">
                    <div>
                      <span className="text-on-surface-variant/50 block text-[10px] uppercase font-bold tracking-wider">Courier Carrier</span>
                      <span className="font-semibold text-on-surface">{trackingResult.carrier}</span>
                    </div>
                    <div>
                      <span className="text-on-surface-variant/50 block text-[10px] uppercase font-bold tracking-wider">Tracking Code</span>
                      <span className="font-mono text-on-surface">{trackingResult.trackingNumber}</span>
                    </div>
                    <div>
                      <span className="text-on-surface-variant/50 block text-[10px] uppercase font-bold tracking-wider">Signature Address</span>
                      <span className="text-on-surface-variant leading-relaxed">{trackingResult.address}</span>
                    </div>
                  </div>
                </div>

                {/* Items in shipment */}
                <div className="glass-level-1 p-6 rounded-3xl border border-white/5 shadow-xl space-y-4">
                  <h4 className="font-display font-extrabold text-xs uppercase tracking-widest text-on-surface">Items Staged</h4>
                  <div className="space-y-3">
                    {trackingResult.items.map((item: any, idx: number) => (
                      <div key={idx} className="flex justify-between items-center text-xs">
                        <div>
                          <span className="font-semibold text-on-surface block">{item.name}</span>
                          <span className="text-on-surface-variant/60 text-[10px]">{item.color} / {item.size} • Qty {item.qty}</span>
                        </div>
                        <span className="font-display font-bold text-primary">${(item.price * item.qty).toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default TrackOrder;
