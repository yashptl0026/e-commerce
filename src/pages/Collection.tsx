import React, { useState, useEffect, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, ChevronDown, RefreshCw } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';

export const Collection: React.FC = () => {
  const { products } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();

  // URL query params
  const categoryParam = searchParams.get('category');
  const searchParam = searchParams.get('search');
  const filterParam = searchParams.get('filter'); // e.g. 'sale'

  // Filter States
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(3000);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string>('latest');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);

  // Sync category state with query params
  useEffect(() => {
    if (categoryParam) {
      setSelectedCategories([categoryParam]);
    } else {
      setSelectedCategories([]);
    }
    setCurrentPage(1);
  }, [categoryParam]);

  // Handle reset filters
  const handleClearFilters = () => {
    setSelectedCategories([]);
    setMaxPrice(3000);
    setSelectedColor(null);
    setSelectedSize(null);
    setSearchParams({});
    setCurrentPage(1);
  };

  // Toggle Category selection
  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) => {
      const next = prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category];
      
      // Update Search Params
      if (next.length === 1) {
        searchParams.set('category', next[0]);
      } else {
        searchParams.delete('category');
      }
      setSearchParams(searchParams);
      return next;
    });
    setCurrentPage(1);
  };

  // Color options
  const colorOptions = [
    { name: 'Black', hex: '#1C1917' },
    { name: 'Grey / Slate', hex: '#64748B' },
    { name: 'Blue / Navy', hex: '#1E3A8A' },
    { name: 'White / Silver', hex: '#F8FAFC' },
    { name: 'Cyan', hex: '#06B6D4' }
  ];

  // Size options
  const sizeOptions = ['XS', 'S', 'M', 'L', 'XL', 'One Size'];

  // Count items per category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { fashion: 0, electronics: 0, accessories: 0, decor: 0 };
    products.forEach((p) => {
      if (counts[p.category] !== undefined) {
        counts[p.category]++;
      }
    });
    return counts;
  }, [products]);

  // Filtered and Sorted Products
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        // Search Term Match
        if (searchParam) {
          const q = searchParam.toLowerCase();
          const matchName = product.name.toLowerCase().includes(q);
          const matchDesc = product.description.toLowerCase().includes(q);
          const matchCat = product.category.toLowerCase().includes(q);
          const matchSub = product.subCategory?.toLowerCase().includes(q);
          if (!matchName && !matchDesc && !matchCat && !matchSub) return false;
        }

        // Category Filter
        if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) {
          return false;
        }

        // Price Filter
        if (product.price > maxPrice) {
          return false;
        }

        // Sale Filter
        if (filterParam === 'sale' && !product.isSale) {
          return false;
        }

        // Color Filter
        if (selectedColor) {
          const colorKey = selectedColor.split(' ')[0].toLowerCase(); // e.g. 'black', 'grey'
          const hasColor = product.colors.some((c) =>
            c.name.toLowerCase().includes(colorKey) ||
            c.hex.toLowerCase().includes(colorKey)
          );
          if (!hasColor) return false;
        }

        // Size Filter
        if (selectedSize && !product.sizes.includes(selectedSize)) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        // Default 'latest' (mock sorting using IDs/IsNew)
        if (a.isNew && !b.isNew) return -1;
        if (!a.isNew && b.isNew) return 1;
        return 0;
      });
  }, [products, searchParam, selectedCategories, maxPrice, filterParam, selectedColor, selectedSize, sortBy]);

  // Pagination Configuration
  const itemsPerPage = 6;
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = useMemo(() => {
    const startIdx = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(startIdx, startIdx + itemsPerPage);
  }, [filteredProducts, currentPage, itemsPerPage]);

  return (
    <main className="flex-grow pt-24 pb-16 md:pt-32 md:pb-24 px-4 md:px-6 max-w-7xl mx-auto w-full">
      {/* Header Banner */}
      <header className="mb-12 space-y-6">
        <nav className="flex items-center gap-2 text-xs text-on-surface-variant font-display font-medium tracking-widest uppercase">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span className="text-on-surface-variant/40">/</span>
          <span className="text-primary">Collections</span>
          {searchParam && (
            <>
              <span className="text-on-surface-variant/40">/</span>
              <span className="text-on-surface-variant">Search: "{searchParam}"</span>
            </>
          )}
        </nav>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-on-surface tracking-tight uppercase">
              {categoryParam ? `${categoryParam} Collection` : 'Our Collection'}
            </h1>
            <p className="text-body-md text-on-surface-variant max-w-2xl mt-2 leading-relaxed text-sm sm:text-base">
              Refined essentials designed for the modern pioneer. Discover our curated selection of high-performance products tailored for aesthetics, luxury, and functionality.
            </p>
          </div>

          {/* Sort Controller */}
          <div className="flex items-center gap-3 w-full md:w-auto z-10">
            <span className="text-xs font-display font-semibold tracking-wider text-on-surface-variant uppercase whitespace-nowrap">
              Sort By:
            </span>
            <div className="relative flex-grow md:flex-grow-0 min-w-[180px]">
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full appearance-none bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors cursor-pointer text-on-surface"
              >
                <option value="latest">Latest Drops</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-on-surface-variant">
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
            {/* Mobile Filter Button */}
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden p-2.5 glass-level-1 border border-white/10 rounded-lg text-on-surface flex items-center justify-center"
            >
              <SlidersHorizontal className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-12">
        {/* Sidebar Filter - Desktop */}
        <aside className="hidden lg:block lg:col-span-3 space-y-8">
          <div className="glass-level-1 p-6 rounded-2xl space-y-6 sticky top-28 border border-white/5 shadow-xl">
            {/* Category Filter */}
            <div className="space-y-4">
              <h3 className="font-display font-bold text-sm uppercase tracking-widest text-on-surface border-b border-white/5 pb-2">
                Category
              </h3>
              <div className="space-y-3">
                {Object.keys(categoryCounts).map((cat) => (
                  <label key={cat} className="flex items-center gap-3 group cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(cat)}
                      onChange={() => handleCategoryToggle(cat)}
                      className="w-4.5 h-4.5 rounded border-white/20 bg-white/5 text-primary focus:ring-primary/40 focus:ring-offset-0 focus:outline-none cursor-pointer"
                    />
                    <span className={`text-sm transition-colors capitalize ${
                      selectedCategories.includes(cat) ? 'text-primary font-semibold' : 'text-on-surface-variant group-hover:text-on-surface'
                    }`}>
                      {cat}
                    </span>
                    <span className="ml-auto text-xs font-semibold text-on-surface-variant/40 bg-white/5 px-2 py-0.5 rounded-full font-display">
                      {categoryCounts[cat]}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="space-y-4">
              <h3 className="font-display font-bold text-sm uppercase tracking-widest text-on-surface border-b border-white/5 pb-2">
                Max Price
              </h3>
              <div className="space-y-2">
                <input
                  type="range"
                  min="100"
                  max="3000"
                  step="50"
                  value={maxPrice}
                  onChange={(e) => {
                    setMaxPrice(parseInt(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary focus:outline-none"
                />
                <div className="flex justify-between text-xs font-semibold text-on-surface-variant font-display">
                  <span>$100</span>
                  <span className="text-primary font-bold">${maxPrice.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Color Filter */}
            <div className="space-y-4">
              <h3 className="font-display font-bold text-sm uppercase tracking-widest text-on-surface border-b border-white/5 pb-2">
                Color Palette
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {colorOptions.map((color) => {
                  const isSelected = selectedColor === color.name;
                  return (
                    <button
                      key={color.name}
                      onClick={() => {
                        setSelectedColor(isSelected ? null : color.name);
                        setCurrentPage(1);
                      }}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                      className={`w-7 h-7 rounded-full transition-all relative ${
                        isSelected
                          ? 'ring-2 ring-primary ring-offset-2 ring-offset-[#10131a] scale-110'
                          : 'hover:scale-105 border border-white/10'
                      }`}
                    />
                  );
                })}
              </div>
            </div>

            {/* Size Filter */}
            <div className="space-y-4">
              <h3 className="font-display font-bold text-sm uppercase tracking-widest text-on-surface border-b border-white/5 pb-2">
                Sizes
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {sizeOptions.map((size) => {
                  const isSelected = selectedSize === size;
                  return (
                    <button
                      key={size}
                      onClick={() => {
                        setSelectedSize(isSelected ? null : size);
                        setCurrentPage(1);
                      }}
                      className={`py-1.5 rounded-lg font-display text-xs font-semibold border transition-all ${
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

            {/* Clear Button */}
            <button
              onClick={handleClearFilters}
              className="w-full py-2.5 rounded-xl font-display text-xs font-bold uppercase tracking-widest border border-white/10 text-on-surface hover:bg-white/5 transition-colors flex items-center justify-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Clear Filters
            </button>
          </div>
        </aside>

        {/* Product Grid Area */}
        <section className="lg:col-span-9 flex flex-col gap-10">
          <AnimatePresence mode="wait">
            {paginatedProducts.length > 0 ? (
              <motion.div
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6"
              >
                {paginatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-level-1 p-16 rounded-3xl text-center border border-white/5 flex flex-col items-center justify-center gap-4 my-8"
              >
                <div className="w-16 h-16 rounded-full glass-level-2 flex items-center justify-center text-primary/40 border border-white/10 mb-2">
                  <SlidersHorizontal className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-display font-semibold text-on-surface">No Products Match Your Filter</h3>
                <p className="text-on-surface-variant max-w-sm text-sm leading-relaxed">
                  Try adjusting your filter selection (price range, category checkbox, colors, sizes) or clearing all criteria.
                </p>
                <button
                  onClick={handleClearFilters}
                  className="bg-primary text-[#002e6a] font-display font-bold py-2.5 px-6 rounded-full btn-primary-glow mt-2"
                >
                  Clear All Filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-8">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                className="w-10 h-10 flex items-center justify-center rounded-lg glass-level-1 border border-white/10 text-on-surface hover:bg-white/5 transition-all disabled:opacity-30 disabled:pointer-events-none"
              >
                &larr;
              </button>
              
              {[...Array(totalPages)].map((_, i) => {
                const pageNum = i + 1;
                const isCurrent = currentPage === pageNum;
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-10 h-10 flex items-center justify-center rounded-lg font-display text-sm font-semibold border transition-all ${
                      isCurrent
                        ? 'bg-primary text-[#002e6a] border-primary font-bold'
                        : 'glass-level-1 border-white/10 text-on-surface hover:bg-white/5'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                className="w-10 h-10 flex items-center justify-center rounded-lg glass-level-1 border border-white/10 text-on-surface hover:bg-white/5 transition-all disabled:opacity-30 disabled:pointer-events-none"
              >
                &rarr;
              </button>
            </div>
          )}
        </section>
      </div>

      {/* Mobile Drawer Filter Menu Overlay */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#10131a]/80 backdrop-blur-md lg:hidden"
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="absolute inset-y-0 right-0 w-4/5 max-w-sm bg-[#10131a] border-l border-white/10 p-6 overflow-y-auto space-y-6 flex flex-col justify-between"
            >
              <div className="space-y-6">
                <div className="flex justify-between items-center pb-2 border-b border-white/10">
                  <h3 className="font-display font-extrabold text-lg text-on-surface">Filters</h3>
                  <button onClick={() => setIsMobileFilterOpen(false)} className="p-1 hover:text-primary transition-colors text-on-surface">
                    ✕
                  </button>
                </div>

                {/* Mobile Category */}
                <div className="space-y-3">
                  <h4 className="font-display font-semibold text-xs uppercase tracking-widest text-on-surface-variant">Category</h4>
                  {Object.keys(categoryCounts).map((cat) => (
                    <label key={cat} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(cat)}
                        onChange={() => handleCategoryToggle(cat)}
                        className="w-4.5 h-4.5 rounded border-white/20 bg-white/5 text-primary"
                      />
                      <span className={`text-sm capitalize ${selectedCategories.includes(cat) ? 'text-primary' : 'text-on-surface-variant'}`}>
                        {cat}
                      </span>
                    </label>
                  ))}
                </div>

                {/* Mobile Price */}
                <div className="space-y-3">
                  <h4 className="font-display font-semibold text-xs uppercase tracking-widest text-on-surface-variant">Max Price</h4>
                  <input
                    type="range"
                    min="100"
                    max="3000"
                    step="50"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                    className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                  <div className="flex justify-between text-xs font-semibold text-on-surface-variant font-display">
                    <span>$100</span>
                    <span className="text-primary font-bold">${maxPrice.toLocaleString()}</span>
                  </div>
                </div>

                {/* Mobile Color */}
                <div className="space-y-3">
                  <h4 className="font-display font-semibold text-xs uppercase tracking-widest text-on-surface-variant">Color</h4>
                  <div className="flex flex-wrap gap-2">
                    {colorOptions.map((color) => {
                      const isSelected = selectedColor === color.name;
                      return (
                        <button
                          key={color.name}
                          onClick={() => setSelectedColor(isSelected ? null : color.name)}
                          style={{ backgroundColor: color.hex }}
                          className={`w-7 h-7 rounded-full border border-white/10 relative ${
                            isSelected ? 'ring-2 ring-primary ring-offset-2 ring-offset-[#10131a] scale-110' : ''
                          }`}
                        />
                      );
                    })}
                  </div>
                </div>

                {/* Mobile Sizes */}
                <div className="space-y-3">
                  <h4 className="font-display font-semibold text-xs uppercase tracking-widest text-on-surface-variant">Sizes</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {sizeOptions.map((size) => {
                      const isSelected = selectedSize === size;
                      return (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(isSelected ? null : size)}
                          className={`py-1.5 rounded-lg font-display text-xs border ${
                            isSelected ? 'bg-primary text-[#002e6a] border-primary font-bold' : 'glass-level-1 border-white/10 text-on-surface'
                          }`}
                        >
                          {size}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-6 border-t border-white/10">
                <button
                  onClick={() => {
                    handleClearFilters();
                    setIsMobileFilterOpen(false);
                  }}
                  className="w-full py-2.5 rounded-xl border border-white/10 text-on-surface text-sm font-semibold"
                >
                  Clear All
                </button>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="w-full py-2.5 bg-primary text-[#002e6a] rounded-xl text-sm font-bold shadow-lg"
                >
                  Apply Filters
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};
export default Collection;
