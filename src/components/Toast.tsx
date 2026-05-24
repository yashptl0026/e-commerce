import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toast, hideToast } = useApp();

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, x: 100, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 50, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="fixed top-24 right-4 sm:right-8 z-[100] flex items-center gap-3 glass-level-2 glass-shadow px-6 py-4 rounded-xl max-w-sm border border-white/10"
        >
          {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-primary" />}
          {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-error" />}
          {toast.type === 'info' && <Info className="w-5 h-5 text-secondary" />}
          
          <span className="text-body-md font-medium text-on-surface text-[14px]">
            {toast.message}
          </span>

          <button
            onClick={hideToast}
            className="ml-auto text-on-surface-variant hover:text-on-surface transition-colors p-1 rounded-full hover:bg-white/5"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default Toast;
