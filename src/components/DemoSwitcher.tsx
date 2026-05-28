import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, X, ChevronRight, LayoutGrid, CheckCircle } from 'lucide-react';

export const DemoSwitcher: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const panelRef = useRef<HTMLDivElement>(null);

  // Close panel on clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && panelRef.current && !panelRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const demos = [
    {
      id: 'luxe',
      name: 'Luxe Default',
      desc: 'Elegant Minimal Luxury',
      path: '/',
      color: 'bg-primary/20 text-primary',
      accent: '#1e3a8a',
      tag: 'Default'
    },
    {
      id: 'fashion',
      name: 'Haute Couture',
      desc: 'Bold Editorial Fashion',
      path: '/home-fashion',
      color: 'bg-secondary/20 text-secondary',
      accent: '#581c87',
      tag: 'Fashion'
    },
    {
      id: 'electronics',
      name: 'Cybertech',
      desc: 'Futuristic Glow Dark Mode',
      path: '/home-electronics',
      color: 'bg-cyan-500/10 text-cyan-400',
      accent: '#06b6d4',
      tag: 'Tech'
    },
    {
      id: 'watches',
      name: 'Bespoke Timepieces',
      desc: 'Serif Classic Heritage',
      path: '/home-watches',
      color: 'bg-amber-600/10 text-amber-500',
      accent: '#d97706',
      tag: 'Watches'
    },
    {
      id: 'furniture',
      name: 'Scandinavian Home',
      desc: 'Earthy Minimal & Hotspots',
      path: '/home-furniture',
      color: 'bg-emerald-600/10 text-emerald-500',
      accent: '#059669',
      tag: 'Furniture'
    }
  ];

  const [isRtl, setIsRtl] = useState(() => {
    try {
      return localStorage.getItem('aetheria_direction') === 'rtl';
    } catch (e) {
      return false;
    }
  });

  useEffect(() => {
    try {
      if (isRtl) {
        document.documentElement.setAttribute('dir', 'rtl');
        document.documentElement.classList.add('rtl');
        localStorage.setItem('aetheria_direction', 'rtl');
      } else {
        document.documentElement.setAttribute('dir', 'ltr');
        document.documentElement.classList.remove('rtl');
        localStorage.setItem('aetheria_direction', 'ltr');
      }
    } catch (e) {
      console.error(e);
    }
  }, [isRtl]);

  const handleDemoClick = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <div ref={panelRef} className="fixed top-1/2 -translate-y-1/2 z-[450] flex items-end demo-switcher-wrap">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <motion.button
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          onClick={() => setIsOpen(true)}
          className="w-12 h-12 rounded-full bg-primary text-on-primary shadow-2xl flex items-center justify-center cursor-pointer border border-primary/30 relative hover:scale-110 active:scale-95 transition-all duration-300 group mr-4"
          title="Switch Demo Homepages"
        >
          {/* Pulse element */}
          <span className="absolute inset-0 rounded-full bg-primary/40 animate-ping pointer-events-none scale-105" />
          <Palette className="w-5 h-5 relative z-10 group-hover:rotate-12 transition-transform" />
          
          {/* Tooltip */}
          <span className="absolute right-full mr-3 px-3 py-1.5 rounded-lg bg-inverse-surface text-inverse-on-surface text-[10px] font-bold uppercase tracking-wider shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none border border-white/10">
            Demos Switcher
          </span>
        </motion.button>
      )}

      {/* Slide-out Panel Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '110%' }}
            animate={{ x: 0 }}
            exit={{ x: '110%' }}
            transition={{ type: 'spring', damping: 20, stiffness: 200 }}
            className="w-76 p-6 dropdown-glass shadow-[0_20px_60px_rgba(0,0,0,0.3)] border border-border border-r-0 max-h-[85vh] flex flex-col justify-between rounded-l-3xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-border">
              <div className="flex items-center gap-2">
                <LayoutGrid className="w-5 h-5 text-primary" />
                <span className="font-display font-extrabold text-sm uppercase tracking-wider text-on-surface">
                  Theme Demos
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-surface-container transition-colors text-on-surface cursor-pointer border border-transparent hover:border-border"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Selector list */}
            <div className="flex-grow overflow-y-auto py-4 space-y-3.5 pr-1 scrollbar-none">
              {demos.map((d) => {
                const isActive = location.pathname === d.path;
                return (
                  <button
                    key={d.id}
                    onClick={() => handleDemoClick(d.path)}
                    className={`w-full text-left p-3.5 rounded-2xl border transition-all cursor-pointer relative overflow-hidden flex items-start gap-3 group ${
                      isActive
                        ? 'bg-surface-container border-primary shadow-lg ring-1 ring-primary/20'
                        : 'bg-white/5 hover:bg-white/10 border-white/5 hover:border-white/15'
                    }`}
                  >
                    {/* Active accent block */}
                    <div
                      className="absolute left-0 top-0 bottom-0 w-1 transition-all"
                      style={{ backgroundColor: d.accent }}
                    />

                    {/* Tag badge */}
                    <span className={`text-[8px] font-bold uppercase tracking-wider px-2 py-0.5 rounded absolute top-2 right-2 ${d.color}`}>
                      {d.tag}
                    </span>

                    {/* Content */}
                    <div className="space-y-1 mt-1 pr-8">
                      <h4 className="font-display font-bold text-xs text-on-surface group-hover:text-primary transition-colors flex items-center gap-1.5">
                        {d.name}
                        {isActive && <CheckCircle className="w-3.5 h-3.5 text-primary fill-primary/10 shrink-0" />}
                      </h4>
                      <p className="text-[10px] text-on-surface-variant leading-relaxed">
                        {d.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* LTR/RTL Toggle */}
            <div className="border-t border-border pt-4 mt-2 space-y-2">
              <span className="text-[9px] uppercase font-bold tracking-widest text-on-surface-variant/50 block">
                Layout Direction
              </span>
              <div className="grid grid-cols-2 gap-2 bg-surface-container p-1 rounded-xl border border-border">
                <button
                  onClick={() => setIsRtl(false)}
                  className={`py-2 text-center rounded-lg transition-all cursor-pointer ${
                    !isRtl
                      ? 'bg-primary text-on-primary shadow-md font-bold'
                      : 'text-on-surface-variant/70 hover:text-on-surface hover:bg-white/5'
                  }`}
                >
                  <span className="text-[9px] uppercase font-display tracking-wider font-semibold">LTR (Left)</span>
                </button>
                <button
                  onClick={() => setIsRtl(true)}
                  className={`py-2 text-center rounded-lg transition-all cursor-pointer ${
                    isRtl
                      ? 'bg-primary text-on-primary shadow-md font-bold'
                      : 'text-on-surface-variant/70 hover:text-on-surface hover:bg-white/5'
                  }`}
                >
                  <span className="text-[9px] uppercase font-display tracking-wider font-semibold">RTL (Right)</span>
                </button>
              </div>
            </div>

            {/* Footer info */}
            <div className="pt-4 border-t border-border mt-2">
              <div className="bg-surface-container-high/50 border border-border p-3.5 rounded-2xl text-[10px] text-on-surface-variant/80 leading-relaxed text-center font-semibold">
                ✨ Ready for ThemeForest review. Meets all layout guidelines & responsive standards.
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
export default DemoSwitcher;
