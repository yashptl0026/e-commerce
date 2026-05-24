import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Truck, Award, Headphones, Star } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';

export const Home: React.FC = () => {
  const { products } = useApp();
  const navigate = useNavigate();

  // Countdown State
  const [timeLeft, setTimeLeft] = useState({ hours: 5, minutes: 42, seconds: 18 });

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
      name: 'Home Decor',
      key: 'decor',
      desc: 'Sculpted curation design',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAIKPiC59wj4tkQHNKxwKcka_A3IlKDHSBr_Ui75LJjfr6rE0d_rFL96od3sFuwbb2BVoKs8oj6S6vKKXo5MUhw3x_CwpqLPBYXWhAO-Pxm8JXmtF4WFoiBz8_nzaJfU_mAywSgWJCo_5T21SC-Q1hFHioQNaXGQ4z32lUxkqqMR6PPl9P5FDSlW-ERBO_VfKeJ0b9ijmwsusYo-XB2UDxt6bWb4FaA1RQ3HhT0uWID53xEOZ26KOZ1gsQueE0kUKw78sNG7opujPo'
    }
  ];

  return (
    <div className="flex-grow">
      {/* Hero Section */}
      <header className="relative pt-28 pb-12 md:pt-[140px] md:pb-24 px-4 md:px-6 max-w-7xl mx-auto flex flex-col items-center justify-center text-center min-h-[70vh] md:min-h-[85vh] overflow-hidden">
        {/* Animated Radial Gradients */}
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-primary/10 via-secondary/15 to-transparent blur-3xl rounded-full opacity-60 w-3/4 h-3/4 left-1/8 top-1/8 pointer-events-none"></div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 space-y-8 max-w-4xl"
        >
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-extrabold text-on-surface leading-[1.1] tracking-tight">
            Redefining Modern <span className="text-gradient-primary">Elegance</span>
          </h1>
          <p className="text-body-lg text-on-surface-variant max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            Discover a curated collection of premium products designed for the modern aesthete. Where flawless digital craftsmanship meets unparalleled product quality.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <button
              onClick={() => navigate('/collection')}
              className="bg-primary text-[#002e6a] font-display font-bold py-3.5 px-8 rounded-full btn-primary-glow hover:scale-[1.02] active:scale-95 transition-all duration-300 shadow-xl"
            >
              Shop Now
            </button>
            <button
              onClick={() => navigate('/about')}
              className="bg-transparent border border-white/20 text-on-surface font-display font-bold py-3.5 px-8 rounded-full hover:bg-white/5 transition-all duration-300 backdrop-blur-md"
            >
              Explore Our Story
            </button>
          </div>
        </motion.div>
      </header>

      {/* Curated Categories */}
      <section className="w-full bg-[#0b0e15] border-y border-white/5 py-12 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6 space-y-6 md:space-y-10">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-display font-bold text-on-surface border-l-4 border-primary pl-4"
          >
            Curated Categories
          </motion.h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {categories.map((cat, idx) => (
              <motion.div
                key={cat.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                onClick={() => navigate(`/collection?category=${cat.key}`)}
                className="glass-level-1 rounded-3xl overflow-hidden relative group img-zoom cursor-pointer aspect-[4/5] card-hover"
              >
                <img
                  src={cat.img}
                  alt={cat.name}
                  className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-75 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#10131a]/95 via-[#10131a]/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6 w-full space-y-2">
                  <h3 className="text-xl font-display font-semibold text-on-surface group-hover:text-primary transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-on-surface-variant flex items-center gap-1.5 font-medium tracking-wide">
                    {cat.desc} <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
                  </p>
                </div>
              </motion.div>
            ))}
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

      {/* Trust Badges - The Lumina Standard */}
      <section className="w-full bg-[#0b0e15] border-y border-white/5 py-12 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6 space-y-8 md:space-y-12">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <h2 className="text-3xl font-display font-bold text-on-surface">The Lumina Standard</h2>
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
        <h2 className="text-3xl font-display font-bold text-on-surface text-center">Voices of Elegance</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-level-1 p-8 rounded-3xl flex flex-col justify-between border border-white/5 shadow-xl">
            <div className="space-y-6">
              <div className="flex text-primary">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-sm text-on-surface-variant italic leading-relaxed">
                "The attention to detail is simply unmatched. Every purchase feels like unwrapping a piece of art. Lumina Luxe has completely transformed my wardrobe."
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

          <div className="glass-level-1 p-8 rounded-3xl flex flex-col justify-between border border-white/5 shadow-xl">
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

          <div className="glass-level-1 p-8 rounded-3xl flex flex-col justify-between border border-white/5 shadow-xl">
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
        <div className="glass-level-1 rounded-3xl p-10 md:p-16 text-center relative z-10 border border-white/10 flex flex-col items-center space-y-6">
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
            className="bg-primary text-[#002e6a] font-display font-bold py-3 px-8 rounded-full btn-primary-glow active:scale-95 transition-all duration-300"
          >
            Access Membership
          </button>
        </div>
      </section>
    </div>
  );
};
export default Home;
