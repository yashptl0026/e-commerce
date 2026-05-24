import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Globe, Share2, Mail, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Footer: React.FC = () => {
  const { showToast } = useApp();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      showToast('Thank you for joining our inner circle!', 'success');
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="w-full bg-[#0b0e15] text-on-surface border-t border-white/5 py-16 px-6 md:px-12 max-w-7xl mx-auto rounded-t-3xl mt-auto z-10 relative">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-10">
        
        {/* Brand Column */}
        <div className="col-span-1 sm:col-span-2 lg:col-span-2 space-y-6">
          <h2 className="text-2xl font-display font-bold tracking-tighter text-on-surface">LUMINA LUXE</h2>
          <p className="font-body text-on-surface-variant max-w-sm leading-relaxed text-sm">
            Curating the finest in modern elegance. Defining the intersection of performance, design, and prestige since 2024. Experience luxury without compromise.
          </p>
          <div className="flex gap-4">
            <button className="text-on-surface-variant hover:text-primary transition-all duration-200 cursor-pointer">
              <Globe className="w-5 h-5" />
            </button>
            <button className="text-on-surface-variant hover:text-primary transition-all duration-200 cursor-pointer">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Support Links */}
        <div className="space-y-4 col-span-1">
          <h4 className="font-display font-semibold text-sm uppercase tracking-widest text-on-surface">Support</h4>
          <nav className="flex flex-col gap-2.5 text-sm">
            <Link to="/track-order" className="text-on-surface-variant hover:text-primary transition-colors">Track Order</Link>
            <Link to="/faq" className="text-on-surface-variant hover:text-primary transition-colors">FAQ Help</Link>
            <Link to="/support" className="text-on-surface-variant hover:text-primary transition-colors">Concierge Desk</Link>
            <Link to="/contact" className="text-on-surface-variant hover:text-primary transition-colors">Contact Us</Link>
          </nav>
        </div>

        {/* Company Links */}
        <div className="space-y-4 col-span-1">
          <h4 className="font-display font-semibold text-sm uppercase tracking-widest text-on-surface">Company</h4>
          <nav className="flex flex-col gap-2.5 text-sm">
            <Link to="/about" className="text-on-surface-variant hover:text-primary transition-colors">About Us</Link>
            <Link to="/about" className="text-on-surface-variant hover:text-primary transition-colors">Global Showrooms</Link>
            <Link to="/privacy" className="text-on-surface-variant hover:text-primary transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-on-surface-variant hover:text-primary transition-colors">Terms of Service</Link>
          </nav>
        </div>

        {/* Newsletter Column */}
        <div className="col-span-1 sm:col-span-2 lg:col-span-2 space-y-4">
          <h4 className="font-display font-semibold text-sm uppercase tracking-widest text-on-surface">Newsletter</h4>
          <p className="text-sm text-on-surface-variant leading-relaxed">
            Subscribe to receive exclusive access to early drops, styling advice, and private events.
          </p>

          {!subscribed ? (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 w-full">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Email address"
                className="w-full sm:w-auto flex-grow bg-white/5 border border-white/10 rounded-full px-5 py-2.5 text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-transparent text-sm backdrop-blur-sm"
              />
              <button
                type="submit"
                className="w-full sm:w-auto bg-primary hover:bg-primary-container text-on-primary font-semibold py-2.5 px-6 rounded-full btn-primary-glow transition-all duration-300 text-sm flex items-center justify-center gap-1.5 shrink-0 cursor-pointer"
              >
                <Mail className="w-4 h-4" /> Subscribe
              </button>
            </form>
          ) : (
            <div className="flex items-center gap-2 text-primary font-semibold text-sm py-2">
              <Check className="w-5 h-5" />
              <span>You are subscribed to the Inner Circle</span>
            </div>
          )}
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-on-surface-variant">
        <span>© {new Date().getFullYear()} LUMINA LUXE. ALL RIGHTS RESERVED.</span>
        <div className="flex gap-6 font-display font-medium uppercase tracking-widest text-[10px]">
          <span>Visa</span>
          <span>Amex</span>
          <span>Mastercard</span>
          <span>Apple Pay</span>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
