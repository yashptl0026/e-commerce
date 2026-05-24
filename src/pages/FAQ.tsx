import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, Truck, RefreshCw, Sparkles, CreditCard } from 'lucide-react';

interface FaqItem {
  q: string;
  a: string;
}

interface FaqCategory {
  title: string;
  icon: React.ReactNode;
  items: FaqItem[];
}

export const FAQ: React.FC = () => {
  const faqCategories: FaqCategory[] = [
    {
      title: "Shipping & Logistics",
      icon: <Truck className="w-5 h-5 text-primary" />,
      items: [
        {
          q: "What is your shipping and delivery policy?",
          a: "Lumina Luxe offers complimentary express delivery on all orders over $1,000 globally. For orders under $1,000, express delivery is available for a flat rate of $25. Delivery typically takes 5-7 business days, fully insured with real-time digital tracking."
        },
        {
          q: "Do you ship internationally?",
          a: "Yes, we ship to over 150 countries using DHL Express and FedEx International. Duties and taxes are calculated at checkout, so you won't encounter any surprise charges upon delivery."
        },
        {
          q: "Can I redirect a package after shipping?",
          a: "Once an order has been dispatched from our distribution hub, address redirections are subject to approval by the carrier. Please contact our Support Desk as soon as possible if you require changes."
        }
      ]
    },
    {
      title: "Returns & Exchanges",
      icon: <RefreshCw className="w-5 h-5 text-primary" />,
      items: [
        {
          q: "How do I request a return or exchange?",
          a: "We accept secure returns on all pristine, unworn pieces within 30 days of shipment receipt. Signature packaging, security tags, and receipt slips must be present. You can request a prepaid return shipping label via your dashboard or by initiating a chat with our Support Concierge."
        },
        {
          q: "When will I receive my refund?",
          a: "Once our boutique warehouse inspects and approves the returned items, refunds are issued to the original payment method within 3-5 business days. You will receive an automated email confirmation."
        },
        {
          q: "Are custom-tailored items eligible for returns?",
          a: "Garments that have undergone bespoke adjustments, custom sizing, or tailor-made modifications at our showrooms are considered final sale and cannot be returned or exchanged."
        }
      ]
    },
    {
      title: "Care & Customization",
      icon: <Sparkles className="w-5 h-5 text-primary" />,
      items: [
        {
          q: "How do I care for technical silk and cashmere?",
          a: "We recommend professional dry clean only for technical silk items, and gentle hand-washing in cool water using cashmere wool detergent for knitwear. Lay dry flat to preserve material fibers and prevent shape warping."
        },
        {
          q: "Do you offer custom tailoring services?",
          a: "Yes, custom tailoring adjustments are available at our Soho, London, and Tokyo physical showrooms. Simply bring your luxury garment and purchase proof to book an appointment with our master tailors."
        },
        {
          q: "Where can I find a size guide?",
          a: "Each product detail page contains an interactive Size Guide link displaying detailed measurements in both inches and centimeters. For personalized fitting advice, connect with our virtual stylist in live chat."
        }
      ]
    },
    {
      title: "Payments & Security",
      icon: <CreditCard className="w-5 h-5 text-primary" />,
      items: [
        {
          q: "What payment methods do you accept?",
          a: "We accept all major credit cards (Visa, Mastercard, American Express, Discover), secure digital wallets (Apple Pay, Google Pay, PayPal), and select luxury financing plans like Klarna."
        },
        {
          q: "Is shopping on Lumina Luxe secure?",
          a: "Absolutely. Our platform utilizes state-of-the-art secure socket layer (SSL) encryption, PCI-DSS Level 1 payment processing hubs, and robust fraud prevention algorithms to protect your commercial security."
        }
      ]
    }
  ];

  const [activeCategory, setActiveCategory] = useState<number>(0);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <main className="flex-grow pt-24 pb-16 md:pt-32 md:pb-24 px-4 md:px-6 max-w-5xl mx-auto w-full">
      {/* Header */}
      <header className="text-center space-y-4 mb-12 md:mb-16 relative">
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-primary/5 via-secondary/10 to-transparent blur-3xl rounded-full opacity-40 w-3/4 h-3/4 mx-auto pointer-events-none"></div>
        <div className="relative z-10 space-y-3">
          <span className="text-xs tracking-[0.2em] font-semibold text-primary uppercase">Questions & Answers</span>
          <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-on-surface uppercase tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-body-md text-on-surface-variant max-w-lg mx-auto text-sm sm:text-base leading-relaxed font-body">
            Get instant solutions to the most common queries regarding order placement, international delivery logistics, luxury care, and custom adjustments.
          </p>
        </div>
      </header>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start relative z-10">
        
        {/* Navigation Categories */}
        <div className="md:col-span-4 flex md:flex-col gap-2 overflow-x-auto pb-4 md:pb-0 scrollbar-none whitespace-nowrap">
          {faqCategories.map((category, idx) => (
            <button
              key={idx}
              onClick={() => {
                setActiveCategory(idx);
                setOpenIndex(null);
              }}
              className={`flex items-center gap-3.5 px-5 py-4 rounded-2xl font-display font-bold text-xs uppercase tracking-wider text-left border transition-all duration-300 w-full shrink-0 md:shrink-1 ${
                activeCategory === idx
                  ? 'bg-primary/10 border-primary/30 text-primary shadow-lg shadow-primary/5'
                  : 'glass-level-1 border-white/5 text-on-surface-variant hover:border-white/15 hover:text-on-surface'
              }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all ${
                activeCategory === idx ? 'bg-primary/20 border-primary/20 text-primary' : 'bg-white/5 border-white/5'
              }`}>
                {category.icon}
              </div>
              <span>{category.title}</span>
            </button>
          ))}
        </div>

        {/* FAQs Accordion */}
        <div className="md:col-span-8 space-y-4">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-4"
          >
            {faqCategories[activeCategory].items.map((item, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div key={idx} className="glass-level-1 rounded-2xl border border-white/5 overflow-hidden shadow-xl">
                  <button
                    onClick={() => toggleItem(idx)}
                    className="w-full p-6 flex justify-between items-center text-left hover:text-primary transition-colors group"
                  >
                    <span className="font-display font-bold text-sm sm:text-base text-on-surface group-hover:text-primary leading-snug flex items-center gap-3">
                      <HelpCircle className="w-4 h-4 text-primary shrink-0 opacity-80" />
                      {item.q}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-on-surface-variant transition-transform shrink-0 ml-4 ${isOpen ? 'rotate-180 text-primary' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <p className="px-6 pb-6 text-xs sm:text-sm text-on-surface-variant leading-relaxed font-body border-t border-white/2">
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default FAQ;
