import React from 'react';
import { motion } from 'framer-motion';
import { Scale, Users, ShieldAlert, CreditCard, ShoppingBag, Globe } from 'lucide-react';

export const Terms: React.FC = () => {
  const sections = [
    {
      icon: <Scale className="w-5 h-5 text-primary" />,
      title: "1. Acceptance of Terms",
      content: "By accessing, browsing, or using the Lumina Luxe digital platform, you explicitly acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree to these terms, please discontinue using this website."
    },
    {
      icon: <Users className="w-5 h-5 text-primary" />,
      title: "2. User Registration & Accounts",
      content: "When creating an account on our platform, you are responsible for maintaining the strict confidentiality of your login credentials and are fully liable for all operations occurring under your account profile. You must notify us immediately of any unauthorized access."
    },
    {
      icon: <ShoppingBag className="w-5 h-5 text-primary" />,
      title: "3. Products & Pricing",
      content: "We strive to present product specifications, colors, and sizing details with cinematic precision. However, actual display dimensions may vary slightly depending on your hardware monitor. All pricing configurations are listed in USD and subject to adjustments without prior notice."
    },
    {
      icon: <CreditCard className="w-5 h-5 text-primary" />,
      title: "4. Payments & Billing",
      content: "All payments are processed securely through certified PCI-DSS compliant third-party gateways. By submitting an order, you guarantee that you are authorized to use the designated payment instrument, and authorize us to charge the full transaction amount."
    },
    {
      icon: <ShieldAlert className="w-5 h-5 text-primary" />,
      title: "5. Intellectual Property",
      content: "All design components, interfaces, imagery, styling presets, text, custom illustrations, and software code compiled on Lumina Luxe are protected by international trademark, copyright, and digital proprietary rights laws. Reproduction or cloning is strictly prohibited."
    },
    {
      icon: <Globe className="w-5 h-5 text-primary" />,
      title: "6. Limitation of Liability",
      content: "Lumina Luxe, its executives, and manufacturing facilities shall not be held liable for any indirect, incidental, punitive, or consequential damages arising from the shipping delays, out-of-stock anomalies, or system unavailability. Purchases are subject to our standard warranties."
    }
  ];

  return (
    <main className="flex-grow pt-24 pb-16 md:pt-32 md:pb-24 px-4 md:px-6 max-w-5xl mx-auto w-full">
      {/* Header */}
      <header className="text-center space-y-4 mb-12 md:mb-16 relative">
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-primary/5 via-secondary/10 to-transparent blur-3xl rounded-full opacity-40 w-3/4 h-3/4 mx-auto pointer-events-none"></div>
        <div className="relative z-10 space-y-3">
          <span className="text-xs tracking-[0.2em] font-semibold text-primary uppercase">Rules & Agreements</span>
          <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-on-surface uppercase tracking-tight">
            Terms of Service
          </h1>
          <p className="text-xs text-on-surface-variant max-w-md mx-auto font-display font-medium tracking-wide">
            LAST UPDATED: MAY 24, 2026
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
            className="glass-level-1 p-6 md:p-8 rounded-3xl border border-white/5 shadow-xl flex flex-col gap-4 card-hover"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full glass-level-2 border border-white/10 flex items-center justify-center">
                {section.icon}
              </div>
              <h3 className="font-display font-bold text-sm sm:text-base text-on-surface uppercase tracking-wide">
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
        className="mt-12 text-center text-xs text-on-surface-variant max-w-lg mx-auto leading-relaxed border-t border-white/5 pt-8"
      >
        For inquiries regarding our terms, commercial licensing, or physical boutique showroom guidelines, please contact our Legal Department at{" "}
        <a href="mailto:legal@luminaluxe.com" className="text-primary underline hover:text-secondary transition-colors">
          legal@luminaluxe.com
        </a>.
      </motion.div>
    </main>
  );
};

export default Terms;
