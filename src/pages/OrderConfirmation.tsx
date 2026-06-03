import React, { useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, ShoppingBag, Truck, Calendar } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const OrderConfirmation: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { orders } = useApp();

  const orderId = searchParams.get('orderId');

  const order = useMemo(() => {
    return orders.find((o) => o.id === orderId) || orders[0];
  }, [orders, orderId]);

  // Delivery calculation (7 days from today)
  const deliveryDate = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() + 7);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }, []);

  if (!order) {
    return (
      <div className="flex-grow pt-28 pb-24 text-center max-w-7xl mx-auto flex flex-col items-center justify-center gap-6">
        <h2 className="text-3xl font-display font-bold">No Order Confirmed</h2>
        <Link to="/" className="bg-primary text-on-primary font-display font-bold py-3 px-8 rounded-full">
          Return to Home
        </Link>
      </div>
    );
  }

  return (
    <main className="flex-grow pt-20 pb-16 md:pt-28 md:pb-24 px-4 md:px-6 max-w-3xl mx-auto w-full text-center space-y-8 md:space-y-12">
      {/* Success Icon */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className="w-20 h-20 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto text-primary shadow-[0_0_30px_rgba(173,198,255,0.2)] animate-pulse"
      >
        <CheckCircle2 className="w-12 h-12" />
      </motion.div>

      <div className="space-y-4">
        <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-on-surface tracking-tight">
          Thank you for your order
        </h1>
        <p className="text-on-surface-variant max-w-md mx-auto text-sm sm:text-base leading-relaxed">
          Your order has been successfully placed. We have emailed you your transaction receipt and shipping details.
        </p>
      </div>

      {/* Order Info Sheet */}
      <div className="glass-level-1 rounded-2xl p-6 md:p-8 border border-white/5 text-left space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row justify-between border-b border-white/5 pb-4 gap-2">
          <div>
            <span className="text-[10px] text-on-surface-variant font-bold tracking-widest">Order Number</span>
            <p className="text-sm font-display font-bold text-primary">{order.id}</p>
          </div>
          <div>
            <span className="text-[10px] text-on-surface-variant font-bold tracking-widest">Order Date</span>
            <p className="text-sm font-semibold">{order.date}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-b border-white/5 pb-6">
          {/* Est delivery */}
          <div className="space-y-2 flex items-start gap-3">
            <Calendar className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-on-surface">Estimated Delivery</h4>
              <p className="text-xs text-on-surface-variant leading-relaxed mt-0.5">{deliveryDate}</p>
            </div>
          </div>

          {/* Shipping summary */}
          <div className="space-y-2 flex items-start gap-3">
            <Truck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-on-surface">Shipping Address</h4>
              <p className="text-xs text-on-surface-variant leading-relaxed mt-0.5">
                {order.shippingAddress.fullName}<br />
                {order.shippingAddress.addressLine1}, {order.shippingAddress.addressLine2 ? `${order.shippingAddress.addressLine2}, ` : ''}
                {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
              </p>
            </div>
          </div>
        </div>

        {/* List of items */}
        <div className="space-y-4">
          <h4 className="text-xs font-bold tracking-wider text-on-surface">Items Summary</h4>
          <div className="space-y-3">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center text-sm">
                <div className="truncate pr-4">
                  <span className="font-semibold text-on-surface">{item.product.name}</span>
                  <span className="text-xs text-on-surface-variant block tracking-wider mt-0.5">
                    {item.selectedColor} &bull; {item.selectedSize} &bull; Qty {item.quantity}
                  </span>
                </div>
                <span className="font-display font-semibold text-on-surface whitespace-nowrap">
                  ${(item.product.price * item.quantity).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-white/5 pt-4 space-y-2 text-xs text-on-surface-variant font-medium">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span className="font-display text-on-surface">${order.subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span className="font-display text-on-surface">
              {order.shipping === 0 ? 'Free' : `$${order.shipping.toLocaleString()}`}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Taxes</span>
            <span className="font-display text-on-surface">${order.tax.toLocaleString()}</span>
          </div>
          <div className="flex justify-between font-display font-extrabold text-sm text-on-surface border-t border-white/5 pt-3">
            <span>Total Paid</span>
            <span className="text-primary">${order.total.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
        <Link
          to="/collection"
          className="bg-primary text-on-primary font-display font-bold py-3.5 px-8 rounded-full btn-primary-glow flex items-center justify-center gap-2"
        >
          <ShoppingBag className="w-4 h-4" /> Continue Shopping
        </Link>
        <Link
          to="/dashboard"
          className="bg-transparent border border-white/20 text-on-surface font-display font-bold py-3.5 px-8 rounded-full hover:bg-white/5 transition-all duration-300 backdrop-blur-md"
        >
          Track Order History
        </Link>
      </div>
    </main>
  );
};
export default OrderConfirmation;
