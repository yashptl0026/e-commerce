import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, Truck, ShieldCheck, Lock, Award } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { sanitizeInput } from '../utils/security';

export const Checkout: React.FC = () => {
  const { cart, userProfile, placeOrder, showToast } = useApp();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Discount value passed from cart
  const discountVal = parseFloat(searchParams.get('discount') || '0');

  // Checkout Steps: 1 = Shipping, 2 = Payment, 3 = Review
  const [step, setStep] = useState(1);

  // Shipping Form State (Prefilled with user default address if exists)
  const defaultAddr = userProfile.addresses.find((a) => a.isDefault) || userProfile.addresses[0];
  const [shippingForm, setShippingForm] = useState({
    fullName: defaultAddr?.fullName || userProfile.fullName || '',
    addressLine1: defaultAddr?.addressLine1 || '',
    addressLine2: defaultAddr?.addressLine2 || '',
    city: defaultAddr?.city || '',
    state: defaultAddr?.state || '',
    zipCode: defaultAddr?.zipCode || '',
    country: defaultAddr?.country || 'United States',
    phone: defaultAddr?.phone || userProfile.phone || ''
  });

  // Payment Form State
  const [paymentForm, setPaymentForm] = useState({
    cardholderName: userProfile.fullName || '',
    cardNumber: '',
    expiryDate: '',
    cvc: ''
  });

  // Calculate pricing
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountedSubtotal = subtotal - discountVal;
  const shippingCost = discountedSubtotal > 1000 ? 0 : 25;
  const tax = Math.round(discountedSubtotal * 0.08 * 100) / 100;
  const total = discountedSubtotal + shippingCost + tax;

  // Safeguard: Redirect if cart is empty
  useEffect(() => {
    if (cart.length === 0) {
      navigate('/cart');
    }
  }, [cart, navigate]);

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const sanitizedForm = {
      fullName: sanitizeInput(shippingForm.fullName.trim()),
      addressLine1: sanitizeInput(shippingForm.addressLine1.trim()),
      addressLine2: sanitizeInput(shippingForm.addressLine2.trim()),
      city: sanitizeInput(shippingForm.city.trim()),
      state: sanitizeInput(shippingForm.state.trim()),
      zipCode: sanitizeInput(shippingForm.zipCode.trim()),
      country: sanitizeInput(shippingForm.country.trim()),
      phone: sanitizeInput(shippingForm.phone.trim()),
    };

    setShippingForm(sanitizedForm);

    if (
      sanitizedForm.fullName &&
      sanitizedForm.addressLine1 &&
      sanitizedForm.city &&
      sanitizedForm.state &&
      sanitizedForm.zipCode &&
      sanitizedForm.phone
    ) {
      setStep(2);
    } else {
      showToast('Please fill out all required shipping fields.', 'error');
    }
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const sanitizedPayment = {
      cardholderName: sanitizeInput(paymentForm.cardholderName.trim()),
      cardNumber: sanitizeInput(paymentForm.cardNumber.replace(/\s/g, '')),
      expiryDate: sanitizeInput(paymentForm.expiryDate.trim()),
      cvc: sanitizeInput(paymentForm.cvc.trim()),
    };

    setPaymentForm(prev => ({
      ...prev,
      cardholderName: sanitizedPayment.cardholderName,
    }));

    if (
      sanitizedPayment.cardholderName &&
      sanitizedPayment.cardNumber.length >= 15 &&
      sanitizedPayment.expiryDate.includes('/') &&
      sanitizedPayment.cvc.length >= 3
    ) {
      setStep(3);
    } else {
      showToast('Please enter valid credit card details.', 'error');
    }
  };

  const handleCompleteOrder = () => {
    try {
      const orderObj = placeOrder(shippingForm);
      if (orderObj && orderObj.id) {
        navigate(`/order-confirmation?orderId=${orderObj.id}`);
      } else {
        showToast('Error generating transaction record.', 'error');
      }
    } catch (error) {
      showToast('An error occurred during transaction processing. Please try again.', 'error');
    }
  };

  return (
    <main className="flex-grow pt-20 pb-16 md:pt-28 md:pb-24 px-4 md:px-6 max-w-5xl mx-auto w-full">
      {/* Step Indicators */}
      <div className="flex items-center justify-between max-w-md mx-auto mb-12 relative">
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-200 dark:bg-white/10 z-0 -translate-y-1/2"></div>
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-primary z-0 -translate-y-1/2 transition-all duration-300" style={{
          width: step === 1 ? '0%' : step === 2 ? '50%' : '100%'
        }}></div>

        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={`w-10 h-10 rounded-full flex items-center justify-center font-display text-sm font-bold z-10 border transition-all ${
              step >= s
                ? 'bg-primary text-on-primary border-primary shadow-[0_0_15px_rgba(173,198,255,0.4)]'
                : 'bg-surface-container text-on-surface-variant border-slate-200 dark:border-white/10'
            }`}
          >
            {s === 1 && <Truck className="w-4 h-4" />}
            {s === 2 && <CreditCard className="w-4 h-4" />}
            {s === 3 && <ShieldCheck className="w-4 h-4" />}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Checkout Forms Panel */}
        <div className="lg:col-span-8 glass-level-1 rounded-2xl p-6 md:p-8 border border-slate-200 dark:border-white/5 shadow-xl">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="shipping"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-6"
              >
                <h2 className="text-xl font-display font-bold tracking-wider text-on-surface">
                  Shipping Address
                </h2>
                <form onSubmit={handleShippingSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-on-surface-variant">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={shippingForm.fullName}
                        onChange={(e) => setShippingForm({ ...shippingForm, fullName: e.target.value })}
                        className="w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary text-on-surface"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-on-surface-variant">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        value={shippingForm.phone}
                        onChange={(e) => setShippingForm({ ...shippingForm, phone: e.target.value })}
                        className="w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary text-on-surface"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-on-surface-variant">Address Line 1 *</label>
                    <input
                      type="text"
                      required
                      value={shippingForm.addressLine1}
                      onChange={(e) => setShippingForm({ ...shippingForm, addressLine1: e.target.value })}
                      className="w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary text-on-surface"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-on-surface-variant">Address Line 2 (Optional)</label>
                    <input
                      type="text"
                      value={shippingForm.addressLine2}
                      onChange={(e) => setShippingForm({ ...shippingForm, addressLine2: e.target.value })}
                      className="w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary text-on-surface"
                    />
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="col-span-2 sm:col-span-2 space-y-1.5">
                      <label className="text-xs font-semibold text-on-surface-variant">City *</label>
                      <input
                        type="text"
                        required
                        value={shippingForm.city}
                        onChange={(e) => setShippingForm({ ...shippingForm, city: e.target.value })}
                        className="w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary text-on-surface"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-on-surface-variant">State *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. NY"
                        value={shippingForm.state}
                        onChange={(e) => setShippingForm({ ...shippingForm, state: e.target.value })}
                        className="w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary text-on-surface"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-on-surface-variant">ZIP Code *</label>
                      <input
                        type="text"
                        required
                        value={shippingForm.zipCode}
                        onChange={(e) => setShippingForm({ ...shippingForm, zipCode: e.target.value })}
                        className="w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary text-on-surface"
                      />
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      className="w-full py-3.5 bg-primary text-on-primary font-display font-bold text-sm rounded-full btn-primary-glow"
                    >
                      Continue to Payment
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="payment"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-6"
              >
                <h2 className="text-xl font-display font-bold tracking-wider text-on-surface">
                  Payment Details
                </h2>
                <form onSubmit={handlePaymentSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-on-surface-variant">Cardholder Name *</label>
                    <input
                      type="text"
                      required
                      value={paymentForm.cardholderName}
                      onChange={(e) => setPaymentForm({ ...paymentForm, cardholderName: e.target.value })}
                      className="w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary text-on-surface"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-on-surface-variant">Card Number *</label>
                    <input
                      type="text"
                      required
                      maxLength={19}
                      placeholder="4111 2222 3333 4444"
                      value={paymentForm.cardNumber}
                      onChange={(e) => {
                        // Basic digit formatting
                        const v = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
                        const matches = v.match(/\d{4,16}/g);
                        const match = (matches && matches[0]) || '';
                        const parts = [];

                        for (let i = 0, len = match.length; i < len; i += 4) {
                          parts.push(match.substring(i, i + 4));
                        }

                        if (parts.length > 0) {
                          setPaymentForm({ ...paymentForm, cardNumber: parts.join(' ') });
                        } else {
                          setPaymentForm({ ...paymentForm, cardNumber: v });
                        }
                      }}
                      className="w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary text-on-surface font-display"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-on-surface-variant">Expiration Date *</label>
                      <input
                        type="text"
                        required
                        maxLength={5}
                        placeholder="MM/YY"
                        value={paymentForm.expiryDate}
                        onChange={(e) => {
                          let v = e.target.value.replace(/[^0-9/]/g, '');
                          if (v.length === 2 && !v.includes('/')) {
                            v = `${v}/`;
                          }
                          setPaymentForm({ ...paymentForm, expiryDate: v });
                        }}
                        className="w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary text-on-surface font-display"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-on-surface-variant">CVC *</label>
                      <input
                        type="password"
                        required
                        maxLength={4}
                        placeholder="123"
                        value={paymentForm.cvc}
                        onChange={(e) => setPaymentForm({ ...paymentForm, cvc: e.target.value.replace(/[^0-9]/g, '') })}
                        className="w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary text-on-surface font-display"
                      />
                    </div>
                  </div>

                  <div className="pt-4 flex gap-4">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="w-1/3 py-3.5 border border-slate-300 dark:border-white/20 hover:bg-slate-100 dark:hover:bg-white/5 text-on-surface font-display font-bold text-sm rounded-full"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="w-2/3 py-3.5 bg-primary text-on-primary font-display font-bold text-sm rounded-full btn-primary-glow"
                    >
                      Review Order
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="review"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-6"
              >
                <h2 className="text-xl font-display font-bold tracking-wider text-on-surface">
                  Order Summary Review
                </h2>
                
                <div className="space-y-4">
                  {/* Shipping summary */}
                  <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl p-4 space-y-2">
                    <h4 className="text-xs font-bold text-primary">Shipping Info</h4>
                    <p className="text-sm font-semibold">{shippingForm.fullName}</p>
                    <p className="text-xs text-on-surface-variant">
                      {shippingForm.addressLine1}, {shippingForm.addressLine2 ? `${shippingForm.addressLine2}, ` : ''}
                      {shippingForm.city}, {shippingForm.state} {shippingForm.zipCode}, {shippingForm.country}
                    </p>
                    <p className="text-xs text-on-surface-variant">Phone: {shippingForm.phone}</p>
                  </div>

                  {/* Payment summary */}
                  <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl p-4 space-y-2">
                    <h4 className="text-xs font-bold text-primary">Payment Method</h4>
                    <p className="text-sm font-semibold flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-on-surface-variant" />
                      Card ending in {paymentForm.cardNumber.slice(-4)}
                    </p>
                  </div>

                  <div className="pt-4 flex gap-4">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="w-1/3 py-3.5 border border-slate-300 dark:border-white/20 hover:bg-slate-100 dark:hover:bg-white/5 text-on-surface font-display font-bold text-sm rounded-full"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleCompleteOrder}
                      className="w-2/3 py-3.5 bg-primary text-on-primary font-display font-bold text-sm rounded-full btn-primary-glow flex items-center justify-center gap-2"
                    >
                      PLACE ORDER &bull; ${total.toLocaleString()}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Pricing Summary & Trust Side */}
        <div className="lg:col-span-4 space-y-6">
          <div className="glass-level-2 rounded-2xl p-6 border border-slate-200 dark:border-white/10 shadow-2xl space-y-6">
            <h3 className="font-display font-bold text-base tracking-wider text-on-surface border-b border-slate-200 dark:border-white/5 pb-2">
              Bag Items ({cart.length})
            </h3>

            {/* Cart items summary scroll */}
            <div className="space-y-4 max-h-72 overflow-y-auto custom-scrollbar pr-1">
              {cart.map((item) => (
                <div key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`} className="flex gap-4">
                  <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0 border border-slate-200 dark:border-white/5">
                    <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-grow min-w-0 space-y-0.5">
                    <h4 className="text-xs font-semibold truncate text-on-surface">{item.product.name}</h4>
                    <p className="text-[10px] text-on-surface-variant font-medium tracking-wider">
                      {item.selectedColor} &bull; {item.selectedSize} &bull; Qty {item.quantity}
                    </p>
                    <p className="text-xs font-display font-bold text-primary">${(item.product.price * item.quantity).toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3.5 text-xs text-on-surface-variant font-medium border-t border-slate-200 dark:border-white/5 pt-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-display text-on-surface">${subtotal.toLocaleString()}</span>
              </div>
              {discountVal > 0 && (
                <div className="flex justify-between text-primary font-bold">
                  <span>Discount applied</span>
                  <span>-${discountVal.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-display text-on-surface">
                  {shippingCost === 0 ? 'Free' : `$${shippingCost.toLocaleString()}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Tax</span>
                <span className="font-display text-on-surface">${tax.toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-display font-extrabold text-sm text-on-surface border-t border-slate-200 dark:border-white/5 pt-3">
                <span>Total</span>
                <span className="text-primary text-base">${total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Trust & Security Badges */}
          <div className="glass-level-1 rounded-2xl p-5 border border-slate-200 dark:border-white/5 shadow-xl space-y-4">
            <h4 className="font-display font-extrabold text-[10px] tracking-wide text-on-surface flex items-center gap-2 border-b border-slate-200 dark:border-white/5 pb-2.5">
              <ShieldCheck className="w-4 h-4 text-primary" /> Commercial Trust & Security
            </h4>
            
            <div className="space-y-3.5">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 border border-primary/20">
                  <Lock className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="text-[11px] font-bold text-on-surface tracking-wide">SSL 256-Bit Encrypted</h5>
                  <p className="text-[10px] text-on-surface-variant/70 leading-normal font-body">
                    Your digital transaction details are fully encrypted and secure.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 border border-primary/20">
                  <CreditCard className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="text-[11px] font-bold text-on-surface tracking-wide">PCI-DSS Level 1 Compliant</h5>
                  <p className="text-[10px] text-on-surface-variant/70 leading-normal font-body">
                    Commercial transactions are processed under elite international financial safety standards.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 border border-primary/20">
                  <Truck className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="text-[11px] font-bold text-on-surface tracking-wide">Insured Signature Delivery</h5>
                  <p className="text-[10px] text-on-surface-variant/70 leading-normal font-body">
                    Complimentary express dispatch, fully insured with digital tracking and signature requirement.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 border border-primary/20">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="text-[11px] font-bold text-on-surface tracking-wide">Bespoke Quality Guarantee</h5>
                  <p className="text-[10px] text-on-surface-variant/70 leading-normal font-body">
                    Every luxury artifact undergoes meticulous hand-inspection prior to custom packaging.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
export default Checkout;
