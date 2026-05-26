import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag, Percent, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Cart: React.FC = () => {
  const { cart, updateCartQuantity, removeFromCart, showToast, products } = useApp();

  // Promo Code States
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [appliedCode, setAppliedCode] = useState('');

  // Math Calculations
  const subtotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }, [cart]);

  const discountValue = useMemo(() => {
    if (discountPercent > 0) {
      return Math.round(subtotal * discountPercent * 100) / 100;
    }
    return Math.min(discountAmount, subtotal);
  }, [subtotal, discountPercent, discountAmount]);

  const discountedSubtotal = subtotal - discountValue;
  const shipping = discountedSubtotal > 1000 || discountedSubtotal === 0 ? 0 : 25;
  const tax = Math.round(discountedSubtotal * 0.08 * 100) / 100;
  const total = discountedSubtotal + shipping + tax;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoCode.trim().toUpperCase();
    if (code === 'LUMINA20') {
      setDiscountPercent(0.2);
      setDiscountAmount(0);
      setAppliedCode('LUMINA20 (20% OFF)');
      showToast('Promo code applied: 20% discount!', 'success');
    } else if (code === 'WELCOME') {
      setDiscountAmount(50);
      setDiscountPercent(0);
      setAppliedCode('WELCOME ($50 OFF)');
      showToast('Promo code applied: $50 discount!', 'success');
    } else {
      showToast('Invalid promo code. Try LUMINA20 or WELCOME.', 'error');
    }
    setPromoCode('');
  };

  const handleRemovePromo = () => {
    setDiscountPercent(0);
    setDiscountAmount(0);
    setAppliedCode('');
    showToast('Promo code removed.', 'info');
  };

  // Recommendations
  const recommendations = products.slice(5, 9);

  return (
    <main className="flex-grow pt-20 pb-16 md:pt-28 md:pb-24 px-4 md:px-6 max-w-7xl mx-auto w-full">
      <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-on-surface mb-10 uppercase tracking-tight">
        Your Bag
      </h1>

      <AnimatePresence mode="wait">
        {cart.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
          >
            {/* Cart Items List */}
            <div className="lg:col-span-8 space-y-4">
              {cart.map((item) => (
                <motion.div
                  key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3 }}
                  className="glass-level-1 rounded-2xl p-4 sm:p-5 flex gap-4 sm:gap-6 items-center border border-white/5 shadow-lg"
                >
                  {/* Image */}
                  <div className="w-20 h-20 sm:w-32 sm:h-32 md:w-40 md:h-40 overflow-hidden rounded-xl bg-surface-container shrink-0">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>

                  {/* Descriptions */}
                  <div className="flex-grow min-w-0 space-y-3 sm:space-y-4">
                    <div className="flex justify-between items-start gap-3 sm:gap-4">
                      <div className="min-w-0">
                        <h3 className="font-display font-bold text-sm sm:text-base md:text-lg text-on-surface leading-snug truncate">
                          {item.product.name}
                        </h3>
                        <p className="text-[10px] sm:text-xs text-on-surface-variant font-medium mt-0.5 sm:mt-1 uppercase tracking-wider">
                          Color: {item.selectedColor} &bull; Size: {item.selectedSize}
                        </p>
                      </div>
                      <span className="font-display font-bold text-primary text-sm sm:text-base whitespace-nowrap">
                        ${(item.product.price * item.quantity).toLocaleString()}
                      </span>
                    </div>

                    <div className="pt-1 sm:pt-2 flex flex-wrap justify-between items-center w-full gap-2.5">
                      {/* Quantity modifier */}
                      <div className="flex items-center glass-level-1 border border-white/10 rounded-full p-0.5">
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.selectedColor, item.selectedSize, item.quantity - 1)}
                          className="w-7 h-7 sm:w-9 sm:h-9 flex items-center justify-center hover:bg-white/5 rounded-full transition-colors text-on-surface-variant hover:text-on-surface"
                        >
                          <Minus className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        </button>
                        <span className="px-2 sm:px-4 font-display font-bold text-xs sm:text-sm w-6 sm:w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.selectedColor, item.selectedSize, item.quantity + 1)}
                          className="w-7 h-7 sm:w-9 sm:h-9 flex items-center justify-center hover:bg-white/5 rounded-full transition-colors text-on-surface-variant hover:text-on-surface"
                        >
                          <Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item.product.id, item.selectedColor, item.selectedSize)}
                        className="text-error/80 hover:text-error flex items-center gap-1 text-[10px] sm:text-[11px] font-display font-bold uppercase tracking-widest transition-colors hover:bg-error/5 px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-full border border-transparent hover:border-error/20"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Remove</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              <div className="glass-level-2 rounded-2xl p-6 border border-white/10 shadow-2xl space-y-6">
                <h2 className="font-display font-bold text-lg uppercase tracking-wider text-on-surface border-b border-white/5 pb-3">
                  Order Summary
                </h2>

                <div className="space-y-3.5 text-sm text-on-surface-variant font-medium border-b border-white/5 pb-5">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-on-surface font-display">${subtotal.toLocaleString()}</span>
                  </div>

                  {appliedCode && (
                    <div className="flex justify-between text-primary font-semibold">
                      <span className="flex items-center gap-1">
                        <Percent className="w-4 h-4" /> Discount ({appliedCode})
                      </span>
                      <span>-${discountValue.toLocaleString()}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Estimated Shipping</span>
                    <span className="text-on-surface font-display">
                      {shipping === 0 ? 'Free Shipping' : `$${shipping.toLocaleString()}`}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Estimated Tax (8%)</span>
                    <span className="text-on-surface font-display">${tax.toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex justify-between font-display font-extrabold text-lg text-on-surface">
                  <span>Total</span>
                  <span className="text-primary">${total.toLocaleString()}</span>
                </div>

                <Link
                  to={`/checkout?discount=${discountValue}`}
                  className="w-full py-4 accent-gradient rounded-full text-white font-display font-bold text-sm shadow-[0_0_20px_rgba(77,142,255,0.3)] hover:shadow-[0_0_30px_rgba(77,142,255,0.5)] transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-2"
                >
                  PROCEED TO CHECKOUT <ArrowRight className="w-4 h-4" />
                </Link>

                {/* Express pay simulation */}
                <div className="pt-4 border-t border-white/5 space-y-3">
                  <p className="text-center text-[10px] font-display font-extrabold text-on-surface-variant tracking-wider uppercase">
                    Express Checkout
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => showToast('Apple Pay express integration mock.', 'info')}
                      className="bg-white text-black font-display font-bold py-2 rounded-xl text-xs hover:opacity-90 transition-opacity"
                    >
                      Apple Pay
                    </button>
                    <button
                      onClick={() => showToast('PayPal express checkout simulation.', 'info')}
                      className="bg-[#593cfb] text-white font-display font-bold py-2 rounded-xl text-xs hover:opacity-90 transition-opacity"
                    >
                      PayPal
                    </button>
                  </div>
                </div>
              </div>

              {/* Promo Code Input Box */}
              <div className="glass-level-1 rounded-2xl p-5 border border-white/5 shadow-xl">
                {!appliedCode ? (
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Promo code (e.g. WELCOME)"
                      className="flex-grow bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-xs focus:outline-none focus:border-primary transition-colors text-on-surface"
                    />
                    <button
                      type="submit"
                      className="glass-level-2 px-5 py-2 rounded-lg font-display text-xs font-bold hover:bg-white/5 transition-colors border border-white/10"
                    >
                      Apply
                    </button>
                  </form>
                ) : (
                  <div className="flex justify-between items-center bg-primary/10 border border-primary/20 rounded-xl p-3">
                    <div className="text-xs text-primary font-bold">
                      Code Applied: {appliedCode}
                    </div>
                    <button
                      onClick={handleRemovePromo}
                      className="text-xs text-on-surface-variant hover:text-error transition-colors font-bold uppercase tracking-wider"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-center gap-2 text-xs text-on-surface-variant bg-white/5 p-4 rounded-xl">
                <ShieldCheck className="w-5 h-5 text-primary" />
                <span>Shop safely with our secure 256-bit SSL transaction gateway.</span>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-level-1 p-20 rounded-3xl text-center border border-white/5 flex flex-col items-center justify-center gap-5 my-8"
          >
            <div className="w-16 h-16 rounded-full glass-level-2 flex items-center justify-center text-primary/40 border border-white/10 mb-2">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-display font-semibold text-on-surface">Your Bag is Empty</h3>
            <p className="text-on-surface-variant max-w-sm text-sm leading-relaxed">
              Before you can check out, you must add some of our premium designed pieces to your shopping cart.
            </p>
            <Link
              to="/collection"
              className="bg-primary text-on-primary font-display font-bold py-3 px-8 rounded-full btn-primary-glow mt-2"
            >
              Start Shopping
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Recs */}
      <section className="mt-16 md:mt-32 border-t border-white/5 pt-8 md:pt-16">
        <h2 className="font-display font-extrabold text-2xl uppercase tracking-tight text-on-surface mb-8">Recently Viewed Items</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {recommendations.map((item) => (
            <Link key={item.id} to={`/product/${item.id}`} className="group space-y-4">
              <div className="aspect-[4/5] overflow-hidden rounded-2xl glass-level-1 relative group border border-white/5 hover:border-white/20 transition-all duration-300">
                <img
                  src={item.images[0]}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="space-y-1">
                <h3 className="text-body-md font-semibold text-on-surface group-hover:text-primary transition-colors truncate">
                  {item.name}
                </h3>
                <p className="text-xs font-display font-semibold text-primary">
                  ${item.price.toLocaleString()}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
};
export default Cart;
