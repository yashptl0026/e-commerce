import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ShoppingBag, ChevronRight, Minus, ChevronDown, Check, Star } from 'lucide-react';
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


  const product = useMemo(() => products.find((p) => p.id === id), [products, id]);

  // Active Selections
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);

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

  const handleReserve = () => {
    showToast(`Zenith Reservation: 1x ${product.name} (${selectedColor} / ${selectedSize}) reserved successfully at Aetheria Soho store desk!`, 'success');
  };

  const toggleAccordion = (section: string) => {
    setOpenAccordions((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // Get similar products for recommendation
  const recommendations = products.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <main className="flex-grow pt-20 pb-16 md:pt-28 md:pb-24 px-4 md:px-6 max-w-7xl mx-auto w-full">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-on-surface-variant font-display font-medium tracking-widest uppercase mb-10 overflow-x-auto whitespace-nowrap scrollbar-none">
        <Link to="/" className="hover:text-primary transition-colors">Home</Link>
        <ChevronRight className="w-3 h-3 text-on-surface-variant/40" />
        <Link to="/collection" className="hover:text-primary transition-colors">Collections</Link>
        <ChevronRight className="w-3 h-3 text-on-surface-variant/40" />
        <Link to={`/collection?category=${product.category}`} className="hover:text-primary transition-colors">
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
            className="aspect-[4/5] overflow-hidden rounded-2xl glass-level-1 border border-border relative group"
          >
            <img
              src={product.images[activeImageIdx] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover rounded-2xl transition-transform duration-700 group-hover:scale-105"
            />
            {product.isNew && (
              <span className="absolute top-4 left-4 accent-gradient text-white px-3 py-1 rounded text-xs font-bold tracking-widest uppercase shadow-lg z-10">
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
                  className={`aspect-[4/5] rounded-xl overflow-hidden glass-level-1 border transition-all ${
                    activeImageIdx === idx ? 'border-primary ring-2 ring-primary/20 scale-102' : 'border-border hover:border-on-surface/20'
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
            <span className="text-xs tracking-[0.2em] font-semibold text-primary uppercase">Aetheria Luxury System</span>
            <div className="flex justify-between items-start gap-4">
              <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-on-surface leading-tight">
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
              <span className="text-xs font-display font-bold uppercase tracking-wider text-on-surface-variant">
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
                          ? 'ring-2 ring-primary ring-offset-2 ring-offset-[#10131a] scale-110'
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
                <div className="flex justify-between items-center text-xs font-display font-bold uppercase tracking-wider">
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
                            : 'glass-level-1 border-white/10 text-on-surface hover:bg-white/5'
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
              <span className="text-xs font-display font-bold uppercase tracking-wider text-on-surface-variant">
                Quantity
              </span>
              <div className="flex items-center glass-level-1 border border-white/10 rounded-full w-max p-1">
                <button
                  onClick={() => setQuantity((q) => Math.max(q - 1, 1))}
                  className="w-10 h-10 flex items-center justify-center hover:bg-white/5 rounded-full text-on-surface transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-5 font-display font-bold text-sm">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-10 h-10 flex items-center justify-center hover:bg-white/5 rounded-full text-on-surface transition-colors"
                >
                  <span className="text-base font-semibold">+</span>
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3.5 pt-4">
            <button
              onClick={handleAddToBag}
              className="accent-gradient w-full py-4 rounded-full font-display font-extrabold text-sm text-white shadow-[0_0_20px_rgba(77,142,255,0.3)] hover:shadow-[0_0_30px_rgba(77,142,255,0.5)] transition-all duration-300 transform active:scale-98 flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4.5 h-4.5" /> ADD TO BAG
            </button>
            <button
              onClick={handleReserve}
              className="w-full py-4 rounded-full border border-white/20 font-display font-extrabold text-sm text-white hover:bg-white/5 transition-all duration-300 backdrop-blur-md active:scale-98"
            >
              RESERVE IN STORE
            </button>
          </div>

          {/* Accordion Lists */}
          <div className="border-t border-white/10 pt-4">
            {/* Specs */}
            <div className="border-b border-white/10">
              <button
                onClick={() => toggleAccordion('specs')}
                className="w-full py-4 flex justify-between items-center text-left hover:text-primary transition-colors group"
              >
                <span className="font-display text-xs font-extrabold uppercase tracking-widest text-on-surface group-hover:text-primary">
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
              <div className="border-b border-white/10">
                <button
                  onClick={() => toggleAccordion('sustainability')}
                  className="w-full py-4 flex justify-between items-center text-left hover:text-primary transition-colors group"
                >
                  <span className="font-display text-xs font-extrabold uppercase tracking-widest text-on-surface group-hover:text-primary">
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
            <div className="border-b border-white/10">
              <button
                onClick={() => toggleAccordion('delivery')}
                className="w-full py-4 flex justify-between items-center text-left hover:text-primary transition-colors group"
              >
                <span className="font-display text-xs font-extrabold uppercase tracking-widest text-on-surface group-hover:text-primary">
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
      <section className="w-full border-t border-white/5 pt-16 mt-16 md:mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* Summary Column */}
          <div className="lg:col-span-4 space-y-6">
            <h2 className="font-display font-extrabold text-2xl uppercase tracking-tight text-on-surface">
              Customer Reviews
            </h2>

            <div className="glass-level-1 p-6 rounded-3xl border border-white/5 space-y-6">
              <div className="flex items-center gap-4">
                <span className="text-5xl font-display font-black text-primary">{averageRating}</span>
                <div>
                  <div className="flex gap-0.5 text-primary">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < Math.round(averageRating) ? 'fill-primary' : 'text-white/10'}`} />
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
                      <div className="flex-grow h-1.5 bg-white/5 rounded-full overflow-hidden">
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
                className="w-full py-3 rounded-full border border-white/10 hover:border-white/20 text-xs font-display font-bold uppercase tracking-wider text-on-surface hover:bg-white/2 hover:text-primary transition-all duration-300 cursor-pointer"
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
                  <form onSubmit={handleReviewSubmit} className="glass-level-2 p-6 rounded-3xl border border-white/10 space-y-4 mb-6">
                    <h3 className="font-display font-bold text-sm uppercase tracking-wider text-on-surface">
                      Share Your Experience
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase font-bold tracking-wider text-on-surface-variant">Your Name</label>
                        <input
                          type="text"
                          required
                          value={newReview.name}
                          onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                          placeholder="e.g. Alexander M."
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-on-surface focus:outline-none focus:border-primary"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase font-bold tracking-wider text-on-surface-variant">Rating</label>
                        <div className="flex gap-1.5 h-[38px] items-center">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              type="button"
                              key={star}
                              onClick={() => setNewReview({ ...newReview, rating: star })}
                              className="text-primary hover:scale-110 transition-transform cursor-pointer"
                            >
                              <Star className={`w-5 h-5 ${star <= newReview.rating ? 'fill-primary' : 'text-white/10'}`} />
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase font-bold tracking-wider text-on-surface-variant">Review Headline</label>
                      <input
                        type="text"
                        required
                        value={newReview.headline}
                        onChange={(e) => setNewReview({ ...newReview, headline: e.target.value })}
                        placeholder="e.g. Absolutely gorgeous cut!"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-on-surface focus:outline-none focus:border-primary"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase font-bold tracking-wider text-on-surface-variant">Review Details</label>
                      <textarea
                        required
                        rows={4}
                        value={newReview.comment}
                        onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                        placeholder="What did you like or dislike? How does the fabric feel?"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-on-surface focus:outline-none focus:border-primary resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="bg-primary text-on-primary hover:bg-primary-container font-display font-extrabold text-[10px] uppercase tracking-widest py-3 px-6 rounded-full btn-primary-glow transition-all cursor-pointer"
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
                  <div key={review.id} className="glass-level-1 p-6 rounded-3xl border border-white/5 space-y-3">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-on-surface">{review.name}</span>
                          {review.verified && (
                            <span className="text-[9px] bg-primary/10 border border-primary/20 text-primary px-2 py-0.5 rounded-full font-bold uppercase tracking-wider font-display">
                              Verified Buyer
                            </span>
                          )}
                        </div>
                        <div className="flex gap-0.5 text-primary">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'fill-primary' : 'text-white/10'}`} />
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
      <section className="w-full bg-surface-container-lowest border-t border-border py-12 md:py-24 mt-16 md:mt-32">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex justify-between items-end mb-10">
            <div>
              <span className="text-[10px] text-primary uppercase font-bold tracking-[0.2em] mb-1.5 block">Complete the look</span>
              <h2 className="font-display font-extrabold text-2xl uppercase tracking-tight text-on-surface">You May Also Like</h2>
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
    </main>
  );
};
export default ProductDetail;
