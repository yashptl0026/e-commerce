import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Heart, User, Menu, X, Search } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const NavBar: React.FC = () => {
  const { cart, wishlist } = useApp();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const totalCartItems = cart.reduce((total, item) => total + item.quantity, 0);
  const wishlistCount = wishlist.length;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/collection?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setIsSearchOpen(false);
    }
  };

  return (
    <>
      <nav className="fixed top-0 w-full z-40 bg-white/5 dark:bg-[#10131a]/5 backdrop-blur-xl border-b border-white/10 shadow-2xl h-20">
        <div className="flex justify-between items-center w-full px-4 sm:px-6 md:px-12 max-w-7xl mx-auto h-full">
          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-on-surface hover:text-primary transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Logo */}
          <Link
            to="/"
            className="text-body-lg font-display font-extrabold tracking-tighter text-on-surface text-xl md:text-2xl"
          >
            LUMINA LUXE
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex gap-8 items-center">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-label-sm font-medium transition-colors hover:text-primary pb-1 border-b-2 ${
                  isActive ? 'border-primary text-primary' : 'border-transparent text-on-surface-variant'
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/collection"
              className={({ isActive }) =>
                `text-label-sm font-medium transition-colors hover:text-primary pb-1 border-b-2 ${
                  isActive ? 'border-primary text-primary' : 'border-transparent text-on-surface-variant'
                }`
              }
            >
              Collections
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `text-label-sm font-medium transition-colors hover:text-primary pb-1 border-b-2 ${
                  isActive ? 'border-primary text-primary' : 'border-transparent text-on-surface-variant'
                }`
              }
            >
              Our Story
            </NavLink>
            <div className="relative group py-2">
              <NavLink
                to="/support"
                className={({ isActive }) =>
                  `text-label-sm font-medium transition-colors hover:text-primary pb-1 border-b-2 ${
                    isActive ? 'border-primary text-primary' : 'border-transparent text-on-surface-variant'
                  }`
                }
              >
                Support
              </NavLink>
              
              {/* Dropdown Menu */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 hidden group-hover:block w-48 glass-level-2 border border-white/10 rounded-2xl p-2 shadow-2xl z-50 before:content-[''] before:absolute before:inset-x-0 before:-top-2 before:h-2">
                <Link
                  to="/faq"
                  className="block px-4 py-2 rounded-xl text-[11px] font-display font-semibold uppercase tracking-wider text-on-surface-variant hover:text-primary hover:bg-white/5 transition-all text-left"
                >
                  FAQ Help
                </Link>
                <Link
                  to="/track-order"
                  className="block px-4 py-2 rounded-xl text-[11px] font-display font-semibold uppercase tracking-wider text-on-surface-variant hover:text-primary hover:bg-white/5 transition-all text-left"
                >
                  Track Order
                </Link>
                <Link
                  to="/contact"
                  className="block px-4 py-2 rounded-xl text-[11px] font-display font-semibold uppercase tracking-wider text-on-surface-variant hover:text-primary hover:bg-white/5 transition-all text-left"
                >
                  Contact Us
                </Link>
                <Link
                  to="/support"
                  className="block px-4 py-2 rounded-xl text-[11px] font-display font-semibold uppercase tracking-wider text-on-surface-variant hover:text-primary hover:bg-white/5 transition-all border-t border-white/5 text-left"
                >
                  Live Chat Concierge
                </Link>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Search Toggle */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-on-surface-variant hover:text-primary hover:bg-white/5 rounded-full transition-all"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Link */}
            <Link
              to="/dashboard"
              className="p-2 text-on-surface-variant hover:text-primary hover:bg-white/5 rounded-full transition-all relative hidden sm:block"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-0 right-0 bg-primary text-[#002e6a] text-[9px] font-bold h-4.5 w-4.5 rounded-full flex items-center justify-center border border-[#10131a]">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Profile Link */}
            <Link
              to="/dashboard"
              className="p-2 text-on-surface-variant hover:text-primary hover:bg-white/5 rounded-full transition-all"
            >
              <User className="w-5 h-5" />
            </Link>

            {/* Cart Link Drawer Toggle */}
            <Link
              to="/cart"
              className="p-2 bg-primary/10 text-primary hover:bg-primary/20 rounded-full flex items-center justify-center w-10 h-10 shadow-lg active:scale-95 duration-150 ease-in-out relative border border-primary/20"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalCartItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-primary text-[#002e6a] text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center shadow-lg border border-[#10131a]">
                  {totalCartItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </nav>

      {/* Slide-out Mobile Menu Backdrop & Panel */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-[#10131a]/60 backdrop-blur-sm md:hidden"
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed inset-y-0 left-0 w-4/5 max-w-sm z-50 glass-level-2 border-r border-white/10 shadow-2xl p-6 flex flex-col gap-8 md:hidden"
            >
              <div className="flex justify-between items-center">
                <span className="font-display font-extrabold tracking-tighter text-xl text-on-surface">
                  LUMINA LUXE
                </span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-on-surface hover:text-primary transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex flex-col gap-6 text-lg font-display">
                <Link
                  to="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-on-surface hover:text-primary transition-colors"
                >
                  Home
                </Link>
                <Link
                  to="/collection"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-on-surface hover:text-primary transition-colors"
                >
                  Collections
                </Link>
                <Link
                  to="/about"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-on-surface hover:text-primary transition-colors"
                >
                  Our Story
                </Link>
                <Link
                  to="/support"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-on-surface hover:text-primary transition-colors"
                >
                  Support
                </Link>
                <div className="flex flex-col gap-4 pl-4 border-l border-white/10 text-sm">
                  <Link
                    to="/faq"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-on-surface-variant hover:text-primary transition-colors"
                  >
                    FAQ Help
                  </Link>
                  <Link
                    to="/track-order"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-on-surface-variant hover:text-primary transition-colors"
                  >
                    Track Order
                  </Link>
                  <Link
                    to="/contact"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-on-surface-variant hover:text-primary transition-colors"
                  >
                    Contact Us
                  </Link>
                </div>
                <Link
                  to="/dashboard"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-on-surface hover:text-primary transition-colors flex items-center gap-2 pt-4 border-t border-white/10"
                >
                  <User className="w-5 h-5" /> Account Profile
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Floating Search Bar Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-0 w-full z-30 glass-level-2 border-b border-white/10 p-4 shadow-xl"
          >
            <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto flex items-center gap-3">
              <Search className="w-5 h-5 text-on-surface-variant" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search collection, product type, category..."
                className="flex-grow bg-transparent border-none text-on-surface text-body-md placeholder:text-on-surface-variant/50 focus:ring-0 focus:outline-none py-1"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                className="text-on-surface-variant hover:text-on-surface p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
export default NavBar;
