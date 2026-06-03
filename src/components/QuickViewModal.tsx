import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Heart, Star, Minus, Plus, Shield, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const QuickViewModal: React.FC = () => {
  const { activeQuickViewProduct, closeQuickView, addToCart, wishlist, toggleWishlist } = useApp();
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  // Reset local state when product changes
  useEffect(() => {
    if (activeQuickViewProduct) {
      setSelectedColor(activeQuickViewProduct.colors[0]?.name || 'Default');
      setSelectedSize(activeQuickViewProduct.sizes[0] || 'Default');
      setQuantity(1);
      setActiveImageIdx(0);
    }
  }, [activeQuickViewProduct]);

  if (!activeQuickViewProduct) return null;

  const isWishlisted = wishlist.includes(activeQuickViewProduct.id);

  const handleAddToCart = () => {
    addToCart(activeQuickViewProduct, quantity, selectedColor, selectedSize);
    closeQuickView();
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeQuickView();
    }
  };

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-background/60 backdrop-blur-md overflow-y-auto"
        onClick={handleOverlayClick}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 250 }}
          className="relative w-full max-w-4xl dropdown-glass rounded-3xl overflow-hidden border border-border shadow-2xl flex flex-col md:flex-row max-h-[90vh] md:max-h-[85vh] bg-surface"
        >
          {/* Close button */}
          <button
            onClick={closeQuickView}
            className="absolute top-4 right-4 z-50 w-10 h-10 flex items-center justify-center rounded-full bg-surface-container/50 border border-border hover:bg-surface-container transition-colors text-on-surface cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left Column: Images */}
          <div className="w-full md:w-1/2 p-6 flex flex-col justify-between bg-surface-container-lowest border-r border-border max-h-[40vh] md:max-h-full">
            <div className="flex-grow flex items-center justify-center overflow-hidden relative aspect-square rounded-2xl bg-surface-container max-h-[30vh] md:max-h-[350px]">
              <img
                src={activeQuickViewProduct.images[activeImageIdx]}
                alt={activeQuickViewProduct.name}
                className="w-full h-full object-contain p-2 max-h-full"
              />
              
              {/* Badges */}
              <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                {activeQuickViewProduct.isNew && (
                  <span className="accent-gradient text-white px-2.5 py-1 rounded text-[9px] font-bold tracking-wider shadow-md">
                    New
                  </span>
                )}
                {activeQuickViewProduct.isSale && activeQuickViewProduct.originalPrice && (
                  <span className="bg-error/20 text-error px-2.5 py-1 rounded text-[9px] font-bold tracking-wider border border-error/30">
                    -{Math.round(((activeQuickViewProduct.originalPrice - activeQuickViewProduct.price) / activeQuickViewProduct.originalPrice) * 100)}%
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnails list if multiple images exist */}
            {activeQuickViewProduct.images.length > 1 && (
              <div className="flex gap-2.5 overflow-x-auto overflow-y-hidden mt-4 pb-2 scrollbar-none justify-center">
                {activeQuickViewProduct.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImageIdx(i)}
                    className={`w-14 h-14 rounded-xl overflow-hidden bg-surface-container border-2 transition-all cursor-pointer ${
                      activeImageIdx === i ? 'border-primary' : 'border-transparent hover:border-border'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Product Info */}
          <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto max-h-[50vh] md:max-h-full">
            <div className="space-y-5">
              {/* Brand and category */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold tracking-[0.2em] text-primary capitalize">
                  {activeQuickViewProduct.brand || 'Aetheria'}
                </span>
                <span className="text-[10px] font-semibold tracking-wider text-on-surface-variant/60 capitalize">
                  {activeQuickViewProduct.subCategory || activeQuickViewProduct.category}
                </span>
              </div>

              {/* Title & Price */}
              <div className="space-y-1.5">
                <h2 className="text-xl sm:text-2xl font-display font-extrabold text-on-surface leading-tight">
                  {activeQuickViewProduct.name}
                </h2>
                <div className="flex items-center gap-3">
                  <span className="text-lg sm:text-xl font-bold font-display text-primary">
                    ${activeQuickViewProduct.price.toLocaleString()}
                  </span>
                  {activeQuickViewProduct.isSale && activeQuickViewProduct.originalPrice && (
                    <span className="text-sm text-on-surface-variant line-through font-display">
                      ${activeQuickViewProduct.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>

              {/* Rating stars display */}
              <div className="flex items-center gap-2 border-b border-border pb-4">
                <div className="flex text-primary">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(activeQuickViewProduct.rating)
                          ? 'fill-primary'
                          : 'text-on-surface-variant/20'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs font-semibold text-on-surface-variant font-display">
                  {activeQuickViewProduct.rating} / 5.0 Rating
                </span>
              </div>

              {/* Description */}
              <p className="text-xs text-on-surface-variant leading-relaxed">
                {activeQuickViewProduct.description}
              </p>

              {/* Colors selection */}
              {activeQuickViewProduct.colors.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[10px] font-bold tracking-wider text-on-surface-variant block">
                    Color: <span className="text-on-surface font-semibold capitalize">{selectedColor}</span>
                  </span>
                  <div className="flex gap-2">
                    {activeQuickViewProduct.colors.map((color) => {
                      const isSelected = selectedColor === color.name;
                      return (
                        <button
                          key={color.name}
                          onClick={() => setSelectedColor(color.name)}
                          style={{ backgroundColor: color.hex }}
                          title={color.name}
                          className={`w-7 h-7 rounded-full border border-border transition-all cursor-pointer relative flex items-center justify-center ${
                            isSelected ? 'ring-2 ring-primary ring-offset-2 ring-offset-surface scale-110' : 'hover:scale-105'
                          }`}
                        />
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Sizes selection */}
              {activeQuickViewProduct.sizes.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[10px] font-bold tracking-wider text-on-surface-variant block">
                    Size: <span className="text-on-surface font-semibold">{selectedSize}</span>
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {activeQuickViewProduct.sizes.map((size) => {
                      const isSelected = selectedSize === size;
                      return (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`py-1.5 px-3 rounded-lg font-display text-[10px] font-bold border transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-primary text-on-primary border-primary shadow-md'
                              : 'bg-surface-container border-border text-on-surface hover:bg-surface-container-high'
                          }`}
                        >
                          {size}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Sticky Actions area */}
            <div className="border-t border-border pt-4 mt-6 space-y-4">
              <div className="flex items-center gap-4">
                {/* Quantity adjuster */}
                <div className="flex flex-col gap-1.5 shrink-0">
                  <div className="flex items-center bg-surface-container border border-border rounded-full p-0.5">
                    <button
                      onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                      className="w-8 h-8 flex items-center justify-center hover:bg-surface-container-high rounded-full transition-colors text-on-surface-variant cursor-pointer"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 font-display font-bold text-sm text-center min-w-[24px]">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(prev => Math.min(5, prev + 1))}
                      disabled={quantity >= 5}
                      className="w-8 h-8 flex items-center justify-center hover:bg-surface-container-high disabled:opacity-30 disabled:cursor-not-allowed rounded-full transition-colors text-on-surface-variant cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  {quantity >= 5 && (
                    <span className="text-[9px] text-primary font-bold tracking-wider text-center animate-pulse">
                      Limit 5 items
                    </span>
                  )}
                </div>

                {/* Add to Cart button */}
                <button
                  onClick={handleAddToCart}
                  className="flex-grow py-3 px-6 bg-primary text-on-primary font-display text-xs font-bold tracking-wider rounded-full btn-primary-glow hover:scale-[1.02] active:scale-95 transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" /> Add to Bag
                </button>

                {/* Wishlist toggle icon */}
                <button
                  onClick={() => toggleWishlist(activeQuickViewProduct.id)}
                  className={`w-12 h-12 flex items-center justify-center rounded-full border border-border hover:bg-surface-container transition-all cursor-pointer ${
                    isWishlisted ? 'text-primary' : 'text-on-surface hover:text-primary'
                  }`}
                  aria-label="Wishlist toggle"
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-primary' : ''}`} />
                </button>
              </div>

              {/* Guarantees */}
              <div className="flex items-center justify-center gap-4 text-[10px] text-on-surface-variant/60 font-semibold tracking-wider text-center">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-primary" /> Free Express Delivery
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-primary" /> Genuine Warranty
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
