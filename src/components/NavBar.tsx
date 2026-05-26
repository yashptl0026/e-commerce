import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Heart, User, Menu, X, Search, Sun, Moon, Monitor, ChevronRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useTheme } from '../context/ThemeContext';

export const NavBar: React.FC = () => {
  const { cart, wishlist } = useApp();
  const { theme, setTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => {
      const next = !prev;
      if (next) {
        setIsSearchOpen(false);
        setIsProfileOpen(false);
        setIsSupportOpen(false);
      }
      return next;
    });
  };

  const toggleSearch = () => {
    setIsSearchOpen((prev) => {
      const next = !prev;
      if (next) {
        setIsMobileMenuOpen(false);
        setIsProfileOpen(false);
        setIsSupportOpen(false);
      }
      return next;
    });
  };

  const toggleProfile = () => {
    setIsProfileOpen((prev) => {
      const next = !prev;
      if (next) {
        setIsMobileMenuOpen(false);
        setIsSearchOpen(false);
        setIsSupportOpen(false);
      }
      return next;
    });
  };

  const themeOptions = [
    { id: 'light', name: 'Light', icon: Sun },
    { id: 'dark', name: 'Dark', icon: Moon },
    { id: 'system', name: 'System', icon: Monitor }
  ] as const;

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
      <nav className="fixed top-0 w-full z-50 premium-glass border-x-0 border-t-0 rounded-none shadow-2xl h-16">
        <div className="flex justify-between items-center w-full px-4 md:px-6 max-w-7xl mx-auto h-full">
          {/* Mobile Menu Toggle */}
          <button
            onClick={toggleMobileMenu}
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
          <div className="hidden md:flex gap-8 items-center h-full">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-label-sm font-medium transition-colors hover:text-primary pb-1 border-b-2 ${isActive ? 'border-primary text-primary' : 'border-transparent text-on-surface-variant'
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/collection"
              className={({ isActive }) =>
                `text-label-sm font-medium transition-colors hover:text-primary pb-1 border-b-2 ${isActive ? 'border-primary text-primary' : 'border-transparent text-on-surface-variant'
                }`
              }
            >
              Collections
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `text-label-sm font-medium transition-colors hover:text-primary pb-1 border-b-2 ${isActive ? 'border-primary text-primary' : 'border-transparent text-on-surface-variant'
                }`
              }
            >
              Our Story
            </NavLink>

            {/* Hover Support Navigation Item */}
            <div
              className="relative h-full flex items-center"
              onMouseEnter={() => {
                setIsSupportOpen(true);
                setIsProfileOpen(false);
                setIsSearchOpen(false);
              }}
              onMouseLeave={() => setIsSupportOpen(false)}
            >
              <NavLink
                to="/support"
                className={({ isActive }) =>
                  `text-label-sm font-medium transition-colors hover:text-primary pb-1 border-b-2 ${isActive ? 'border-primary text-primary' : 'border-transparent text-on-surface-variant'
                  }`
                }
              >
                Support
              </NavLink>

              <AnimatePresence>
                {isSupportOpen && (
                  <>
                    {/* Invisible backdrop to detect click outside */}
                    <div
                      className="fixed inset-0 z-40 cursor-default"
                      onClick={() => setIsSupportOpen(false)}
                    />

                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 dropdown-glass rounded-2xl p-2 shadow-2xl z-50 before:content-[''] before:absolute before:inset-x-0 before:-top-3 before:h-3"
                    >
                      <Link
                        to="/faq"
                        onClick={() => setIsSupportOpen(false)}
                        className="block px-4 py-2 rounded-xl text-[11px] font-display font-semibold uppercase tracking-wider text-on-surface-variant hover:text-primary hover:bg-white/5 transition-all text-left"
                      >
                        FAQ Help
                      </Link>
                      <Link
                        to="/track-order"
                        onClick={() => setIsSupportOpen(false)}
                        className="block px-4 py-2 rounded-xl text-[11px] font-display font-semibold uppercase tracking-wider text-on-surface-variant hover:text-primary hover:bg-white/5 transition-all text-left"
                      >
                        Track Order
                      </Link>
                      <Link
                        to="/contact"
                        onClick={() => setIsSupportOpen(false)}
                        className="block px-4 py-2 rounded-xl text-[11px] font-display font-semibold uppercase tracking-wider text-on-surface-variant hover:text-primary hover:bg-white/5 transition-all text-left"
                      >
                        Contact Us
                      </Link>
                      <Link
                        to="/support"
                        onClick={() => setIsSupportOpen(false)}
                        className="block px-4 py-2 rounded-xl text-[11px] font-display font-semibold uppercase tracking-wider text-on-surface-variant hover:text-primary hover:bg-surface-container-high transition-all border-t border-border text-left"
                      >
                        Live Chat Concierge
                      </Link>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Search Toggle */}
            <button
              onClick={toggleSearch}
              className="p-2 text-on-surface-variant hover:text-primary hover:bg-white/5 rounded-full transition-all"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Link */}
            <Link
              to="/dashboard?tab=wishlist"
              className="p-2 text-on-surface-variant hover:text-primary hover:bg-white/5 rounded-full transition-all relative hidden sm:block"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-0 right-0 bg-primary text-on-primary text-[9px] font-bold h-4.5 w-4.5 rounded-full flex items-center justify-center border border-border">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Profile Dropdown Menu */}
            <div className="relative">
              <button
                onClick={toggleProfile}
                aria-expanded={isProfileOpen}
                aria-haspopup="true"
                aria-label="Profile and settings"
                className={`p-2 hover:text-primary hover:bg-white/5 rounded-full transition-all cursor-pointer flex items-center justify-center ${isProfileOpen ? 'text-primary bg-white/5' : 'text-on-surface-variant'
                  }`}
              >
                <User className="w-5 h-5" />
              </button>

              <AnimatePresence>
                {isProfileOpen && (
                  <>
                    {/* Invisible backdrop to detect click outside */}
                    <div
                      className="fixed inset-0 z-40 cursor-default"
                      onClick={() => setIsProfileOpen(false)}
                    />

                    {/* Dropdown Menu Card */}
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute right-0 mt-3 w-64 dropdown-glass rounded-2xl p-4 shadow-2xl z-50 space-y-4"
                    >
                      {/* Profile summary header */}
                      <div className="border-b border-border pb-3">
                        <p className="text-xs font-semibold text-on-surface">Alexander Mercer</p>
                        <p className="text-[10px] text-on-surface-variant/60 truncate">alexander.mercer@luxemail.com</p>
                      </div>

                      {/* Main Account Links */}
                      <div className="space-y-1">
                        <Link
                          to="/dashboard?tab=profile"
                          onClick={() => setIsProfileOpen(false)}
                          className="flex items-center justify-between px-3 py-2 rounded-xl text-[11px] font-display font-bold uppercase tracking-wider text-on-surface-variant hover:text-primary hover:bg-white/5 transition-all text-left"
                        >
                          <span>Dashboard Profile</span>
                          <ChevronRight className="w-3.5 h-3.5 text-on-surface-variant/40" />
                        </Link>
                        <Link
                          to="/dashboard?tab=orders"
                          onClick={() => setIsProfileOpen(false)}
                          className="flex items-center justify-between px-3 py-2 rounded-xl text-[11px] font-display font-bold uppercase tracking-wider text-on-surface-variant hover:text-primary hover:bg-white/5 transition-all text-left"
                        >
                          <span>Order Registry</span>
                          <ChevronRight className="w-3.5 h-3.5 text-on-surface-variant/40" />
                        </Link>
                      </div>

                      {/* Theme Toggle Options */}
                      <div className="border-t border-border pt-3 space-y-2">
                        <span className="text-[9px] uppercase font-bold tracking-widest text-on-surface-variant/50 px-3 block">
                          Appearance
                        </span>

                        <div className="grid grid-cols-3 gap-1 bg-surface-container p-1 rounded-xl border border-border">
                          {themeOptions.map((opt) => {
                            const isActive = theme === opt.id;
                            const IconComponent = opt.icon;
                            return (
                              <button
                                key={opt.id}
                                onClick={() => {
                                  setTheme(opt.id);
                                  setIsProfileOpen(false);
                                }}
                                aria-label={`Set theme to ${opt.name}`}
                                className={`flex flex-col items-center justify-center gap-1 py-1.5 px-0.5 rounded-lg transition-all cursor-pointer ${isActive
                                  ? 'bg-primary text-on-primary shadow-lg font-bold'
                                  : 'text-on-surface-variant/70 hover:text-on-surface hover:bg-white/5'
                                  }`}
                              >
                                <IconComponent className="w-3.5 h-3.5" />
                                <span className="text-[8px] uppercase font-display tracking-wider font-semibold">{opt.name}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Cart Link Drawer Toggle */}
            <Link
              to="/cart"
              className="p-2 bg-primary/10 text-primary hover:bg-primary/20 rounded-full flex items-center justify-center w-10 h-10 shadow-lg active:scale-95 duration-150 ease-in-out relative border border-primary/20"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalCartItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-primary text-on-primary text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center shadow-lg border border-border">
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
              className="fixed inset-0 z-40 bg-background/60 backdrop-blur-sm md:hidden"
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed inset-y-0 left-0 w-4/5 max-w-sm z-50 dropdown-glass border-y-0 border-l-0 rounded-r-3xl shadow-2xl p-6 flex flex-col gap-8 md:hidden"
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
                <div className="flex flex-col gap-4 pl-4 border-l border-border text-sm">
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

                {/* Mobile Profile & Wishlist Group */}
                <div className="pt-4 border-t border-border space-y-4">
                  <Link
                    to="/dashboard?tab=profile"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-on-surface hover:text-primary transition-colors flex items-center gap-2 text-base font-medium"
                  >
                    <User className="w-5 h-5" /> Account Profile
                  </Link>
                  <Link
                    to="/dashboard?tab=wishlist"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-on-surface hover:text-primary transition-colors flex items-center gap-2 text-base font-medium"
                  >
                    <Heart className="w-5 h-5" /> Wishlist Registry ({wishlistCount})
                  </Link>
                </div>

                {/* Mobile Theme Selector */}
                <div className="pt-4 border-t border-border space-y-2">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-on-surface-variant/50 block">
                    Appearance
                  </span>
                  <div className="grid grid-cols-3 gap-1 bg-surface-container p-1 rounded-xl border border-border">
                    {themeOptions.map((opt) => {
                      const isActive = theme === opt.id;
                      const IconComponent = opt.icon;
                      return (
                        <button
                          key={opt.id}
                          onClick={() => {
                            setTheme(opt.id);
                            setIsMobileMenuOpen(false);
                          }}
                          className={`flex flex-col items-center justify-center gap-1.5 py-2 px-1 rounded-lg transition-all cursor-pointer ${isActive
                            ? 'bg-primary text-on-primary shadow-lg font-bold'
                            : 'text-on-surface-variant hover:text-on-surface hover:bg-white/5'
                            }`}
                        >
                          <IconComponent className="w-4 h-4" />
                          <span className="text-[9px] uppercase font-display tracking-wider font-semibold">{opt.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Floating Search Bar Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <>
            {/* Invisible backdrop to detect click outside */}
            <div
              className="fixed inset-0 z-30 cursor-default"
              onClick={() => setIsSearchOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-16 left-0 w-full z-45 dropdown-glass border-x-0 border-t-0 rounded-none p-4 shadow-xl"
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
          </>
        )}
      </AnimatePresence>
    </>
  );
};
export default NavBar;
