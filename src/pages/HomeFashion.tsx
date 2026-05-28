import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Star, ShoppingBag, Eye, Heart } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';
import { SEO } from '../components/SEO';

export const HomeFashion: React.FC = () => {
  const { products, openQuickView, wishlist, toggleWishlist } = useApp();
  const navigate = useNavigate();
  const carouselRef = useRef<HTMLDivElement>(null);

  // Filter fashion products
  const fashionProducts = products.filter(
    (p) => p.category === 'fashion' || p.category === 'footwear' || p.category === 'accessories'
  );

  const featuredFashion = fashionProducts.slice(0, 4);
  const newArrivals = fashionProducts.slice(4, 9);

  return (
    <div className="flex-grow bg-[#faf9f5] text-[#121212] dark:bg-[#0d0d0d] dark:text-[#f3f3f3] transition-colors duration-300">
      <SEO
        title="Haute Couture Showcase"
        description="Explore our premium fashion lookbook. Experience high-end structural outerwear, Mongolian cashmere, and technical tailoring."
      />

      {/* Editorial Hero Slider */}
      <header className="relative w-full h-[95vh] md:h-screen overflow-hidden bg-black flex items-center justify-center pt-16">
        {/* Parallax Background Video/Image placeholder */}
        <div className="absolute inset-0 bg-[url('https://lh3.googleusercontent.com/aida-public/AB6AXuCakp8RuS6jMwiKf2OCX8GAuqFM-8_eDBB5whySz6s6Srh70DMBdjoUo3O_RJtLcIPbc3fnzn2c8UEhZsX2yJGiQV-Id31KBgPvsn_iwCxbpVH_GFcHUrR2gt4E01u1JSgfIQwzVcbpJSIFKoRhTJ8zhdttRzKFtzWc-YwJvLAEaeCl9KDtxUYG2UBHhFbfPBtKq6kv9O0s4M1mnyl_DrN2aM21IhQNcY12z1G-30Jlc7M6MM9EWeTAkGB0_v3eCZYTRxvWlplmZDg')] bg-cover bg-center opacity-65 scale-105 hover:scale-100 transition-transform duration-[4000ms] ease-out"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/40 z-10" />

        {/* Floating details overlay */}
        <div className="absolute top-24 left-6 md:left-12 z-20 hidden md:block text-white/50 text-[10px] uppercase font-bold tracking-[0.3em]">
          Volume I / Collection 2026
        </div>

        {/* Hero Title Container */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 md:px-6 w-full text-center space-y-8 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="space-y-4"
          >
            <span className="text-white text-[11px] tracking-[0.35em] font-extrabold uppercase bg-white/10 backdrop-blur-md py-1.5 px-5 rounded-full border border-white/10 shadow-lg">
              Aetheria Haute Couture
            </span>
            <h1 className="text-5xl sm:text-7xl lg:text-9xl font-display font-black text-white uppercase tracking-tighter leading-[0.9]">
              The Art of <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e5c07b] to-[#d09e5a]">Draping</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-white/70 max-w-xl text-sm md:text-base leading-relaxed tracking-wide font-light"
          >
            Architectural silhouettes resolved in technical liquid silks and GOTS certified organic materials. Crafted for the modern visual pioneer.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex gap-4 pt-4"
          >
            <button
              onClick={() => navigate('/collection?category=fashion')}
              className="bg-white text-black font-display font-extrabold text-xs uppercase tracking-widest py-4 px-10 rounded-full hover:scale-105 hover:bg-[#e5c07b] hover:text-white transition-all shadow-2xl cursor-pointer"
            >
              Shop Collection
            </button>
            <button
              onClick={() => navigate('/about')}
              className="border border-white/20 bg-transparent text-white font-display font-extrabold text-xs uppercase tracking-widest py-4 px-10 rounded-full hover:bg-white/10 transition-all backdrop-blur-md cursor-pointer"
            >
              Editorial Story
            </button>
          </motion.div>
        </div>
      </header>

      {/* Editorial Grid Section */}
      <section className="py-20 md:py-32 max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          <div className="lg:col-span-5 space-y-6">
            <span className="text-primary text-[10px] tracking-[0.25em] font-bold uppercase block">
              Signature Aesthetics
            </span>
            <h2 className="text-4xl sm:text-5xl font-display font-black uppercase tracking-tight text-on-surface">
              High Contrast, Zero Compromise.
            </h2>
            <p className="text-on-surface-variant text-sm sm:text-base leading-relaxed font-light">
              We design structured outer garment pieces with dynamic silhouettes that integrate high performance weather protection into sharp, classic forms.
            </p>
            <button
              onClick={() => navigate('/collection?category=fashion')}
              className="group text-xs font-display font-extrabold uppercase tracking-widest text-primary flex items-center gap-2 hover:underline"
            >
              Browse Outerwear <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </button>
          </div>
          
          <div className="lg:col-span-7 grid grid-cols-2 gap-4 sm:gap-6">
            <div className="aspect-[3/4] rounded-3xl overflow-hidden shadow-xl bg-surface-container relative group">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBwmV0_rxCV6q4-XhmyM2yr5YkjmeOqmXUPx3WsIVDVwGiTEIBnE8C5_pYpS1wKzujC8ibOHeL__lrCrL6G2XiUZH7Nmf4K11MX53AHqAi73VlsCo6WVuuvlFmxBnP-kbPI-lXjZcaSBkw6rhuPqIXUAOZMwz-0kH13EUhXK1fvISEATB4qNwM-cR-kq-A5LBmviLcmjdN_BND0UQgaIUk1Cy_QNz7qTYfVx4SPX-d2np23xCuAtMTtwyFTPmD4aFYReyev-I59x5s"
                alt="Model lookbook jacket"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
            </div>
            
            <div className="aspect-[3/4] rounded-3xl overflow-hidden shadow-xl bg-surface-container mt-12 relative group">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA6oEhZ242T0j2mX-ZMg_k_b7UqNE9S7YkwhjIhjBcZqXt10w5VrSZtDrlm1Kr9hxAjvoj1lzDKQj2fKGBhzaHZRc6dJTzw7I9O6EMy1U83GORlRNQ5mtO78vaj2DOdDIynIVg-zXuXVqqgRK7Gs3A8xw67vIBfxwbapvJobhSTnmEju6JGc9u5P5JlJ8-w0hxF2NxIaKhvOR4I4XtkBSRsprgdruO-fwZdNqb2yXQwFy668_1b0wU4V5hMsa3rh6DazHm4z1f3g9Y"
                alt="Model lookbook pants"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
            </div>
          </div>
        </div>

        {/* Curated Lookbook grid */}
        <div className="border-t border-border pt-16">
          <div className="flex justify-between items-end mb-12">
            <h3 className="text-2xl sm:text-3xl font-display font-black uppercase tracking-wider text-on-surface">
              Featured Garments
            </h3>
            <span className="text-xs text-on-surface-variant font-medium">({featuredFashion.length} Pieces)</span>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredFashion.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Interactive New Arrivals Panel */}
      <section className="bg-surface-container-lowest border-y border-border py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-12">
            <div className="space-y-2">
              <span className="text-[10px] tracking-[0.25em] font-bold uppercase text-primary block">
                Fresh Cuts
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-black uppercase tracking-wider text-on-surface">
                New Additions
              </h2>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => {
                  if (carouselRef.current) carouselRef.current.scrollBy({ left: -320, behavior: 'smooth' });
                }}
                className="w-11 h-11 rounded-full border border-border flex items-center justify-center hover:bg-on-surface/5 text-on-surface transition-all cursor-pointer"
                aria-label="Previous"
              >
                ←
              </button>
              <button
                onClick={() => {
                  if (carouselRef.current) carouselRef.current.scrollBy({ left: 320, behavior: 'smooth' });
                }}
                className="w-11 h-11 rounded-full border border-border flex items-center justify-center hover:bg-on-surface/5 text-on-surface transition-all cursor-pointer"
                aria-label="Next"
              >
                →
              </button>
            </div>
          </div>

          {/* Horizontal scroll strip */}
          <div
            ref={carouselRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 scrollbar-none"
          >
            {newArrivals.map((product) => (
              <div key={product.id} className="w-[280px] sm:w-[320px] shrink-0 snap-start">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Banner */}
      <section className="py-20 md:py-32 px-6 text-center max-w-4xl mx-auto space-y-6">
        <span className="text-[10px] tracking-[0.3em] font-bold text-[#e5c07b] uppercase block">
          Editorial Philosophy
        </span>
        <blockquote className="text-2xl sm:text-4xl font-display italic font-light text-on-surface leading-normal">
          "Garments are not merely items we wrap around our frames. They are structured layers that coordinate our physical form with our digital aesthetic."
        </blockquote>
        <cite className="block text-xs font-display font-bold uppercase tracking-widest text-on-surface-variant">
          — Alexander Mercer, Lead Aetheria Designer
        </cite>
      </section>

      {/* Luxury Testimonials & Lookbook Newsletter */}
      <section className="bg-black text-white py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wMykiLz48L3N2Zz4=')] opacity-25"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <span className="text-[#e5c07b] text-[10px] tracking-[0.25em] font-bold uppercase block">
              Voiced by the Elegant
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-black uppercase tracking-tight">
              Reviews of Haute Style
            </h2>
            
            <div className="space-y-6">
              <div className="border-l-2 border-[#e5c07b] pl-6 space-y-2">
                <p className="text-sm text-white/80 italic leading-relaxed">
                  "The Obsidian Zenith Parka coordinates with my urban landscape beautifully. The Liquid Carbon silk shell reflects neon glares and handles cold downpours without effort. Simply supreme."
                </p>
                <span className="block text-[10px] uppercase font-bold tracking-widest text-[#e5c07b]">
                  Elena R. — Tokyo, Japan
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 p-8 sm:p-12 rounded-3xl backdrop-blur-md space-y-6">
            <h3 className="text-2xl font-display font-extrabold uppercase tracking-wider text-center sm:text-left">
              Join the Editorial List
            </h3>
            <p className="text-xs text-white/60 leading-relaxed text-center sm:text-left">
              Receive bi-monthly collections updates, designer styling lookbooks, and early access code drops.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                required
                placeholder="Email Address"
                className="flex-grow bg-white/10 border border-white/20 rounded-full px-5 py-3 text-xs focus:outline-none focus:border-[#e5c07b] text-white placeholder:text-white/30"
              />
              <button
                type="submit"
                className="bg-white text-black font-display font-bold text-[10px] uppercase tracking-widest py-3.5 px-8 rounded-full hover:bg-[#e5c07b] hover:text-white transition-all shadow-xl"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};
export default HomeFashion;
