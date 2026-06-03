import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';
import { SEO } from '../components/SEO';

export const HomeWatches: React.FC = () => {
  const { products } = useApp();
  const navigate = useNavigate();

  // Filter watches
  const watchProducts = products.filter((p) => p.category === 'watches');

  const timelineSteps = [
    { year: '1894', title: 'The Genesis', desc: 'Handcrafted precision timekeeping begins in small workshops in Geneva.' },
    { year: '1952', title: 'Deep Sea Rating', desc: 'Engineered waterproof casing sealed up to 100 meters for naval navigation.' },
    { year: '1988', title: 'Chronograph Caliber', desc: 'Introduced complex mechanical calibers with automated self-winding rotors.' },
    { year: '2026', title: 'Obsidian Synthesis', desc: 'Integrated state-of-the-art carbon composites with luxury smart display screens.' }
  ];

  return (
    <div className="flex-grow bg-[#FAF9F5] text-[#1e1e1c] dark:bg-[#0f0e0c] dark:text-[#f7f5f0] transition-colors duration-300">
      <SEO
        title="Bespoke Luxury Timepieces"
        description="Experience Swiss mechanical calibers and stealth carbon casing. Indulge in classic watchmaking heritage."
      />

      {/* Watches Hero Banner */}
      <header className="relative w-full min-h-[90vh] md:h-screen flex items-center justify-center overflow-hidden py-16 md:pt-24 md:pb-16">
        {/* Soft atmospheric amber light overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(218,165,32,0.04),transparent_60%)] dark:bg-[radial-gradient(circle_at_center,rgba(218,165,32,0.06),transparent_60%)] z-0" />
        <div className="absolute inset-0 bg-slate-200/20 dark:bg-black/40 z-10" />

        <div className="relative z-20 max-w-7xl mx-auto px-4 md:px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="lg:col-span-6 space-y-6 text-center lg:text-left"
          >
            <span className="text-[#b0936b] dark:text-[#c5a880] text-xs font-bold tracking-[0.3em] block">
              Swiss Caliber Assembly
            </span>
            <h1 className="text-4xl sm:text-6xl font-display font-light tracking-tight text-slate-800 dark:text-white leading-tight">
              Bespoke <br />
              <span className="font-serif italic text-[#b0936b] dark:text-[#c5a880]">Precision</span>
            </h1>
            <p className="text-slate-650 dark:text-[#99958f] max-w-xl mx-auto lg:mx-0 text-sm sm:text-base leading-relaxed font-light">
              Crafted in Swiss ateliers to achieve lifetime mechanical resilience. Housed in stealth grade-5 DLC carbon casing and protected by sapphire glass shields.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <button
                onClick={() => navigate('/collection?category=watches')}
                className="bg-[#c5a880] hover:bg-[#b0936b] text-[#0f0e0c] font-display font-extrabold text-xs tracking-widest py-4 px-10 rounded-full transition-all duration-300 shadow-2xl cursor-pointer"
              >
                Acquire Timepiece
              </button>
              <button
                onClick={() => {
                  const timelineSection = document.getElementById('timeline');
                  if (timelineSection) timelineSection.scrollIntoView({ behavior: 'smooth' });
                }}
                className="border border-[#c5a880]/30 hover:border-[#c5a880] bg-transparent text-slate-800 dark:text-white font-display font-extrabold text-xs tracking-widest py-4 px-10 rounded-full transition-all cursor-pointer"
              >
                Our Heritage
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="lg:col-span-6 flex justify-center relative"
          >
            <div className="relative w-full max-w-sm aspect-square bg-[#f5f2eb] dark:bg-[#161513] rounded-full border border-slate-200 dark:border-[#c5a880]/10 flex items-center justify-center shadow-[0_0_50px_rgba(197,168,128,0.03)] dark:shadow-[0_0_50px_rgba(197,168,128,0.05)] group">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBno99WOBueYImcyeAmMN08wvq37AS2WBU0zsUftVC-qKNVS5bcD8gM2eGpJFKBEPJoO6iQGPg7kGbDPUaAfDz1LHSWhVSKVrUnswu3FFVRfurU-tDjMXbaG6RBsgPzldeFcGX7jqtaDWcGWodg7TyHju6kgHJ0XiOLpAcwNLRsVWuLSvPovkw2GXg83eXBmS5_KjaC7gpJvCnX218Io_SkngtNBeGsMxMW0PPni0r_xghP9LNU8_Kd77YWdAUqg3HOMsv1p9eaSuE"
                alt="Shadow Chronograph"
                className="w-full h-full object-contain scale-95 group-hover:scale-100 transition-transform duration-700 rounded-full"
              />
            </div>
          </motion.div>
        </div>
      </header>

      {/* Storytelling Timeline */}
      <section id="timeline" className="py-20 md:py-32 bg-[#f6f4ee] dark:bg-[#0c0b0a] border-y border-slate-200 dark:border-[#c5a880]/15">
        <div className="max-w-7xl mx-auto px-4 md:px-6 space-y-16">
          <div className="text-center max-w-xl mx-auto space-y-4">
            <span className="text-[#b0936b] dark:text-[#c5a880] text-[10px] tracking-[0.25em] font-bold block">
              Evolution of Precision
            </span>
            <h2 className="text-3xl font-display font-light tracking-wide text-slate-800 dark:text-white">
              Watchmaking Timeline
            </h2>
            <p className="text-slate-600 dark:text-[#99958f] text-xs sm:text-sm font-light">
              Over a century of building uncompromising chronographs for deep-sea exploration and aerospace tracking.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {timelineSteps.map((step) => (
              <div key={step.year} className="bg-white dark:bg-[#141311] border border-slate-200 dark:border-[#c5a880]/10 p-8 rounded-3xl relative overflow-hidden group hover:border-[#b0936b]/40 dark:hover:border-[#c5a880]/30 transition-all duration-300">
                <span className="text-4xl font-serif italic text-[#b0936b]/20 dark:text-[#c5a880]/20 group-hover:text-[#b0936b]/40 dark:group-hover:text-[#c5a880]/40 transition-colors font-semibold block mb-4">
                  {step.year}
                </span>
                <h4 className="font-display font-bold text-xs tracking-widest text-slate-800 dark:text-white mb-2">
                  {step.title}
                </h4>
                <p className="text-slate-600 dark:text-[#99958f] text-xs font-light leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Catalog Showcase */}
      <section className="py-20 md:py-32 max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center gap-4 mb-10 md:mb-16">
          <div className="space-y-1">
            <span className="text-[#b0936b] dark:text-[#c5a880] text-[10px] tracking-[0.25em] font-bold block">
              Curated Timepieces
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-light tracking-wider text-slate-800 dark:text-white">
              The Watch Registry
            </h2>
          </div>
          <button
            onClick={() => navigate('/collection?category=watches')}
            className="text-[#b0936b] dark:text-[#c5a880] hover:text-[#c5a880] dark:hover:text-white font-semibold text-xs font-display flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
          >
            All Watches <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {watchProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Elegance Testimonials */}
      <section className="py-20 bg-transparent border-t border-slate-200 dark:border-[#c5a880]/15 text-center max-w-4xl mx-auto px-6 space-y-6">
        <span className="text-[10px] tracking-[0.3em] font-bold text-[#b0936b] dark:text-[#c5a880] block">
          Client Endorsements
        </span>
        <blockquote className="text-2xl sm:text-3xl font-serif italic font-light text-slate-800 dark:text-white leading-normal">
          "The Shadow Chronograph is a masterpiece of stealth design. The mechanical weight and silent tick feel completely alive on the wrist. A lifetime purchase."
        </blockquote>
        <cite className="block text-xs font-display font-bold tracking-widest text-[#b0936b] dark:text-[#c5a880]">
          — Alexander Mercer, Lead Aetheria Designer
        </cite>
      </section>

      {/* Watch Newsletter */}
      <section className="py-20 bg-[#faf8f4] dark:bg-[#0f0e0c] border-t border-slate-200 dark:border-[#c5a880]/15">
        <div className="max-w-2xl mx-auto px-6 text-center space-y-6">
          <h3 className="text-xl font-display font-light tracking-wider text-slate-800 dark:text-white">
            Register for Releases
          </h3>
          <p className="text-slate-600 dark:text-[#99958f] text-xs sm:text-sm font-light leading-relaxed max-w-md mx-auto">
            Subscribe below to receive notification letters for limited chronograph batches and private viewing sessions.
          </p>
          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
            <input
              type="email"
              required
              placeholder="Email address"
              className="bg-white dark:bg-[#141311] border border-slate-350 dark:border-[#c5a880]/20 rounded-full px-5 py-3 text-xs focus:outline-none focus:border-[#c5a880] text-slate-800 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-650 flex-grow"
            />
            <button
              type="submit"
              className="bg-[#c5a880] hover:bg-[#b0936b] dark:hover:bg-white text-[#0f0e0c] font-display font-extrabold text-[10px] tracking-widest py-3.5 px-8 rounded-full transition-all cursor-pointer shadow-lg"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};
export default HomeWatches;
