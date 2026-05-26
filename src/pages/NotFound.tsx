import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ShoppingBag, HelpCircle, ArrowLeft } from 'lucide-react';

export const NotFound: React.FC = () => {
  return (
    <main className="flex-grow flex items-center justify-center min-h-[70vh] px-4 md:px-6 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-primary/5 via-secondary/10 to-transparent blur-3xl rounded-full opacity-40 w-3/4 h-3/4 mx-auto pointer-events-none"></div>

      <div className="relative z-10 max-w-xl w-full text-center space-y-8">
        
        {/* Animated 404 Illustration */}
        <div className="relative flex justify-center items-center h-48 select-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="absolute text-[120px] sm:text-[150px] font-display font-black tracking-tighter text-white/5"
          >
            404
          </motion.div>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-5 py-2.5 backdrop-blur-md shadow-lg shadow-primary/5 relative z-10"
          >
            <HelpCircle className="w-5 h-5 text-primary animate-pulse" />
            <span className="text-xs sm:text-sm font-display font-bold uppercase tracking-widest text-primary">
              Page Not Found
            </span>
          </motion.div>
        </div>

        {/* Text Copy */}
        <motion.div
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="space-y-4"
        >
          <h1 className="text-2xl sm:text-4xl font-display font-extrabold text-on-surface uppercase tracking-tight">
            Lost In The Lumina Universe
          </h1>
          <p className="text-sm sm:text-base text-on-surface-variant max-w-md mx-auto leading-relaxed font-body">
            The page you are looking for has either been moved, archived, or is temporarily unavailable. Let us guide you back to our curated collections.
          </p>
        </motion.div>

        {/* Action CTAs */}
        <motion.div
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto pt-4"
        >
          <Link
            to="/"
            className="flex items-center justify-center gap-2 bg-primary hover:bg-primary-container text-on-primary font-display font-bold text-xs uppercase tracking-wider py-4 px-6 rounded-2xl transition-all duration-300 btn-primary-glow shadow-lg shadow-primary/10 cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>Return to Home</span>
          </Link>
          
          <Link
            to="/collection"
            className="flex items-center justify-center gap-2 glass-level-1 border-white/5 text-on-surface hover:border-white/15 hover:text-primary font-display font-bold text-xs uppercase tracking-wider py-4 px-6 rounded-2xl transition-all duration-300 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Shop Collection</span>
          </Link>
        </motion.div>

        {/* Footer Support Quick Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="pt-6"
        >
          <Link
            to="/support"
            className="inline-flex items-center gap-1.5 text-xs text-on-surface-variant hover:text-primary transition-colors uppercase font-display font-semibold tracking-widest"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Need assistance? Contact Concierge</span>
          </Link>
        </motion.div>

      </div>
    </main>
  );
};

export default NotFound;
