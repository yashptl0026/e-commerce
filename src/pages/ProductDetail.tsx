import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ShoppingBag, ChevronRight, Minus, ChevronDown, Check, Star, Share2, Copy, MapPin, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface Review {
  id: string;
  name: string;
  rating: number;
  date: string;
  headline: string;
  comment: string;
  verified: boolean;
}

const MOCK_REVIEWS_BY_PRODUCT: Record<string, Review[]> = {
  'obsidian-zenith-parka': [
    {
      id: 'rev-1',
      name: 'Julian R.',
      rating: 5,
      date: 'May 12, 2026',
      headline: 'Masterpiece of modern technical outerwear',
      comment: 'The Liquid Carbon silk drape is absolutely incredible. It catches light in a way standard nylon cannot. Extremely warm yet lightweight. Highly recommended.',
      verified: true
    },
    {
      id: 'rev-2',
      name: 'Marcus V.',
      rating: 4,
      date: 'April 28, 2026',
      headline: 'Stunning design, fits slightly relaxed',
      comment: 'Outstanding build quality. The modular lining is very useful. It runs slightly larger than typical slim outerwear, so size down if you prefer a closer cut.',
      verified: true
    }
  ],
  'obsidian-smart-watch': [
    {
      id: 'rev-3',
      name: 'Arthur K.',
      rating: 5,
      date: 'May 18, 2026',
      headline: 'A holographic masterpiece',
      comment: 'The display is incredibly crisp and looks amazing in low light. The battery easily lasts a week. Titanium casing feels premium and lightweight on the wrist.',
      verified: true
    },
    {
      id: 'rev-4',
      name: 'Sarah L.',
      rating: 4,
      date: 'May 05, 2026',
      headline: 'Beautiful design, slight learning curve',
      comment: 'The interface is stunning. It takes a little time to customize the widgets to your liking, but once set up, it works perfectly. Sleek matte black finish matches everything.',
      verified: true
    }
  ]
};

const DEFAULT_MOCK_REVIEWS: Review[] = [
  {
    id: 'rev-d1',
    name: 'Elena P.',
    rating: 5,
    date: 'May 20, 2026',
    headline: 'Exceeded all luxury expectations',
    comment: 'Aetheria Luxe delivers once again. The packaging, signature detailing, and structural design feel incredibly premium. Definitely worth the investment.',
    verified: true
  },
  {
    id: 'rev-d2',
    name: 'David W.',
    rating: 5,
    date: 'May 15, 2026',
    headline: 'Flawless execution',
    comment: 'Simple, modern, and high-performance. The materials used feel very durable and premium. Customer support was also helpful when checking delivery tracking.',
    verified: true
  }
];

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { products, wishlist, toggleWishlist, addToCart, showToast } = useApp();
  const navigate = useNavigate();

  const product = useMemo(() => products.find((p) => p.id === id), [products, id]);

  // Active Selections
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);

  // Showroom Reservation Modal State
  const [isReserveModalOpen, setIsReserveModalOpen] = useState(false);
  const [selectedShowroom, setSelectedShowroom] = useState('soho');
  const [reserveName, setReserveName] = useState('');
  const [reservePhone, setReservePhone] = useState('');

  const showrooms = [
    {
      id: 'soho',
      name: 'Soho Showroom',
      address: '742 Frost Obsidian Boulevard, Suite 404, Soho, NY 10001',
      phone: '+1 (212) 555-8392',
      hours: 'Mon - Sat: 10am - 8pm, Sun: 11am - 6pm'
    },
    {
      id: 'mayfair',
      name: 'Mayfair Showroom',
      address: '12 Savile Row, Mayfair, London W1S 3PQ',
      phone: '+44 20 7946 0958',
      hours: 'Mon - Sat: 10am - 7pm, Sun: Closed'
    },
    {
      id: 'ginza',
      name: 'Ginza Showroom',
      address: '5-1-1 Ginza, Chuo-ku, Tokyo 104-0061',
      phone: '+81 3 5555 0192',
      hours: 'Daily: 11am - 8pm'
    }
  ];

  // Mobile Sticky Bottom Bar Scroll State
  const [showStickyBar, setShowStickyBar] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    if (showStickyBar) {
      document.body.classList.add('mobile-sticky-bar-visible');
    } else {
      document.body.classList.remove('mobile-sticky-bar-visible');
    }
    return () => {
      document.body.classList.remove('mobile-sticky-bar-visible');
    };
  }, [showStickyBar]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show sticky bottom bar on mobile screens when scrolled past 400px, 
      // but only when scrolling up. If scrolling down, hide it.
      if (window.innerWidth < 1024) {
        if (currentScrollY > 400) {
          if (currentScrollY < lastScrollY.current) {
            setShowStickyBar(true);
          } else {
            setShowStickyBar(false);
          }
        } else {
          setShowStickyBar(false);
        }
      } else {
        setShowStickyBar(false);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Reviews State
  const [reviews, setReviews] = useState<Review[]>([]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({ name: '', rating: 5, headline: '', comment: '' });

  useEffect(() => {
    if (product) {
      const initialReviews = MOCK_REVIEWS_BY_PRODUCT[product.id] || DEFAULT_MOCK_REVIEWS;
      setReviews(initialReviews);
      setShowReviewForm(false);
      setNewReview({ name: '', rating: 5, headline: '', comment: '' });
    }
  }, [product]);

  const averageRating = useMemo(() => {
    if (!product) return 5;
    if (reviews.length === 0) return product.rating;
    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    return Math.round((sum / reviews.length) * 10) / 10;
  }, [reviews, product]);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.name.trim() || !newReview.headline.trim() || !newReview.comment.trim()) {
      showToast('Please fill in all review fields.', 'error');
      return;
    }

    const reviewObj: Review = {
      id: `rev-${Date.now()}`,
      name: newReview.name.trim(),
      rating: newReview.rating,
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      headline: newReview.headline.trim(),
      comment: newReview.comment.trim(),
      verified: true
    };

    setReviews((prev) => [reviewObj, ...prev]);
    setNewReview({ name: '', rating: 5, headline: '', comment: '' });
    setShowReviewForm(false);
    showToast('Your review has been successfully posted.', 'success');
  };


  // Accordion Open/Closed states
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({
    specs: true,
    sustainability: false,
    delivery: false
  });

  // Reset values when product swaps
  useEffect(() => {
    if (product) {
      setActiveImageIdx(0);
      setSelectedColor(product.colors[0]?.name || '');
      setSelectedSize(product.sizes[0] || '');
      setQuantity(1);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="flex-grow pt-28 pb-24 text-center max-w-7xl mx-auto flex flex-col items-center justify-center gap-6">
        <h2 className="text-3xl font-display font-bold">Product Not Found</h2>
        <p className="text-on-surface-variant max-w-sm">The product item you are looking for does not exist in our catalog.</p>
        <Link to="/collection" className="bg-primary text-on-primary font-display font-bold py-3 px-8 rounded-full">
          Return to Catalog
        </Link>
      </div>
    );
  }

  const isWishlisted = wishlist.includes(product.id);

  const handleAddToBag = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
    navigate('/checkout');
  };

  const handleReserveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reserveName.trim() || !reservePhone.trim()) {
      showToast('Please fill in your name and phone number.', 'error');
      return;
    }
    const showroomObj = showrooms.find(s => s.id === selectedShowroom);
    showToast(`Reservation Confirmed! 1x ${product.name} (${selectedColor} / ${selectedSize}) has been reserved at our ${showroomObj?.name || 'Soho'} showroom.`, 'success');
    setIsReserveModalOpen(false);
    setReserveName('');
    setReservePhone('');
  };

  const toggleAccordion = (section: string) => {
    setOpenAccordions((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // Get similar products for recommendation
  const recommendations = products.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <main className="flex-grow pt-20 pb-16 md:pt-28 md:pb-24 px-4 md:px-6 max-w-7xl mx-auto w-full">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-on-surface-variant font-display font-medium mb-8 overflow-x-auto overflow-y-hidden whitespace-nowrap scrollbar-none py-1">
        <Link to="/" className="hover:text-primary transition-colors">Home</Link>
        <ChevronRight className="w-3 h-3 text-on-surface-variant/40" />
        <Link to="/collection" className="hover:text-primary transition-colors">Collections</Link>
        <ChevronRight className="w-3 h-3 text-on-surface-variant/40" />
        <Link to={`/collection?category=${product.category}`} className="hover:text-primary transition-colors capitalize">
          {product.category}
        </Link>
        <ChevronRight className="w-3 h-3 text-on-surface-variant/40" />
        <span className="text-primary">{product.name}</span>
      </nav>

      {/* Main product setup */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Product Gallery */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="aspect-square sm:aspect-[4/5] overflow-hidden rounded-2xl glass-level-1 border border-border relative group"
          >
            <img
              src={product.images[activeImageIdx] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover rounded-2xl transition-transform duration-700 group-hover:scale-105"
            />
            {product.isNew && (
              <span className="absolute top-4 left-4 accent-gradient text-white px-3 py-1 rounded text-xs font-bold tracking-wider shadow-lg z-10">
                New Exclusive
              </span>
            )}
          </motion.div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="grid grid-cols-3 gap-4">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIdx(idx)}
                  className={`aspect-[4/5] rounded-xl overflow-hidden glass-level-1 border transition-all ${activeImageIdx === idx ? 'border-primary ring-2 ring-primary/20 scale-102' : 'border-border hover:border-on-surface/20'
                    }`}
                >
                  <img src={img} alt={`${product.name} View ${idx + 1}`} className="w-full h-full object-cover rounded-xl" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Configurations Side */}
        <div className="lg:col-span-5 lg:sticky lg:top-32 space-y-8">
          <div className="space-y-4">
            <span className="text-xs tracking-wider font-semibold text-primary">Aetheria Luxury System</span>
            <div className="flex justify-between items-start gap-4">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display font-extrabold text-on-surface leading-tight">
                {product.name}
              </h1>
              {/* Wishlist Trigger */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`p-3 rounded-full glass-level-2 border border-white/10 transition-all ${isWishlisted ? 'text-primary' : 'text-on-surface hover:text-primary'
                  }`}
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-primary' : ''}`} />
              </button>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-2xl font-display font-bold text-primary">${product.price.toLocaleString()}</span>
              {product.isSale && product.originalPrice && (
                <span className="text-body-md text-on-surface-variant line-through text-lg">
                  ${product.originalPrice.toLocaleString()}
                </span>
              )}
              <div className="flex items-center gap-1 text-xs text-on-surface-variant bg-white/5 px-2.5 py-1 rounded-full font-display">
                <Star className="w-3.5 h-3.5 fill-primary text-primary" />
                <span>{averageRating} Rating</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="glass-level-1 p-5 rounded-2xl border border-border shadow-xl text-sm leading-relaxed text-on-surface-variant">
            {product.description}
          </div>

          {/* Config Selectors */}
          <div className="space-y-6">
            {/* Color Selector */}
            <div className="space-y-3">
              <span className="text-xs font-display font-bold text-on-surface-variant mb-2 block">
                Color: {selectedColor}
              </span>
              <div className="flex gap-3">
                {product.colors.map((color) => {
                  const isSelected = selectedColor === color.name;
                  return (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                      className={`w-9 h-9 rounded-full relative transition-all border border-white/10 ${isSelected
                        ? 'ring-2 ring-primary ring-offset-2 ring-offset-white dark:ring-offset-[#10131a]'
                        : 'hover:scale-105'
                        }`}
                    >
                      {isSelected && (
                        <Check className="w-4 h-4 absolute inset-0 m-auto text-white mix-blend-difference" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Size Selector */}
            {product.sizes[0] !== 'One Size' && (
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs font-display font-bold">
                  <span className="text-on-surface-variant">Size: {selectedSize}</span>
                  <button className="text-primary underline underline-offset-4">Size Guide</button>
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {product.sizes.map((size) => {
                     const isSelected = selectedSize === size;
                     return (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`py-2 rounded-xl text-xs font-display font-semibold border transition-all ${isSelected
                          ? 'bg-primary text-on-primary border-primary font-bold'
                          : 'glass-level-1 border-slate-200 dark:border-white/10 text-on-surface hover:bg-slate-100 dark:hover:bg-white/5'
                          }`}
                      >
                        {size}
                      </button>
                     );
                  })}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="space-y-3">
              <span className="text-xs font-display font-bold text-on-surface-variant mb-2 block">
                Quantity
              </span>
              <div className="flex items-center glass-level-1 border border-slate-200 dark:border-white/10 rounded-full w-max p-1">
                <button
                  onClick={() => setQuantity((q) => Math.max(q - 1, 1))}
                  className="w-10 h-10 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-white/5 rounded-full text-on-surface transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-5 font-display font-bold text-sm">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => Math.min(5, q + 1))}
                  disabled={quantity >= 5}
                  className="w-10 h-10 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed rounded-full text-on-surface transition-colors"
                >
                  <span className="text-base font-semibold">+</span>
                </button>
              </div>
              {quantity >= 5 && (
                <p className="text-[10px] text-primary font-bold animate-pulse mt-1">
                  Maximum order limit of 5 units reached
                </p>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={handleAddToBag}
                className="bg-transparent border border-border text-on-surface hover:bg-on-surface/5 w-full py-3.5 rounded-full font-display font-bold text-sm transition-all duration-300 transform active:scale-98 flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" /> Add to Bag
              </button>
              <button
                onClick={handleBuyNow}
                className="accent-gradient w-full py-3.5 rounded-full font-display font-bold text-sm text-white shadow-[0_0_20px_rgba(77,142,255,0.3)] hover:shadow-[0_0_30px_rgba(77,142,255,0.5)] transition-all duration-300 transform active:scale-98 flex items-center justify-center gap-2"
              >
                Buy Now
              </button>
            </div>
            <button
              onClick={() => setIsReserveModalOpen(true)}
              className="w-full py-3.5 rounded-full border border-primary/20 text-primary hover:bg-primary/5 font-display font-bold text-sm transition-all duration-300 active:scale-98 flex items-center justify-center gap-2"
            >
              Reserve in Store
            </button>
          </div>

          {/* Social Share Section */}
          <div className="border-t border-border pt-6 mt-6 space-y-3">
            <span className="text-xs font-semibold text-on-surface-variant flex items-center gap-1.5 justify-center sm:justify-start">
              <Share2 className="w-4 h-4 text-primary" /> Share this piece
            </span>
            <div className="flex gap-2.5 justify-center sm:justify-start">
              <button
                onClick={() => {
                  window.open(`https://twitter.com/intent/tweet?text=Check out the ${product.name} on Aetheria Luxe!&url=${encodeURIComponent(window.location.href)}`, '_blank');
                }}
                className="w-9 h-9 rounded-full glass-level-1 border border-border flex items-center justify-center hover:text-primary transition-all text-on-surface-variant"
                title="Share on Twitter"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </button>
              <button
                onClick={() => {
                  window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank');
                }}
                className="w-9 h-9 rounded-full glass-level-1 border border-border flex items-center justify-center hover:text-primary transition-all text-on-surface-variant"
                title="Share on Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.8c4.56-.93 8-4.96 8-9.8z"/>
                </svg>
              </button>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  showToast('Link copied to clipboard!', 'success');
                }}
                className="w-9 h-9 rounded-full glass-level-1 border border-border flex items-center justify-center hover:text-primary transition-all text-on-surface-variant"
                title="Copy product link"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Accordion Lists */}
          <div className="border-t border-slate-200 dark:border-white/10 pt-4">
            {/* Specs */}
            <div className="border-b border-slate-200 dark:border-white/10">
              <button
                onClick={() => toggleAccordion('specs')}
                className="w-full py-4 flex justify-between items-center text-left hover:text-primary transition-colors group"
              >
                <span className="font-display text-xs font-bold text-on-surface group-hover:text-primary">
                  Product Specifications
                </span>
                <ChevronDown className={`w-4 h-4 text-on-surface-variant transition-transform ${openAccordions.specs ? 'rotate-180 text-primary' : ''}`} />
              </button>
              <AnimatePresence>
                {openAccordions.specs && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <ul className="pb-5 pl-4 list-disc text-xs text-on-surface-variant space-y-2 leading-relaxed">
                      {product.details.map((detail, idx) => (
                        <li key={idx}>{detail}</li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Sustainability */}
            {product.sustainability && product.sustainability.length > 0 && (
              <div className="border-b border-slate-200 dark:border-white/10">
                <button
                  onClick={() => toggleAccordion('sustainability')}
                  className="w-full py-4 flex justify-between items-center text-left hover:text-primary transition-colors group"
                >
                  <span className="font-display text-xs font-bold text-on-surface group-hover:text-primary">
                    Sustainability & Impact
                  </span>
                  <ChevronDown className={`w-4 h-4 text-on-surface-variant transition-transform ${openAccordions.sustainability ? 'rotate-180 text-primary' : ''}`} />
                </button>
                <AnimatePresence>
                  {openAccordions.sustainability && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <ul className="pb-5 pl-4 list-disc text-xs text-on-surface-variant space-y-2 leading-relaxed">
                        {product.sustainability.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* Delivery */}
            <div className="border-b border-slate-200 dark:border-white/10">
              <button
                onClick={() => toggleAccordion('delivery')}
                className="w-full py-4 flex justify-between items-center text-left hover:text-primary transition-colors group"
              >
                <span className="font-display text-xs font-bold text-on-surface group-hover:text-primary">
                  Delivery & Returns
                </span>
                <ChevronDown className={`w-4 h-4 text-on-surface-variant transition-transform ${openAccordions.delivery ? 'rotate-180 text-primary' : ''}`} />
              </button>
              <AnimatePresence>
                {openAccordions.delivery && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="pb-5 text-xs text-on-surface-variant leading-relaxed">
                      {product.shippingInfo || 'Complimentary express delivery in signature Aetheria Luxe packaging. Fully insured and tracked in real-time. Secure returns are accepted within 30 days of shipment receipt.'}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <section className="w-full border-t border-slate-200 dark:border-white/10 pt-16 mt-16 md:mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* Summary Column */}
          <div className="lg:col-span-4 space-y-6">
            <h2 className="font-display font-extrabold text-2xl tracking-tight text-on-surface">
              Customer Reviews
            </h2>

            <div className="glass-level-1 p-6 rounded-3xl border border-slate-200 dark:border-white/5 space-y-6">
              <div className="flex items-center gap-4">
                <span className="text-5xl font-display font-black text-primary">{averageRating}</span>
                <div>
                  <div className="flex gap-0.5 text-primary">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < Math.round(averageRating) ? 'fill-primary' : 'text-slate-200 dark:text-white/10'}`} />
                    ))}
                  </div>
                  <p className="text-xs text-on-surface-variant mt-1">Based on {reviews.length} reviews</p>
                </div>
              </div>

              {/* Progress Bars */}
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((stars) => {
                  const count = reviews.filter(r => r.rating === stars).length;
                  const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
                  return (
                    <div key={stars} className="flex items-center gap-3 text-xs text-on-surface-variant">
                      <span className="w-3 font-semibold">{stars}</span>
                      <Star className="w-3.5 h-3.5 text-primary fill-primary shrink-0" />
                      <div className="flex-grow h-1.5 bg-slate-200 dark:bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: `${percentage}%` }}></div>
                      </div>
                      <span className="w-8 text-right text-[10px] text-on-surface-variant/60">{count}</span>
                    </div>
                  );
                })}
              </div>

              {/* Write Review Button */}
              <button
                onClick={() => setShowReviewForm(!showReviewForm)}
                className="w-full py-3 rounded-full border border-slate-250 dark:border-white/10 hover:border-slate-350 dark:hover:border-white/20 text-xs font-display font-bold text-on-surface hover:bg-slate-100 dark:hover:bg-white/2 hover:text-primary transition-all duration-300 cursor-pointer"
              >
                {showReviewForm ? 'Cancel Review' : 'Write a Review'}
              </button>
            </div>
          </div>

          {/* Reviews List & Form Column */}
          <div className="lg:col-span-8 space-y-6">
            <AnimatePresence>
              {showReviewForm && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <form onSubmit={handleReviewSubmit} className="glass-level-2 p-6 rounded-3xl border border-slate-200 dark:border-white/10 space-y-4 mb-6">
                    <h3 className="font-display font-bold text-sm tracking-wider text-on-surface">
                      Share Your Experience
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold tracking-wider text-on-surface-variant">Your Name</label>
                        <input
                          type="text"
                          required
                          value={newReview.name}
                          onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                          placeholder="e.g. Alexander M."
                          className="w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-xs text-on-surface focus:outline-none focus:border-primary"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold tracking-wider text-on-surface-variant">Rating</label>
                        <div className="flex gap-1.5 h-[38px] items-center">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              type="button"
                              key={star}
                              onClick={() => setNewReview({ ...newReview, rating: star })}
                              className="text-primary hover:scale-110 transition-transform cursor-pointer"
                            >
                              <Star className={`w-5 h-5 ${star <= newReview.rating ? 'fill-primary' : 'text-slate-200 dark:text-white/10'}`} />
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold tracking-wider text-on-surface-variant">Review Headline</label>
                      <input
                        type="text"
                        required
                        value={newReview.headline}
                        onChange={(e) => setNewReview({ ...newReview, headline: e.target.value })}
                        placeholder="e.g. Absolutely gorgeous cut!"
                        className="w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-xs text-on-surface focus:outline-none focus:border-primary"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold tracking-wider text-on-surface-variant">Review Details</label>
                      <textarea
                        required
                        rows={4}
                        value={newReview.comment}
                        onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                        placeholder="What did you like or dislike? How does the fabric feel?"
                        className="w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-xs text-on-surface focus:outline-none focus:border-primary resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="bg-primary text-on-primary hover:bg-primary-container font-display font-extrabold text-[10px] tracking-widest py-3 px-6 rounded-full btn-primary-glow transition-all cursor-pointer"
                    >
                      Submit Review
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Review Listings */}
            <div className="space-y-4">
              {reviews.length === 0 ? (
                <p className="text-sm text-on-surface-variant/60 italic text-center py-8">No reviews yet. Be the first to review this product!</p>
              ) : (
                reviews.map((review) => (
                  <div key={review.id} className="glass-level-1 p-6 rounded-3xl border border-slate-200 dark:border-white/5 space-y-3">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-on-surface">{review.name}</span>
                          {review.verified && (
                            <span className="text-[9px] bg-primary/10 border border-primary/20 text-primary px-2 py-0.5 rounded-full font-bold tracking-wider font-display">
                              Verified Buyer
                            </span>
                          )}
                        </div>
                        <div className="flex gap-0.5 text-primary">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'fill-primary' : 'text-slate-200 dark:text-white/10'}`} />
                          ))}
                        </div>
                      </div>
                      <span className="text-[10px] text-on-surface-variant/40 font-display">{review.date}</span>
                    </div>

                    <div className="space-y-1">
                      <h4 className="text-xs sm:text-sm font-bold text-on-surface">
                        {review.headline}
                      </h4>
                      <p className="text-xs text-on-surface-variant leading-relaxed font-body">
                        {review.comment}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      </section>

      {/* Recommendations Slider */}
      <section className="w-full pt-16 md:pt-32">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-10">
            <div>
              <span className="text-[10px] text-primary font-bold tracking-[0.2em] mb-1.5 block">Complete the look</span>
              <h2 className="font-display font-extrabold text-2xl tracking-tight text-on-surface">You May Also Like</h2>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {recommendations.map((item) => (
              <div key={item.id} className="group cursor-pointer relative">
                <Link to={`/product/${item.id}`} className="space-y-4">
                  <div className="aspect-[4/5] overflow-hidden rounded-2xl glass-level-1 relative group shadow-lg border border-border hover:border-on-surface/20 transition-all duration-300">
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      className="w-full h-full object-cover rounded-2xl transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-body-md font-semibold text-on-surface group-hover:text-primary transition-colors truncate">
                      {item.name}
                    </h3>
                    <p className="text-xs font-display font-semibold text-primary">
                      ${item.price.toLocaleString()}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile Sticky Bottom Bar */}
      <AnimatePresence>
        {showStickyBar && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 z-[400] lg:hidden bg-background/80 backdrop-blur-md border-t border-border p-4 shadow-[0_-8px_30px_rgba(0,0,0,0.08)]"
          >
            <div className="flex items-center justify-between gap-4 max-w-7xl mx-auto">
              <div className="min-w-0">
                <h4 className="text-xs font-bold text-on-surface truncate">{product.name}</h4>
                <p className="text-sm font-display font-black text-primary">${product.price.toLocaleString()}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={handleAddToBag}
                  className="bg-transparent border border-border text-on-surface px-4 py-2 rounded-full font-display font-bold text-xs active:scale-95 transition-all"
                >
                  Bag
                </button>
                <button
                  onClick={handleBuyNow}
                  className="accent-gradient text-white px-5 py-2 rounded-full font-display font-bold text-xs active:scale-95 transition-all shadow-md"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>


      {/* Showroom Reservation Modal */}
      <AnimatePresence>
        {isReserveModalOpen && (
          <div
            className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-background/60 backdrop-blur-md overflow-y-auto"
            onClick={(e) => {
              if (e.target === e.currentTarget) setIsReserveModalOpen(false);
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md dropdown-glass rounded-3xl overflow-hidden border border-border p-6 md:p-8 bg-surface space-y-6 shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsReserveModalOpen(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center hover:bg-surface-container transition-colors text-on-surface cursor-pointer border border-transparent hover:border-border"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-2">
                <span className="text-[10px] font-bold tracking-widest text-primary flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" /> Physical Reservation
                </span>
                <h3 className="text-xl font-display font-extrabold text-on-surface tracking-tight">
                  Reserve in Showroom
                </h3>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Select a showroom location to hold this luxury item. We will secure it for you for 48 hours. No upfront payment required.
                </p>
              </div>

              <form onSubmit={handleReserveSubmit} className="space-y-4 pt-2">
                {/* Showroom Selection */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold tracking-wider text-on-surface-variant block">Select Store Location</label>
                  <div className="space-y-2.5">
                    {showrooms.map((showroom) => {
                      const isSelected = selectedShowroom === showroom.id;
                      return (
                        <div
                          key={showroom.id}
                          onClick={() => setSelectedShowroom(showroom.id)}
                          className={`p-3.5 rounded-2xl border transition-all cursor-pointer relative flex flex-col gap-1 ${
                            isSelected
                              ? 'bg-surface-container border-primary shadow-lg ring-1 ring-primary/20'
                              : 'bg-white/5 hover:bg-white/10 border-slate-200 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/15'
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <span className="font-display font-bold text-xs text-on-surface flex items-center gap-1.5">
                              {showroom.name}
                              {isSelected && <Check className="w-3.5 h-3.5 text-primary" />}
                            </span>
                          </div>
                          <p className="text-[10px] text-on-surface-variant leading-relaxed">{showroom.address}</p>
                          <span className="text-[9px] text-on-surface-variant/60 font-semibold mt-1">Hours: {showroom.hours}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Contact Information */}
                <div className="grid grid-cols-1 gap-3.5 pt-2">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold tracking-wider text-on-surface-variant">Your Name</label>
                    <input
                      type="text"
                      required
                      value={reserveName}
                      onChange={(e) => setReserveName(e.target.value)}
                      placeholder="e.g. Alexander Mercer"
                      className="w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-xs text-on-surface focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold tracking-wider text-on-surface-variant">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={reservePhone}
                      onChange={(e) => setReservePhone(e.target.value)}
                      placeholder="e.g. +1 (555) 019-2834"
                      className="w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-xs text-on-surface focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-primary text-on-primary font-display text-xs font-bold rounded-full btn-primary-glow hover:scale-[1.02] active:scale-95 transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer mt-4"
                >
                  Confirm Showroom Reservation
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
};
export default ProductDetail;
