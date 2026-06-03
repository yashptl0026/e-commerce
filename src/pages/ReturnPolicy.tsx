import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Tag, Headphones, RefreshCw, Scissors, Truck } from 'lucide-react';
import { SEO } from '../components/SEO';

export const ReturnPolicy: React.FC = () => {
  const sections = [
    {
      icon: <Calendar className="w-5 h-5 text-primary" />,
      title: "1. 30-Day Return Window",
      content: "We offer a complimentary 30-day return policy. You can request a full refund or exchange for any product purchased on Aetheria Luxe within 30 calendar days of delivery, subject to our validation standards."
    },
    {
      icon: <Tag className="w-5 h-5 text-primary" />,
      title: "2. Pristine Condition",
      content: "To qualify for a refund, returned items must remain in pristine condition. Products must be unworn, unused, unwashed, and returned in their signature Aetheria Luxe boxes with all security tags, labels, and documentation intact."
    },
    {
      icon: <Headphones className="w-5 h-5 text-primary" />,
      title: "3. Initiating a Return",
      content: "You can easily request a return label via our Concierge Support Desk chatbot or contact form. Alternatively, if you purchased via an authenticated profile, you can retrieve a prepaid shipping label from your Order History panel."
    },
    {
      icon: <RefreshCw className="w-5 h-5 text-primary" />,
      title: "4. Processing & Refunds",
      content: "Once received at our luxury inspection center, returned shipments are audited within 2 business days. Approved returns are refunded to your original payment method. Please allow 3 to 5 business days for funds to settle."
    },
    {
      icon: <Scissors className="w-5 h-5 text-primary" />,
      title: "5. Bespoke Exclusions",
      content: "Items that have undergone custom tailoring adjustments, bespoke calibration, or personalized engraving at our physical showrooms are considered final sale. These custom orders are ineligible for returns or exchanges."
    },
    {
      icon: <Truck className="w-5 h-5 text-primary" />,
      title: "6. Return Shipping Fees",
      content: "We provide prepaid shipping labels for all domestic returns. Returns on initial orders exceeding $1,000 qualify for free return shipping. For orders under $1,000, a flat restocking fee of $25 is deducted from the refund."
    }
  ];

  return (
    <main className="flex-grow pt-20 pb-16 md:pt-28 md:pb-24 px-4 md:px-6 max-w-5xl mx-auto w-full">
      <SEO
        title="Return & Refund Policy"
        description="Review Aetheria Luxe return policies. Complimentary 30-day returns on pristine apparel, watches, and accessories."
      />

      {/* Header */}
      <header className="text-center space-y-4 mb-12 md:mb-16 relative">
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-primary/5 via-secondary/10 to-transparent blur-3xl rounded-full opacity-40 w-3/4 h-3/4 mx-auto pointer-events-none"></div>
        <div className="relative z-10 space-y-3">
          <span className="text-xs tracking-[0.2em] font-semibold text-primary">Guarantees & Assurances</span>
          <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-on-surface tracking-tight">
            Return & Refund Policy
          </h1>
          <p className="text-xs text-on-surface-variant max-w-md mx-auto font-display font-medium tracking-wide">
            LAST UPDATED: MAY 28, 2026
          </p>
        </div>
      </header>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
        {sections.map((section, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.05, duration: 0.5 }}
            className="glass-level-1 p-6 md:p-8 rounded-3xl border border-border shadow-xl flex flex-col gap-4 card-hover"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full glass-level-2 border border-border flex items-center justify-center">
                {section.icon}
              </div>
              <h3 className="font-display font-bold text-sm sm:text-base text-on-surface tracking-wide">
                {section.title}
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed font-body">
              {section.content}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Bottom note */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-12 text-center text-xs text-on-surface-variant max-w-lg mx-auto leading-relaxed border-t border-border pt-8"
      >
        For details on international return labels, duties reclamation, or showroom swap protocols, please connect with our global support team at{" "}
        <a href="mailto:concierge@aetherialuxe.com" className="text-primary underline hover:text-secondary transition-colors">
          concierge@aetherialuxe.com
        </a>.
      </motion.div>
    </main>
  );
};

export default ReturnPolicy;
