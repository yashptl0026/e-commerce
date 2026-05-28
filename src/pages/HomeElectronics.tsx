import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Zap, Radio, Volume2, Bluetooth, Battery, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';
import { SEO } from '../components/SEO';

export const HomeElectronics: React.FC = () => {
  const { products } = useApp();
  const navigate = useNavigate();

  // Filter electronics & watches for the tech layout
  const techProducts = products.filter(
    (p) => p.category === 'electronics' || p.category === 'watches'
  );

  const [activeSpecTab, setActiveSpecTab] = useState<'audio' | 'watch'>('audio');
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 12, seconds: 59 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 8, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex-grow bg-[#090b0e] text-[#f1f5f9] select-none">
      <SEO
        title="Cybertech Electronics Store"
        description="Experience high-fidelity audio engineering and advanced smart wearables. Futuristic dark-themed luxury e-commerce theme."
      />

      {/* Cybertech Hero Banner */}
      <header className="relative pt-24 pb-16 md:pt-32 md:pb-28 px-4 md:px-6 max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 min-h-[85vh] overflow-hidden">
        {/* Glow Spheres */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6 max-w-2xl lg:w-1/2">
          <span className="text-cyan-400 text-xs font-bold uppercase tracking-[0.3em] flex items-center gap-1.5 justify-center lg:justify-start">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" /> High-Fidelity Engineering
          </span>
          <h1 className="text-4xl sm:text-6xl font-display font-extrabold uppercase leading-[1.05] tracking-tight text-center lg:text-left">
            Precision <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-indigo-400">Cyberwear</span>
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto lg:mx-0 text-sm sm:text-base leading-relaxed font-light text-center lg:text-left">
            Where military-grade carbon composite casings coordinate with state-of-the-art acoustic drivers and smart biometric tracking grids.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
            <button
              onClick={() => navigate('/collection?category=electronics')}
              className="bg-cyan-500 hover:bg-cyan-400 text-[#090b0e] font-display font-extrabold text-xs uppercase tracking-widest py-4 px-8 rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all duration-300 hover:scale-[1.02] active:scale-95 cursor-pointer"
            >
              Explore Audio Gear
            </button>
            <button
              onClick={() => navigate('/collection?category=watches')}
              className="border border-slate-700 bg-slate-900/50 text-white font-display font-extrabold text-xs uppercase tracking-widest py-4 px-8 rounded-xl hover:bg-slate-800/80 transition-all backdrop-blur-md cursor-pointer"
            >
              Smart Watch Specs
            </button>
          </div>
        </div>

        {/* Eagerly Loaded Glow Showcase */}
        <div className="relative z-10 w-full sm:w-2/3 lg:w-1/2 max-w-md aspect-square rounded-3xl bg-slate-950/40 p-4 border border-slate-800 shadow-[0_0_40px_rgba(6,182,212,0.1)] flex items-center justify-center group overflow-hidden">
          {/* Animated pulsing neon frame border */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-cyan-500/20 animate-[spin_8s_linear_infinite] opacity-50 z-0 pointer-events-none" />
          <div className="absolute inset-[1px] bg-slate-950/95 rounded-[23px] z-0" />
          
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDqrRl-nIXIzG4Og1QTUVjntU2zQWVcZxppUl53LDepHawBM_dY97fVJTbjcMbOrPsXIAElPgKT433tC68rbyoi_BD0jCNXOGovnUZCja_FHviGxgd3wfKEYd5h5y2wQKAZwPHEamTsWkOh_g6R5GHZdJWqvwnW69k6HDgefejh2Rh0OHBiQ_ZilIUnHGE2FRaBWxaSoYPqQmfTeEXDKSF2HxTxMKAyP1dAG-Zmq4nG32oPfikcuIrbTonuTgdlxBbvSYuwBvXXyMw"
            alt="Aura Pro Headphones"
            className="w-[90%] h-[90%] object-contain rounded-2xl relative z-10 group-hover:scale-105 transition-transform duration-700"
          />
        </div>
      </header>

      {/* Interactive Specs tabs */}
      <section className="bg-[#0c0e12] border-y border-slate-800/80 py-20 max-w-7xl mx-auto px-4 md:px-6 rounded-3xl my-12">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-display font-extrabold uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
              Interactive Specifications
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm font-light">
              Toggle between device architectures to review dynamic structural details.
            </p>
            
            {/* Tab Swappers */}
            <div className="inline-flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 gap-2 mt-4">
              <button
                onClick={() => setActiveSpecTab('audio')}
                className={`py-2.5 px-6 rounded-lg font-display text-[10px] font-bold uppercase tracking-widest transition-all cursor-pointer ${
                  activeSpecTab === 'audio' ? 'bg-cyan-500 text-black shadow-md' : 'text-slate-400 hover:text-white'
                }`}
              >
                Aura Pro Audio
              </button>
              <button
                onClick={() => setActiveSpecTab('watch')}
                className={`py-2.5 px-6 rounded-lg font-display text-[10px] font-bold uppercase tracking-widest transition-all cursor-pointer ${
                  activeSpecTab === 'watch' ? 'bg-cyan-500 text-black shadow-md' : 'text-slate-400 hover:text-white'
                }`}
              >
                Obsidian Smart Watch
              </button>
            </div>
          </div>

          {/* Tab Content Display */}
          <AnimatePresence mode="wait">
            {activeSpecTab === 'audio' ? (
              <motion.div
                key="audio-specs"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4"
              >
                <div className="bg-slate-950/40 p-6 rounded-2xl border border-slate-800 flex flex-col gap-3">
                  <Volume2 className="w-8 h-8 text-cyan-400" />
                  <h4 className="font-display font-extrabold text-xs uppercase tracking-wider">Acoustic Driver</h4>
                  <p className="text-xs text-slate-400 leading-relaxed font-light">
                    40mm custom Beryllium-coated diaphragm drivers delivering deep bass response down to 4Hz with low total harmonic distortion.
                  </p>
                </div>
                <div className="bg-slate-950/40 p-6 rounded-2xl border border-slate-800 flex flex-col gap-3">
                  <Bluetooth className="w-8 h-8 text-cyan-400" />
                  <h4 className="font-display font-extrabold text-xs uppercase tracking-wider">Hi-Res Transmission</h4>
                  <p className="text-xs text-slate-400 leading-relaxed font-light">
                    Qualcomm aptX Adaptive, LDAC, and AAC support over low-latency Bluetooth 5.3 with dual multipoint connectivity.
                  </p>
                </div>
                <div className="bg-slate-950/40 p-6 rounded-2xl border border-slate-800 flex flex-col gap-3">
                  <Battery className="w-8 h-8 text-cyan-400" />
                  <h4 className="font-display font-extrabold text-xs uppercase tracking-wider">Battery Cell</h4>
                  <p className="text-xs text-slate-400 leading-relaxed font-light">
                    Up to 30 hours of continuous active noise cancellation playback. Quick charge provides 5 hours in just 10 minutes.
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="watch-specs"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4"
              >
                <div className="bg-slate-950/40 p-6 rounded-2xl border border-slate-800 flex flex-col gap-3">
                  <Cpu className="w-8 h-8 text-purple-400" />
                  <h4 className="font-display font-extrabold text-xs uppercase tracking-wider">Holographic Processor</h4>
                  <p className="text-xs text-slate-400 leading-relaxed font-light">
                    Low-energy ARM dual-core chip with floating display engine delivering 60Hz mechanical animations under solid sapphire cover.
                  </p>
                </div>
                <div className="bg-slate-950/40 p-6 rounded-2xl border border-slate-800 flex flex-col gap-3">
                  <Zap className="w-8 h-8 text-purple-400" />
                  <h4 className="font-display font-extrabold text-xs uppercase tracking-wider">Power Cell</h4>
                  <p className="text-xs text-slate-400 leading-relaxed font-light">
                    Dual solar-assisted smart cell layout. Extends battery life to 7 days of normal active use with quick magnetic charging support.
                  </p>
                </div>
                <div className="bg-slate-950/40 p-6 rounded-2xl border border-slate-800 flex flex-col gap-3">
                  <Radio className="w-8 h-8 text-purple-400" />
                  <h4 className="font-display font-extrabold text-xs uppercase tracking-wider">Biometrics Antenna</h4>
                  <p className="text-xs text-slate-400 leading-relaxed font-light">
                    Continuous photoplethysmography sensor tracking heart variability, stress indices, oxygen saturation, and sleep cycles.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Cyber Catalog Grid */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex justify-between items-end mb-12">
          <div className="space-y-2">
            <span className="text-cyan-400 text-[10px] tracking-[0.25em] font-bold uppercase block">
              Curated Wearables
            </span>
            <h2 className="text-3xl font-display font-extrabold uppercase tracking-wide">
              Product Listing
            </h2>
          </div>
          <button
            onClick={() => navigate('/collection?category=electronics')}
            className="text-cyan-400 hover:text-cyan-300 font-semibold text-xs font-display flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            All Products <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {techProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Flash Sale Countdown Segment */}
      <section className="py-20 bg-gradient-to-r from-slate-950 via-[#0a0d16] to-slate-950 border-y border-slate-800 flex items-center">
        <div className="max-w-7xl mx-auto px-6 w-full flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="space-y-4 text-center lg:text-left">
            <span className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 px-3.5 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase shadow-[0_0_15px_rgba(6,182,212,0.15)]">
              Drop Alert
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
              Midnight Releases
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm font-light max-w-xl">
              Claim access to obsidian cyberwear batches. Enjoy 30% off original launch pricing on pre-allocated models before depletion.
            </p>
          </div>

          <div className="flex flex-col items-center lg:items-end gap-6 w-full lg:w-auto shrink-0">
            {/* Digital Clock */}
            <div className="flex gap-3 justify-center w-full">
              {[
                { val: timeLeft.hours, tag: 'Hours' },
                { val: timeLeft.minutes, tag: 'Minutes' },
                { val: timeLeft.seconds, tag: 'Seconds' }
              ].map((time) => (
                <div key={time.tag} className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-center min-w-[70px] sm:min-w-[85px] shadow-lg">
                  <span className="block text-xl sm:text-2xl font-display font-extrabold text-cyan-400 tracking-wider">
                    {time.val.toString().padStart(2, '0')}
                  </span>
                  <span className="text-[8px] text-slate-500 tracking-wider uppercase font-semibold">{time.tag}</span>
                </div>
              ))}
            </div>
            
            <button
              onClick={() => navigate('/collection?category=electronics')}
              className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-display font-extrabold text-xs uppercase tracking-widest py-3.5 px-8 rounded-lg shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all w-full lg:w-auto hover:scale-[1.02] active:scale-95 cursor-pointer"
            >
              Pre-Order Now
            </button>
          </div>
        </div>
      </section>

      {/* Cyber Newsletter */}
      <section className="py-20 max-w-3xl mx-auto px-6 text-center space-y-6">
        <h3 className="text-2xl font-display font-extrabold uppercase tracking-wide">
          Cyber Transmission Feed
        </h3>
        <p className="text-slate-400 text-xs sm:text-sm font-light max-w-md mx-auto leading-relaxed">
          Submit your coordinates below to join the pre-allocation reserve and receive technical firmware updates.
        </p>
        <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            required
            placeholder="COORDINATE EMAIL"
            className="flex-grow bg-slate-900 border border-slate-800 rounded-lg px-4 py-3 text-xs focus:outline-none focus:border-cyan-500 text-white placeholder:text-slate-600"
          />
          <button
            type="submit"
            className="bg-cyan-500 text-slate-950 font-display font-extrabold text-[10px] uppercase tracking-widest py-3.5 px-6 rounded-lg hover:bg-cyan-400 transition-all cursor-pointer shadow-[0_0_10px_rgba(6,182,212,0.25)]"
          >
            Connect
          </button>
        </form>
      </section>
    </div>
  );
};
export default HomeElectronics;
