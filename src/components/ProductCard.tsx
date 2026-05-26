import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import type { Product } from '../types';
import { useApp } from '../context/AppContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { wishlist, toggleWishlist, addToCart } = useApp();
  const isWishlisted = wishlist.includes(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Quick Add adds the first color and size available
    const defaultColor = product.colors[0]?.name || 'Default';
    const defaultSize = product.sizes[0] || 'Default';
    addToCart(product, 1, defaultColor, defaultSize);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <Link to={`/product/${product.id}`} className="block group">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5 }}
        className="glass-level-1 rounded-2xl p-3 sm:p-4 flex flex-col gap-3 sm:gap-4 card-hover overflow-hidden relative"
      >
        {/* Image Frame */}
        <div className="relative aspect-square rounded-xl overflow-hidden bg-surface-container img-zoom">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700"
          />

          {/* Badges */}
          <div className="absolute top-2 left-2 sm:top-3 sm:left-3 flex flex-col gap-1 z-10">
            {product.isNew && (
              <span className="accent-gradient text-white px-2 py-0.5 sm:px-2.5 sm:py-1 rounded text-[9px] sm:text-[10px] font-bold tracking-widest uppercase shadow-lg">
                New
              </span>
            )}
            {product.isSale && product.originalPrice && (
              <span className="bg-error/20 text-error px-2 py-0.5 sm:px-2.5 sm:py-1 rounded text-[9px] sm:text-[10px] font-bold tracking-widest uppercase border border-error/30">
                -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={handleWishlistToggle}
            className={`absolute top-2 right-2 sm:top-3 sm:right-3 p-1.5 sm:p-2 rounded-full glass-level-2 z-10 hover:scale-110 active:scale-95 transition-all ${
              isWishlisted ? 'text-primary' : 'text-on-surface hover:text-primary'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isWishlisted ? 'fill-primary' : ''}`} />
          </button>

          {/* Quick Add Overlay */}
          <div className="absolute inset-x-0 bottom-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-10 hidden sm:block">
            <button
              onClick={handleQuickAdd}
              className="w-full accent-gradient py-2.5 rounded-lg font-display text-[12px] font-bold text-white flex items-center justify-center gap-1.5 shadow-xl hover:shadow-[0_0_15px_rgba(77,142,255,0.4)] transition-all"
            >
              <ShoppingBag className="w-4 h-4" />
              QUICK ADD
            </button>
          </div>
        </div>

        {/* Details */}
        <div className="flex-grow flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1 text-[9px] sm:text-[11px] text-on-surface-variant uppercase tracking-wider mb-1">
              <span>{product.subCategory || product.category}</span>
              <span>•</span>
              <span className="flex items-center gap-0.5">
                <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-primary text-primary" />
                {product.rating}
              </span>
            </div>
            <h4 className="text-sm sm:text-body-lg font-semibold text-on-surface group-hover:text-primary transition-colors line-clamp-1 mb-0.5 sm:mb-1">
              {product.name}
            </h4>
          </div>
          
          <div className="flex justify-between items-center mt-1 sm:mt-2">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="text-sm sm:text-body-lg font-bold text-primary font-display">${product.price.toLocaleString()}</span>
              {product.isSale && product.originalPrice && (
                <span className="text-[11px] sm:text-body-md text-on-surface-variant line-through font-display">
                  ${product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            {/* Mobile-only Quick Add Button */}
            <button
              onClick={handleQuickAdd}
              className="sm:hidden p-1.5 bg-primary/10 text-primary border border-primary/20 rounded-full hover:bg-primary hover:text-on-primary transition-all active:scale-90"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};
export default ProductCard;
