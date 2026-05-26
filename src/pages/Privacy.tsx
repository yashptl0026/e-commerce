import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Eye, Lock, RefreshCw, Smartphone, Server } from 'lucide-react';

export const Privacy: React.FC = () => {
  const sections = [
    {
      icon: <Eye className="w-5 h-5 text-primary" />,
      title: "1. Information We Collect",
      content: "We collect information you provide directly to us when creating an account, making a purchase, subscribing to our newsletter, or communicating with our Concierge team. This includes your name, email address, billing/shipping address, phone number, and payment details."
    },
    {
      icon: <Smartphone className="w-5 h-5 text-primary" />,
      title: "2. Device & Usage Data",
      content: "When you visit Lumina Luxe, we automatically gather diagnostic details about your device, browser, IP address, timezone, and interactive behaviors on our platform. This data is leveraged to customize your luxury interface presentation."
    },
    {
      icon: <Lock className="w-5 h-5 text-primary" />,
      title: "3. How We Secure Data",
      content: "Your security is paramount. We employ strict industry standards, including AES-256 encryption at rest and TLS transmission protocols, to ensure your private transactions and profile data remain completely secure. We do not store raw credit card credentials."
    },
    {
      icon: <Server className="w-5 h-5 text-primary" />,
      title: "4. Third-Party Sharing",
      content: "We do not sell your personal data. We only share details with trusted service partners (such as secure payment gateways, international premium couriers, and cloud hosting infrastructure) to fulfill your orders and support operations."
    },
    {
      icon: <RefreshCw className="w-5 h-5 text-primary" />,
      title: "5. Cookies & Tracking",
      content: "Our system implements minimalist functional cookies to remember items in your shopping bag, save your layout preferences (such as dark mode), and generate anonymous performance analytics. You can adjust your browser to refuse cookies, though some features may degrade."
    },
    {
      icon: <Shield className="w-5 h-5 text-primary" />,
      title: "6. Your Rights & Control",
      content: "Under modern privacy standards (such as GDPR and CCPA), you reserve full rights to request access to, correction of, or permanent deletion of your stored personal records. To execute these actions, please contact our Support Concierge desk."
    }
  ];

  return (
    <main className="flex-grow pt-20 pb-16 md:pt-28 md:pb-24 px-4 md:px-6 max-w-5xl mx-auto w-full">
      {/* Header */}
      <header className="text-center space-y-4 mb-12 md:mb-16 relative">
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-primary/5 via-secondary/10 to-transparent blur-3xl rounded-full opacity-40 w-3/4 h-3/4 mx-auto pointer-events-none"></div>
        <div className="relative z-10 space-y-3">
          <span className="text-xs tracking-[0.2em] font-semibold text-primary uppercase">Security & Confidentiality</span>
          <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-on-surface uppercase tracking-tight">
            Privacy Policy
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
            className="glass-level-1 p-6 md:p-8 rounded-3xl border border-border shadow-xl flex flex-col gap-4 card-hover"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full glass-level-2 border border-border flex items-center justify-center">
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
        className="mt-12 text-center text-xs text-on-surface-variant max-w-lg mx-auto leading-relaxed border-t border-border pt-8"
      >
        If you have questions regarding this Privacy Policy, our data processing techniques, or wish to submit a data erasure request, please contact our Privacy Team at{" "}
        <a href="mailto:privacy@luminaluxe.com" className="text-primary underline hover:text-secondary transition-colors">
          privacy@luminaluxe.com
        </a>.
      </motion.div>
    </main>
  );
};

export default Privacy;
