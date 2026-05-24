import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Clock, Send, CheckCircle, MapPin } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Contact: React.FC = () => {
  const { showToast } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name.trim() && formData.email.trim() && formData.message.trim()) {
      showToast('Your message has been sent to our Concierge desk.', 'success');
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' });
    }
  };

  const contactMethods = [
    {
      icon: <Mail className="w-5 h-5 text-primary" />,
      label: "Email Concierge",
      value: "concierge@luminaluxe.com",
      link: "mailto:concierge@luminaluxe.com",
      desc: "Response within 12 hours"
    },
    {
      icon: <Phone className="w-5 h-5 text-primary" />,
      label: "Phone Support",
      value: "+1 (800) 958-6462",
      link: "tel:+18009586462",
      desc: "Mon-Sat: 10AM - 8PM EST"
    },
    {
      icon: <Clock className="w-5 h-5 text-primary" />,
      label: "Showroom Hours",
      value: "Mon-Sat: 10am - 8pm",
      link: null,
      desc: "Sunday: 11am - 6pm"
    }
  ];

  return (
    <div className="flex-grow pt-24 pb-16 md:pt-32 md:pb-24 px-4 md:px-6 max-w-7xl mx-auto w-full">
      {/* Header */}
      <header className="text-center space-y-4 mb-12 md:mb-16 relative">
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-primary/5 via-secondary/10 to-transparent blur-3xl rounded-full opacity-40 w-3/4 h-3/4 mx-auto pointer-events-none"></div>
        <div className="relative z-10 space-y-3">
          <span className="text-xs tracking-[0.2em] font-semibold text-primary uppercase">Client Relations</span>
          <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-on-surface uppercase tracking-tight">
            Contact Concierge
          </h1>
          <p className="text-body-md text-on-surface-variant max-w-lg mx-auto text-sm sm:text-base leading-relaxed font-body">
            Have questions about a collection, request custom sizing, or seek help with an active order? Connect with our digital support desk or send a direct inquiry.
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
        {/* Contact Info Cards */}
        <div className="lg:col-span-5 space-y-6">
          {contactMethods.map((method, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05, duration: 0.5 }}
              className="glass-level-1 p-6 rounded-3xl border border-white/5 shadow-lg flex gap-4 items-center card-hover"
            >
              <div className="w-12 h-12 rounded-full glass-level-2 border border-white/10 flex items-center justify-center shrink-0">
                {method.icon}
              </div>
              <div className="space-y-1">
                <span className="text-[10px] text-on-surface-variant uppercase font-bold tracking-wider block">
                  {method.label}
                </span>
                {method.link ? (
                  <a href={method.link} className="font-display font-bold text-sm sm:text-base text-on-surface hover:text-primary transition-colors">
                    {method.value}
                  </a>
                ) : (
                  <span className="font-display font-bold text-sm sm:text-base text-on-surface">
                    {method.value}
                  </span>
                )}
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  {method.desc}
                </p>
              </div>
            </motion.div>
          ))}

          {/* Map details representation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="glass-level-1 p-6 rounded-3xl border border-white/5 shadow-lg space-y-4"
          >
            <div className="flex items-center gap-2 text-primary font-display font-bold text-xs uppercase tracking-wider">
              <MapPin className="w-4.5 h-4.5" />
              <span>HQ & Flagship Boutique</span>
            </div>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Lumina Luxe Gallery Boutique<br />
              742 Frost Obsidian Boulevard, Soho<br />
              New York, NY 10001
            </p>
          </motion.div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-level-2 p-6 sm:p-10 rounded-3xl border border-white/10 shadow-2xl"
          >
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="font-display font-extrabold text-lg sm:text-xl uppercase tracking-tight text-on-surface mb-2">
                  Send Direct Inquiry
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <label className="text-[10px] text-on-surface-variant uppercase font-bold tracking-wider">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. John Doe"
                      className="w-full bg-white/5 border border-white/10 rounded-full px-5 py-3 text-xs text-on-surface placeholder:text-on-surface-variant/30 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent transition-all"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="text-[10px] text-on-surface-variant uppercase font-bold tracking-wider">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. john@example.com"
                      className="w-full bg-white/5 border border-white/10 rounded-full px-5 py-3 text-xs text-on-surface placeholder:text-on-surface-variant/30 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div className="space-y-2">
                  <label className="text-[10px] text-on-surface-variant uppercase font-bold tracking-wider">
                    Inquiry Subject
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-[#191b23] border border-white/10 rounded-full px-5 py-3 text-xs text-on-surface focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent transition-all cursor-pointer"
                  >
                    <option value="General Inquiry">General Inquiry / Styling Advice</option>
                    <option value="Order Status">Order Status & Tracking</option>
                    <option value="Custom Sizing">Custom Showroom Fitting Sessions</option>
                    <option value="Partnership">Brand Partnerships & Press</option>
                  </select>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label className="text-[10px] text-on-surface-variant uppercase font-bold tracking-wider">
                    Your Message
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Draft your message detail here..."
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 text-xs text-on-surface placeholder:text-on-surface-variant/30 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent transition-all resize-none"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full bg-primary text-[#002e6a] font-display font-extrabold text-xs py-3.5 rounded-full flex items-center justify-center gap-1.5 btn-primary-glow active:scale-98 transition-all shadow-xl"
                >
                  <Send className="w-4 h-4" /> SUBMIT MESSAGE
                </button>
              </form>
            ) : (
              <div className="py-12 flex flex-col items-center justify-center text-center space-y-5">
                <CheckCircle className="w-16 h-16 text-primary animate-pulse" />
                <h3 className="font-display font-extrabold text-lg sm:text-xl uppercase tracking-tight text-on-surface">
                  Submission Successful
                </h3>
                <p className="text-xs text-on-surface-variant max-w-sm leading-relaxed">
                  Your details have been registered. A luxury coordinator will contact you via email shortly. Thank you for connecting.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="bg-white/5 border border-white/10 hover:border-primary/30 text-on-surface font-display font-bold text-xs py-2.5 px-6 rounded-full transition-all"
                >
                  Submit Another Message
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
