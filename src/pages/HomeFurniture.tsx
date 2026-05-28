import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Eye, Star, Info, ArrowRight, Heart } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';
import { SEO } from '../components/SEO';

export const HomeFurniture: React.FC = () => {
  const { products, openQuickView, wishlist, toggleWishlist } = useApp();
  const navigate = useNavigate();

  // Filter decor/furniture products
  const decorProducts = products.filter((p) => p.category === 'decor');

  // Hotspot details
  const hotspots = [
    {
      id: 'nordic-pendant-light',
      x: '48%',
      y: '22%',
      name: 'Nordic Pendant Light',
      price: 180.00,
      productId: 'nordic-pendant-light'
    },
    {
      id: 'scandi-lounge-chair',
      x: '32%',
      y: '58%',
      name: 'Scandi Lounge Chair',
      price: 520.00,
      productId: 'scandi-lounge-chair'
    },
    {
      id: 'terrazzo-side-table',
      x: '64%',
      y: '72%',
      name: 'Terrazzo Side Table',
      price: 290.00,
      productId: 'terrazzo-side-table'
    }
  ];

  const [activeHotspotId, setActiveHotspotId] = useState<string | null>(null);

  const handleHotspotClick = (productId: string) => {
    const prod = products.find(p => p.id === productId);
    if (prod) openQuickView(prod);
  };

  return (
    <div className="flex-grow bg-[#FAF8F5] text-[#2D2A26] dark:bg-[#141210] dark:text-[#E6E1DC] transition-colors duration-300">
      <SEO
        title="Scandinavian Minimalist Home"
        description="Shop clean, functional Scandinavian design. Solid European oak wood furniture, natural texturized bouclé, and lighting."
      />

      {/* Hero Banner */}
      <header className="relative w-full pt-24 pb-16 md:pt-36 md:pb-28 max-w-7xl mx-auto px-4 md:px-6 flex flex-col lg:flex-row items-center justify-between gap-12 min-h-[85vh]">
        <div className="space-y-6 max-w-xl lg:w-1/2 text-center lg:text-left">
          <span className="text-[#8C7A6B] text-xs font-bold uppercase tracking-[0.25em] block">
            Natural Organic Craftsmanship
          </span>
          <h1 className="text-4xl sm:text-6xl font-display font-light leading-tight tracking-tight uppercase">
            Sculpted <br className="hidden sm:inline" />
            <span className="font-serif italic text-[#8C7A6B]">Living Spaces</span>
          </h1>
          <p className="text-[#6E645A] dark:text-[#BCAEA2] max-w-lg mx-auto lg:mx-0 text-sm sm:text-base leading-relaxed font-light">
            Embrace Scandi-minimalism. Solid European white-oiled oak wood frames upholstered in textured premium wool bouclé to bring organic warmth to your digital home.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
            <button
              onClick={() => navigate('/collection?category=decor')}
              className="bg-[#8C7A6B] hover:bg-[#726255] text-white font-display font-bold text-xs uppercase tracking-widest py-4 px-10 rounded-full transition-all duration-300 shadow-xl cursor-pointer"
            >
              Shop Furniture
            </button>
            <button
              onClick={() => {
                const hotspotsSection = document.getElementById('hotspots');
                if (hotspotsSection) hotspotsSection.scrollIntoView({ behavior: 'smooth' });
              }}
              className="border border-[#8C7A6B]/30 hover:border-[#8C7A6B] bg-transparent text-[#2D2A26] dark:text-[#E6E1DC] font-display font-bold text-xs uppercase tracking-widest py-4 px-10 rounded-full transition-all cursor-pointer"
            >
              Shop The Room
            </button>
          </div>
        </div>

        {/* Hero image showcase */}
        <div className="w-full sm:w-2/3 lg:w-1/2 max-w-md aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl bg-surface-container relative group">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAIKPiC59wj4tkQHNKxwKcka_A3IlKDHSBr_Ui75LJjfr6rE0d_rFL96od3sFuwbb2BVoKs8oj6S6vKKXo5MUhw3x_CwpqLPBYXWhAO-Pxm8JXmtF4WFoiBz8_nzaJfU_mAywSgWJCo_5T21SC-Q1hFHioQNaXGQ4z32lUxkqqMR6PPl9P5FDSlW-ERBO_VfKeJ0b9ijmwsusYo-XB2UDxt6bWb4FaA1RQ3HhT0uWID53xEOZ26KOZ1gsQueE0kUKw78sNG7opujPo"
            alt="Minimal Living Room"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2000ms]"
          />
        </div>
      </header>

      {/* Interactive Room Hotspots Section */}
      <section id="hotspots" className="py-20 md:py-32 bg-[#FAF8F5] dark:bg-[#110f0e] border-y border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-6 space-y-16">
          <div className="text-center max-w-xl mx-auto space-y-4">
            <span className="text-[#8C7A6B] text-[10px] tracking-[0.25em] font-bold uppercase block">
              Curate The Look
            </span>
            <h2 className="text-3xl font-display font-light uppercase tracking-wide">
              Shop The Showcase Room
            </h2>
            <p className="text-[#6E645A] dark:text-[#BCAEA2] text-xs sm:text-sm font-light">
              Hover over or click the pulsing dots to view product summaries, and click to inspect details immediately.
            </p>
          </div>

          {/* Interactive room image map */}
          <div className="relative max-w-4xl mx-auto aspect-[16/10] rounded-3xl overflow-hidden shadow-2xl border border-border">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBNs8x75EYALHnv1U3hRE36ksR3Cxer862Uhys_vuxozoV8JGB7qoXKs99M8IbfSmtR7dDG2zUKWsraiTHGPMBUECM-YAHXNehT_z10GCX-5RFwPml22Z0lpU8dY8CzckHpzuSGplP4keJzaj8IVw1d7jpPaAWsWEz8B0JiUiARw7vCqMLepATHHBFgF9VbtM4QNVs8AWMj0vbmgwr8ILAZfBMroGygBitOHSEg2xpU9oudhu6gfNGfuK_O5bmbgyFwajkRsTXLSeA"
              alt="Scandinavian Styled Loft Showcase Room"
              className="w-full h-full object-cover"
            />
            
            {/* Dark tint overlay */}
            <div className="absolute inset-0 bg-black/10 z-0 pointer-events-none" />

            {/* Render Hotspots */}
            {hotspots.map((hs) => {
              const isActive = activeHotspotId === hs.id;
              return (
                <div
                  key={hs.id}
                  className="absolute z-20"
                  style={{ left: hs.x, top: hs.y }}
                  onMouseEnter={() => setActiveHotspotId(hs.id)}
                  onMouseLeave={() => setActiveHotspotId(null)}
                >
                  {/* Pulsing Dot */}
                  <button
                    onClick={() => handleHotspotClick(hs.productId)}
                    className="relative w-8 h-8 rounded-full bg-white/70 border border-white flex items-center justify-center cursor-pointer shadow-lg hover:scale-110 active:scale-95 transition-all"
                    aria-label={`View details for ${hs.name}`}
                  >
                    <span className="absolute inset-0.5 rounded-full bg-[#8C7A6B]/80 animate-ping pointer-events-none scale-105" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#8C7A6B] relative z-10" />
                  </button>

                  {/* Tooltip Card */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 10 }}
                        transition={{ duration: 0.15 }}
                        className="absolute bottom-10 left-1/2 -translate-x-1/2 w-48 p-4 bg-white/95 dark:bg-[#161513]/95 backdrop-blur-md rounded-2xl border border-border shadow-2xl space-y-2 z-30"
                      >
                        <h4 className="font-display font-bold text-[10px] uppercase tracking-wider text-on-surface truncate">
                          {hs.name}
                        </h4>
                        <div className="flex justify-between items-center">
                          <span className="font-display font-extrabold text-xs text-primary">
                            ${hs.price.toLocaleString()}
                          </span>
                          <button
                            onClick={() => handleHotspotClick(hs.productId)}
                            className="text-[9px] font-display font-bold uppercase tracking-widest text-[#8C7A6B] hover:underline flex items-center gap-0.5"
                          >
                            View <ArrowRight className="w-2.5 h-2.5" />
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Catalog Grid */}
      <section className="py-20 md:py-32 max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex justify-between items-end mb-16">
          <div className="space-y-2">
            <span className="text-[#8C7A6B] text-[10px] tracking-[0.25em] font-bold uppercase block">
              Curated Accessories
            </span>
            <h2 className="text-3xl font-display font-light uppercase tracking-wider">
              Shop The Collection
            </h2>
          </div>
          <button
            onClick={() => navigate('/collection?category=decor')}
            className="text-[#8C7A6B] hover:text-[#726255] font-bold text-xs font-display flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            Browse All <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {decorProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Cozy Testimonials */}
      <section className="py-20 bg-[#F4F1EA] dark:bg-[#0f0e0d] text-center max-w-4xl mx-auto px-6 space-y-6 rounded-3xl my-12">
        <span className="text-[10px] tracking-[0.3em] font-bold text-[#8C7A6B] uppercase block">
          Client Comfort
        </span>
        <blockquote className="text-2xl sm:text-3xl font-display font-light text-on-surface leading-normal">
          "The Scandi Lounge Chair is simply beautiful. The oatmeal wool fabric feels incredibly texture-rich, and the white-oiled oak frames add such a cozy, premium character."
        </blockquote>
        <cite className="block text-xs font-display font-bold uppercase tracking-widest text-[#8C7A6B]">
          — Alexander Mercer, Lead Aetheria Designer
        </cite>
      </section>

      {/* Furniture Newsletter */}
      <section className="py-20 max-w-2xl mx-auto px-6 text-center space-y-6">
        <h3 className="text-xl font-display font-light uppercase tracking-wider">
          Receive Design Journals
        </h3>
        <p className="text-[#6E645A] dark:text-[#BCAEA2] text-xs sm:text-sm font-light leading-relaxed max-w-md mx-auto">
          Subscribe below to join our styling register and receive interior layouts guides and pre-release access alerts.
        </p>
        <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
          <input
            type="email"
            required
            placeholder="EMAIL ADDRESS"
            className="bg-white dark:bg-slate-900 border border-border rounded-full px-5 py-3 text-xs focus:outline-none focus:border-[#8C7A6B] text-on-surface placeholder:text-slate-400 flex-grow"
          />
          <button
            type="submit"
            className="bg-[#8C7A6B] text-white font-display font-bold text-[10px] uppercase tracking-widest py-3.5 px-8 rounded-full hover:bg-[#726255] transition-all cursor-pointer shadow-lg"
          >
            Subscribe
          </button>
        </form>
      </section>
    </div>
  );
};
export default HomeFurniture;
