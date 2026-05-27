import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Truck, Award, Headphones, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';
import { SEO } from '../components/SEO';

export const Home: React.FC = () => {
  const { products } = useApp();
  const navigate = useNavigate();

  // Countdown State
  const [timeLeft, setTimeLeft] = useState({ hours: 5, minutes: 42, seconds: 18 });
  const [loadedCategories, setLoadedCategories] = useState<Record<string, boolean>>({});

  const categoriesRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);

  const scrollSlider = (ref: React.RefObject<HTMLDivElement | null>, direction: 'left' | 'right') => {
    if (ref.current) {
      const scrollAmount = ref.current.clientWidth * 0.8;
      ref.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          // Reset countdown to simulate a continuous flash sale
          return { hours: 8, minutes: 0, seconds: 0 };
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Filter trending products to display
  const trendingProducts = products.filter((p) =>
    ['obsidian-smart-watch', 'lunar-elite-sneakers', 'minimalist-leather-tote', 'aura-pro-audio'].includes(p.id)
  );

  const categories = [
    {
      name: 'Fashion',
      key: 'fashion',
      desc: 'High-end avant-garde wear',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBpCPxMftmLp8-unuCZzzsqkgi1a4Fno6mQjkJpiFDvB6uvie8FbTZT1BhhIFRrbUU-L3aqKPonOdoIn3Cz53m8-7LA1k8SfTwIt1MhJ_mF6kY1D_Pc6dz6egnrjqQQexN0g-m5ENunR52i4Q-iGkkTSKjkBbOSEhoclsbGN85g9FKEx7lIma-lM8lWqSRHh6YBb_IAuflXbdWoUVboqH1t0KRy3gmq5JRZM1rQB1pky6eHEqEzmTKtHn3b2eagFEOTwZqqmfrwKHg'
    },
    {
      name: 'Footwear',
      key: 'footwear',
      desc: 'Premium designer footwear',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBNs8x75EYALHnv1U3hRE36ksR3Cxer862Uhys_vuxozoV8JGB7qoXKs99M8IbfSmtR7dDG2zUKWsraiTHGPMBUECM-YAHXNehT_z10GCX-5RFwPml22Z0lpU8dY8CzckHpzuSGplP4keJzaj8IVw1d7jpPaAWsWEz8B0JiUiARw7vCqMLepATHHBFgF9VbtM4QNVs8AWMj0vbmgwr8ILAZfBMroGygBitOHSEg2xpU9oudhu6gfNGfuK_O5bmbgyFwajkRsTXLSeA'
    },
    {
      name: 'Watches',
      key: 'watches',
      desc: 'Bespoke precision timepieces',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBno99WOBueYImcyeAmMN08wvq37AS2WBU0zsUftVC-qKNVS5bcD8gM2eGpJFKBEPJoO6iQGPg7kGbDPUaAfDz1LHSWhVSKVrUnswu3FFVRfurU-tDjMXbaG6RBsgPzldeFcGX7jqtaDWcGWodg7TyHju6kgHJ0XiOLpAcwNLRsVWuLSvPovkw2GXg83eXBmS5_KjaC7gpJvCnX218Io_SkngtNBeGsMxMW0PPni0r_xghP9LNU8_Kd77YWdAUqg3HOMsv1p9eaSuE'
    },
    {
      name: 'Electronics',
      key: 'electronics',
      desc: 'High-fidelity engineering',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBbgXI71f6_zQy-cfLSQtrYpcDgwKRPNApKiUBhMrzRK0M0pRt_OVLPbZooCSGJGSDqfE7pxfy8tToIkvL1vaTiW9RUnLM3wYbzj_MvwVRGreRNvaaZTL5mTwgmEu1Tnf-sMkbNgkWUdPMEIBqHsOzv9sRlDgGGaEOJ-bDdtZfUG6z9RjSVLRs8SsaJ8Yx2opThzMakeJ55cJV-Zdor1G9NGlfvaA0zlM-Ermj0ROsT-eBjZaWw_8ZvEXVRUI3yQ0xQlx-5dKZMbCM'
    },
    {
      name: 'Accessories',
      key: 'accessories',
      desc: 'Bespoke daily details',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBtaY_pUePO5Pk45hQH4ngkh8rlN-8Hv5kV31Aren82KPmH80jo3q9rU3Z9FLfPxNLOLEfRRc5w--wZ_Hi20t5dcxMsm7w3x9GhrOM7GM9BNe5ePNeI4Yd3eOwbhNifeGqOzKBeOGajJEJ61mNvvWZpgQyUWsBVuRWW1BWJsP0k_ycrs5hpfC1dJ1ur_G7Lq1XbOVK2lForACVUH7X7kEdlmZMhO5KbEWyF2NT17807E8lOrwC5Fa9CRSMXmPzjo5am8dhMkQ1ySp0'
    },
    {
      name: 'Beauty',
      key: 'beauty',
      desc: 'Pure organic self care',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDbUJZJg6kaMIZ39mfoEtSMi_cOTXU4kMEtHjiHIB_VCkGYpRGJdavEh2ihvTkoHYACkk7jAnQTJCjeHF-iMDULBrchFrerajWQipoYMGqBIudCmkkColBmDsAqhTjg9nvxXWNpVAFDohDiIm8qpVVKamlYpVzbiPonUd4fz1u0MTlt515Ke3onC0zsUr5U5j_jm_tRuLdZvEMxU0FkRtgyEctvts2ra4hsWxnn0Zal4h1zDjMd1Ip_YH2W5EcgfLhwsVF5EKXXcio'
    },
    {
      name: 'Home Decor',
      key: 'decor',
      desc: 'Sculpted curation design',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAIKPiC59wj4tkQHNKxwKcka_A3IlKDHSBr_Ui75LJjfr6rE0d_rFL96od3sFuwbb2BVoKs8oj6S6vKKXo5MUhw3x_CwpqLPBYXWhAO-Pxm8JXmtF4WFoiBz8_nzaJfU_mAywSgWJCo_5T21SC-Q1hFHioQNaXGQ4z32lUxkqqMR6PPl9P5FDSlW-ERBO_VfKeJ0b9ijmwsusYo-XB2UDxt6bWb4FaA1RQ3HhT0uWID53xEOZ26KOZ1gsQueE0kUKw78sNG7opujPo'
    }
  ];

  return (
    <div className="flex-grow">
      <SEO
        title="Home"
        description="Discover a curated collection of premium products designed for the modern aesthete. Experience flawless digital craftsmanship and luxury product quality."
      />

      {/* Hero Section */}
      <header className="relative pt-24 pb-12 md:pt-[120px] md:pb-24 px-4 md:px-6 max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 text-center lg:text-left min-h-[70vh] md:min-h-[85vh] overflow-hidden">
        {/* Animated Radial Gradients */}
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-primary/10 via-secondary/15 to-transparent blur-3xl rounded-full opacity-60 w-3/4 h-3/4 left-1/8 top-1/8 pointer-events-none"></div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 space-y-6 max-w-2xl lg:w-1/2"
        >
          <span className="text-xs tracking-[0.25em] font-bold text-primary uppercase block">Aetheria Luxe Showcase</span>
          <h1 className="text-4xl sm:text-6xl font-display font-extrabold text-on-surface leading-[1.1] tracking-tight">
            Redefining Modern <span className="text-gradient-primary">Elegance</span>
          </h1>
          <p className="text-body-lg text-on-surface-variant max-w-xl mx-auto lg:mx-0 text-base sm:text-lg leading-relaxed">
            Discover a curated collection of premium products designed for the modern aesthete. Where flawless digital craftsmanship meets unparalleled product quality.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
            <button
              onClick={() => navigate('/collection')}
              className="bg-primary text-on-primary font-display font-bold py-3.5 px-8 rounded-full btn-primary-glow hover:scale-[1.02] active:scale-95 transition-all duration-300 shadow-xl cursor-pointer"
            >
              Shop Now
            </button>
            <button
              onClick={() => navigate('/about')}
              className="bg-transparent border border-border text-on-surface font-display font-bold py-3.5 px-8 rounded-full hover:bg-on-surface/5 transition-all duration-300 backdrop-blur-md cursor-pointer"
            >
              Explore Our Story
            </button>
          </div>
        </motion.div>

        {/* Eagerly Loaded Showcase LCP Hero Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-10 w-full sm:w-2/3 lg:w-1/2 max-w-md aspect-square rounded-3xl premium-glass p-4 border border-border shadow-2xl flex items-center justify-center group overflow-hidden will-change-transform"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent z-10 pointer-events-none" />
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBno99WOBueYImcyeAmMN08wvq37AS2WBU0zsUftVC-qKNVS5bcD8gM2eGpJFKBEPJoO6iQGPg7kGbDPUaAfDz1LHSWhVSKVrUnswu3FFVRfurU-tDjMXbaG6RBsgPzldeFcGX7jqtaDWcGWodg7TyHju6kgHJ0XiOLpAcwNLRsVWuLSvPovkw2GXg83eXBmS5_KjaC7gpJvCnX218Io_SkngtNBeGsMxMW0PPni0r_xghP9LNU8_Kd77YWdAUqg3HOMsv1p9eaSuE"
            alt="Obsidian Premium Smart Watch Showcase"
            loading="eager"
            fetchPriority="high"
            className="w-full h-full object-contain rounded-2xl scale-95 group-hover:scale-100 transition-transform duration-700"
          />
          {/* Subtle floating overlay elements */}
          <div className="absolute bottom-6 left-6 z-20 glass-level-2 border border-border py-2 px-4 rounded-2xl flex items-center gap-2 shadow-lg">
            <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
            <span className="text-[10px] font-display font-bold uppercase tracking-wider text-on-surface">Obsidian Edition</span>
          </div>
        </motion.div>
      </header>

      {/* Curated Categories */}
      <section className="w-full bg-surface-container-lowest border-y border-border py-12 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6 space-y-6 md:space-y-10">
          <div className="flex justify-between items-end">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-display font-bold text-on-surface border-l-4 border-primary pl-4"
            >
              Curated Categories
            </motion.h2>
            <div className="flex gap-2">
              <button
                onClick={() => scrollSlider(categoriesRef, 'left')}
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-on-surface/5 active:scale-95 transition-all text-on-surface-variant hover:text-on-surface cursor-pointer"
                aria-label="Previous category"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scrollSlider(categoriesRef, 'right')}
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-on-surface/5 active:scale-95 transition-all text-on-surface-variant hover:text-on-surface cursor-pointer"
                aria-label="Next category"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div
            ref={categoriesRef}
            className="flex gap-4 md:gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-none pb-4"
          >
            {categories.map((cat, idx) => {
              const isImageLoaded = loadedCategories[cat.key];
              return (
                <motion.div
                  key={cat.key}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  onClick={() => navigate(`/collection?category=${cat.key}`)}
                  className="flex-shrink-0 w-[260px] sm:w-[300px] snap-start glass-level-1 rounded-3xl overflow-hidden relative group img-zoom cursor-pointer aspect-[4/5] card-hover will-change-transform"
                >
                  {!isImageLoaded && (
                    <div className="absolute inset-0 bg-surface-container-high animate-pulse flex items-center justify-center z-10">
                      <div className="w-8 h-8 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
                    </div>
                  )}
                  <img
                    src={cat.img}
                    alt={cat.name}
                    onLoad={() => setLoadedCategories(prev => ({ ...prev, [cat.key]: true }))}
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${isImageLoaded ? 'opacity-70 group-hover:opacity-85 scale-100' : 'opacity-0 scale-95'}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent z-0"></div>
                  <div className="absolute bottom-0 left-0 p-6 w-full space-y-2 z-10">
                    <h3 className="text-xl font-display font-semibold text-white group-hover:text-primary transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-white/70 flex items-center gap-1.5 font-medium tracking-wide">
                      {cat.desc} <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform text-white group-hover:text-primary" />
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section className="py-10 md:py-20 px-4 md:px-6 max-w-7xl mx-auto space-y-6 md:space-y-10">
        <div className="flex justify-between items-end">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-display font-bold text-on-surface border-l-4 border-primary pl-4"
          >
            Trending Now
          </motion.h2>
          <Link
            to="/collection"
            className="text-primary hover:text-secondary transition-colors text-sm font-semibold flex items-center gap-2"
          >
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {trendingProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Flash Sale Banner */}
      <section className="w-full bg-gradient-dynamic py-12 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] opacity-30"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 text-center lg:text-left">
          <div className="space-y-4">
            <span className="bg-white/10 text-white border border-white/20 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase backdrop-blur-md">
              Limited Drop
            </span>
            <h2 className="text-4xl font-display font-bold text-white leading-tight">Midnight Exclusives</h2>
            <p className="text-white/80 max-w-xl text-sm sm:text-base leading-relaxed">
              Unlock unprecedented access to our most coveted pieces. Enjoy up to 40% off selected luxury items before they vanish into the obsidian dark.
            </p>
          </div>

          <div className="flex flex-col items-center lg:items-end gap-6 w-full lg:w-auto">
            <div className="flex gap-2.5 sm:gap-4 justify-center w-full">
              <div className="glass-level-1 rounded-2xl px-3.5 py-3 sm:px-5 sm:py-4 text-center min-w-[75px] sm:min-w-[90px] border border-white/10 shadow-xl">
                <span className="block text-2xl sm:text-3xl font-display font-bold text-white">
                  {timeLeft.hours.toString().padStart(2, '0')}
                </span>
                <span className="text-[9px] sm:text-[10px] text-white/50 tracking-wider font-semibold uppercase">Hours</span>
              </div>
              <div className="glass-level-1 rounded-2xl px-3.5 py-3 sm:px-5 sm:py-4 text-center min-w-[75px] sm:min-w-[90px] border border-white/10 shadow-xl">
                <span className="block text-2xl sm:text-3xl font-display font-bold text-white">
                  {timeLeft.minutes.toString().padStart(2, '0')}
                </span>
                <span className="text-[9px] sm:text-[10px] text-white/50 tracking-wider font-semibold uppercase">Mins</span>
              </div>
              <div className="glass-level-1 rounded-2xl px-3.5 py-3 sm:px-5 sm:py-4 text-center min-w-[75px] sm:min-w-[90px] border border-white/10 shadow-xl">
                <span className="block text-2xl sm:text-3xl font-display font-bold text-white">
                  {timeLeft.seconds.toString().padStart(2, '0')}
                </span>
                <span className="text-[9px] sm:text-[10px] text-white/50 tracking-wider font-semibold uppercase">Secs</span>
              </div>
            </div>
            <button
              onClick={() => navigate('/collection?filter=sale')}
              className="bg-white text-[#5516be] hover:bg-neutral-100 font-display font-bold py-3.5 px-8 rounded-full shadow-2xl hover:scale-[1.03] active:scale-95 transition-all duration-300 w-full lg:w-auto"
            >
              Claim Offer
            </button>
          </div>
        </div>
      </section>

      {/* Trust Badges - The Aetheria Standard */}
      <section className="w-full bg-surface-container-lowest border-y border-border py-12 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6 space-y-8 md:space-y-12">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <h2 className="text-3xl font-display font-bold text-on-surface">The Aetheria Standard</h2>
            <p className="text-on-surface-variant text-sm sm:text-base leading-relaxed">
              Excellence woven into every detail of your digital acquisition experience.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass-level-1 p-8 rounded-3xl text-center card-hover">
              <div className="w-14 h-14 rounded-full glass-level-2 flex items-center justify-center mx-auto mb-6 text-primary border border-primary/20">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-display font-semibold text-on-surface mb-2">Fast Delivery</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Complimentary express shipping on all premium orders globally, tracked in real-time.
              </p>
            </div>

            <div className="glass-level-1 p-8 rounded-3xl text-center card-hover">
              <div className="w-14 h-14 rounded-full glass-level-2 flex items-center justify-center mx-auto mb-6 text-primary border border-primary/20">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-display font-semibold text-on-surface mb-2">Secure Payment</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Bank-grade 256-bit encryption ensuring your transactions are always secure.
              </p>
            </div>

            <div className="glass-level-1 p-8 rounded-3xl text-center card-hover">
              <div className="w-14 h-14 rounded-full glass-level-2 flex items-center justify-center mx-auto mb-6 text-primary border border-primary/20">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-display font-semibold text-on-surface mb-2">Premium Quality</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Uncompromising craftsmanship, finest materials, and lifetime support guarantees.
              </p>
            </div>

            <div className="glass-level-1 p-8 rounded-3xl text-center card-hover">
              <div className="w-14 h-14 rounded-full glass-level-2 flex items-center justify-center mx-auto mb-6 text-primary border border-primary/20">
                <Headphones className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-display font-semibold text-on-surface mb-2">24/7 Support</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Dedicated private support desk available via digital live chat at any moment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-10 md:py-20 px-4 md:px-6 max-w-7xl mx-auto space-y-8 md:space-y-12">
        <div className="flex justify-between items-end">
          <h2 className="text-3xl font-display font-bold text-on-surface border-l-4 border-primary pl-4">Voices of Elegance</h2>
          <div className="flex gap-2">
            <button
              onClick={() => scrollSlider(testimonialsRef, 'left')}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-on-surface/5 active:scale-95 transition-all text-on-surface-variant hover:text-on-surface cursor-pointer"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scrollSlider(testimonialsRef, 'right')}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-on-surface/5 active:scale-95 transition-all text-on-surface-variant hover:text-on-surface cursor-pointer"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div
          ref={testimonialsRef}
          className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-none pb-4"
        >
          <div className="flex-shrink-0 w-full md:w-[calc(50%-12px)] lg:w-[calc(33.33%-16px)] snap-start glass-level-1 p-8 rounded-3xl flex flex-col justify-between border border-white/5 shadow-xl">
            <div className="space-y-6">
              <div className="flex text-primary">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-sm text-on-surface-variant italic leading-relaxed">
                "The attention to detail is simply unmatched. Every purchase feels like unwrapping a piece of art. Aetheria Luxe has completely transformed my wardrobe."
              </p>
            </div>
            <div className="flex items-center gap-4 mt-8">
              <div className="w-11 h-11 rounded-full bg-surface-container overflow-hidden border border-white/10">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCPydnqJm2OGM_ThHFCL0U1LUNiEfmSntbntLiPoM7wZICtx-29jzFlPpGD7CZlrqIfjQI76CNrQ9mTESFcB92ZgYXyvSqS6tvMgiiSGGkq3MNCLmyfKT8mgIfU0HUZL6jCIQxUJsCXWiyyfv8iTJjd4skrxkfVzRjezrSidE1FkQj-5lBkSQ9WBODGg8YK3kfzokCDa8ciom7znReYHBdPCBhJLSCOlY_wAYHNm0-vCmmncqJH4xzWwS9X7o2d8PCOVvdSsX49sHA"
                  alt="Elena R."
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-semibold text-sm text-on-surface">Elena R.</h4>
                <p className="text-[11px] text-on-surface-variant uppercase tracking-wider font-semibold">Verified Buyer</p>
              </div>
            </div>
          </div>

          <div className="flex-shrink-0 w-full md:w-[calc(50%-12px)] lg:w-[calc(33.33%-16px)] snap-start glass-level-1 p-8 rounded-3xl flex flex-col justify-between border border-white/5 shadow-xl">
            <div className="space-y-6">
              <div className="flex text-primary">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-sm text-on-surface-variant italic leading-relaxed">
                "Exceptional quality and the shipping was incredibly fast. The minimalist aesthetic perfectly aligns with my personal style. Highly recommended."
              </p>
            </div>
            <div className="flex items-center gap-4 mt-8">
              <div className="w-11 h-11 rounded-full bg-surface-container overflow-hidden border border-white/10">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAicxTrxJFREaoWnq66-9fI_wSDX_fxarVDR_vADE4V-m3NFGdzPUohI0-_fWMvW5xZhU8Gly--E4y6e1xGXgUk0FQi0VfF2PZRqTjKeI8YFpZymVxUZq4LWePmK-44p9kLlMcutKlTToDOPGXy7jkWJ6HAhigpU1-Ort7wMUifwZm9U7YI2va6PgCUNvKQQr6HhpJSGBW_dh3dinnpLdoi7k11IA4Qcglf6kE2M2ZilxT8Kh8MboPhhqDv9I2uueaTyfBZwxTjAuE"
                  alt="Marcus T."
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-semibold text-sm text-on-surface">Marcus T.</h4>
                <p className="text-[11px] text-on-surface-variant uppercase tracking-wider font-semibold">Verified Buyer</p>
              </div>
            </div>
          </div>

          <div className="flex-shrink-0 w-full md:w-[calc(50%-12px)] lg:w-[calc(33.33%-16px)] snap-start glass-level-1 p-8 rounded-3xl flex flex-col justify-between border border-white/5 shadow-xl">
            <div className="space-y-6">
              <div className="flex text-primary">
                {[...Array(4)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
                <Star className="w-4 h-4 text-on-surface-variant" />
              </div>
              <p className="text-sm text-on-surface-variant italic leading-relaxed">
                "I've finally found a brand that understands understated luxury. The customer service team went above and beyond to help me select the perfect gift."
              </p>
            </div>
            <div className="flex items-center gap-4 mt-8">
              <div className="w-11 h-11 rounded-full bg-surface-container overflow-hidden border border-white/10">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDTVJSHtq9XWBeOBZB6ijb5ASvE6PcvTbperPNyAPW9DGDd43DCFBMy4en0L6wFoSJjQfjvuHqjc9O4dRCFRT_gf-ALh6WEv1TJVUEIxyMOtHSgXwvhvksXXw93Mzl6TCKZr1xCl4TD8zXBOPtnC1WaB9UD8WjkSaja23NRYCrrAa-ACIt7PCePEAlt0xdTXiCyx5giUXu9ScriJQW6voJoW3SeUmcgBfRRSt93BdbqyTruC8pOXdEMePo8FbetD0tb4haER81PlB4"
                  alt="Sarah L."
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-semibold text-sm text-on-surface">Sarah L.</h4>
                <p className="text-[11px] text-on-surface-variant uppercase tracking-wider font-semibold">Verified Buyer</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Special Inner Circle Box */}
      <section className="pb-10 md:pb-20 px-4 md:px-6 max-w-7xl mx-auto relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 blur-3xl rounded-full opacity-40 z-0"></div>
        <div className="premium-glass rounded-3xl p-10 md:p-16 text-center relative z-10 flex flex-col items-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-on-surface">Join the Inner Circle</h2>
          <p className="text-on-surface-variant max-w-xl leading-relaxed text-sm sm:text-base">
            Subscribe below to receive exclusive notifications for limited product collections, custom sizing sessions, and private editorial events.
          </p>
          <button
            onClick={() => {
              const footerEmailInput = document.querySelector('footer input[type="email"]') as HTMLInputElement;
              if (footerEmailInput) {
                footerEmailInput.scrollIntoView({ behavior: 'smooth' });
                footerEmailInput.focus();
              }
            }}
            className="bg-primary text-on-primary font-display font-bold py-3 px-8 rounded-full btn-primary-glow active:scale-95 transition-all duration-300"
          >
            Access Membership
          </button>
        </div>
      </section>
    </div>
  );
};
export default Home;
