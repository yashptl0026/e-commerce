import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ShoppingBag, ChevronRight, Minus, ChevronDown, Check, Star } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { products, wishlist, toggleWishlist, addToCart, showToast } = useApp();

  const product = useMemo(() => products.find((p) => p.id === id), [products, id]);

  // Active Selections
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);

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
      <div className="flex-grow pt-32 pb-24 text-center max-w-7xl mx-auto flex flex-col items-center justify-center gap-6">
        <h2 className="text-3xl font-display font-bold">Product Not Found</h2>
        <p className="text-on-surface-variant max-w-sm">The product item you are looking for does not exist in our catalog.</p>
        <Link to="/collection" className="bg-primary text-[#002e6a] font-display font-bold py-3 px-8 rounded-full">
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
    showToast(`Zenith Reservation: 1x ${product.name} (${selectedColor} / ${selectedSize}) reserved successfully at Lumina Soho store desk!`, 'success');
  };

  const toggleAccordion = (section: string) => {
    setOpenAccordions((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // Get similar products for recommendation
  const recommendations = products.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <main className="flex-grow pt-24 pb-16 md:pt-32 md:pb-24 px-4 md:px-6 max-w-7xl mx-auto w-full">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-on-surface-variant font-display font-medium tracking-widest uppercase mb-10 overflow-x-auto whitespace-nowrap scrollbar-none">
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
            className="aspect-[4/5] overflow-hidden rounded-2xl glass-level-1 border border-white/10 relative group"
          >
            <img
              src={product.images[activeImageIdx] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
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
                    activeImageIdx === idx ? 'border-primary ring-2 ring-primary/20 scale-102' : 'border-white/10 hover:border-white/30'
                  }`}
                >
                  <img src={img} alt={`${product.name} View ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Configurations Side */}
        <div className="lg:col-span-5 lg:sticky lg:top-32 space-y-8">
          <div className="space-y-4">
            <span className="text-xs tracking-[0.2em] font-semibold text-primary uppercase">Lumina Luxury System</span>
            <div className="flex justify-between items-start gap-4">
              <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-on-surface leading-tight">
                {product.name}
              </h1>
              {/* Wishlist Trigger */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`p-3 rounded-full glass-level-2 border border-white/10 transition-all ${
                  isWishlisted ? 'text-primary' : 'text-on-surface hover:text-primary'
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
                <span>{product.rating} Rating</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="glass-level-1 p-5 rounded-2xl border border-white/5 shadow-xl text-sm leading-relaxed text-on-surface-variant">
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
                      className={`w-9 h-9 rounded-full relative transition-all border border-white/10 ${
                        isSelected
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
                        className={`py-2 rounded-xl text-xs font-display font-semibold border transition-all ${
                          isSelected
                            ? 'bg-primary text-[#002e6a] border-primary font-bold'
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
                      {product.shippingInfo || 'Complimentary express delivery in signature Lumina Luxe packaging. Fully insured and tracked in real-time. Secure returns are accepted within 30 days of shipment receipt.'}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations Slider */}
      <section className="mt-16 md:mt-32 border-t border-white/5 pt-8 md:pt-16">
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
                <div className="aspect-[4/5] overflow-hidden rounded-2xl glass-level-1 relative group shadow-lg border border-white/5 hover:border-white/20 transition-all duration-300">
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
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
      </section>
    </main>
  );
};
export default ProductDetail;
