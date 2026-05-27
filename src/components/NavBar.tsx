import React, { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Heart, User, Menu, X, Search, Sun, Moon, Monitor, ChevronRight, Trash2, Minus, Plus } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useTheme } from '../context/ThemeContext';
import { sanitizeInput, validateEmail } from '../utils/security';

export const NavBar: React.FC = () => {
  const { cart, wishlist, isLoggedIn, login, logout, userProfile, showToast, updateCartQuantity, removeFromCart } = useApp();
  const { theme, setTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [isMiniCartOpen, setIsMiniCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [loginName, setLoginName] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const navigate = useNavigate();

  const profileRef = useRef<HTMLDivElement>(null);
  const supportRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Profile Dropdown click outside check
      if (
        isProfileOpen &&
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }

      // Support Dropdown click outside check
      if (
        isSupportOpen &&
        supportRef.current &&
        !supportRef.current.contains(event.target as Node)
      ) {
        setIsSupportOpen(false);
      }

      // Search Bar click outside check (exclude search button)
      if (
        isSearchOpen &&
        searchRef.current &&
        !searchRef.current.contains(event.target as Node) &&
        !(event.target as Element).closest('button[aria-label="Open search bar"]')
      ) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isProfileOpen, isSupportOpen, isSearchOpen]);

  const handleSimulatedLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = sanitizeInput(loginName.trim());
    const cleanEmail = sanitizeInput(loginEmail.trim());

    if (!cleanName || !cleanEmail) {
      showToast('Please enter both name and email.', 'error');
      return;
    }

    if (!validateEmail(cleanEmail)) {
      showToast('Please enter a valid email address.', 'error');
      return;
    }

    login(cleanEmail, cleanName);
    setIsProfileOpen(false);
    setLoginName('');
    setLoginEmail('');
  };

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
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

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
            aria-label="Toggle navigation menu"
            className="md:hidden w-11 h-11 flex items-center justify-center text-on-surface hover:text-primary transition-colors cursor-pointer"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Logo */}
          <Link
            to="/"
            className="text-body-lg font-display font-extrabold tracking-tighter text-on-surface text-xl md:text-2xl"
          >
            AETHERIA LUXE
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
              ref={supportRef}
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
                  <motion.div
                    key="support-dropdown"
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
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Search Toggle */}
            <button
              onClick={toggleSearch}
              aria-label="Open search bar"
              className="w-11 h-11 flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-white/5 rounded-full transition-all cursor-pointer"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Link */}
            <Link
              to="/dashboard?tab=wishlist"
              aria-label="View wishlist"
              className="w-11 h-11 flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-white/5 rounded-full transition-all relative hidden sm:flex cursor-pointer"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 bg-primary text-on-primary text-[9px] font-bold h-4.5 w-4.5 rounded-full flex items-center justify-center border border-border">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Profile Dropdown Menu */}
            <div ref={profileRef} className="relative">
              <button
                onClick={toggleProfile}
                aria-expanded={isProfileOpen}
                aria-haspopup="true"
                aria-label="Profile and settings"
                className={`w-11 h-11 hover:text-primary hover:bg-white/5 rounded-full transition-all cursor-pointer flex items-center justify-center ${isProfileOpen ? 'text-primary bg-white/5' : 'text-on-surface-variant'
                  }`}
              >
                <User className="w-5 h-5" />
              </button>

              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div
                    key="profile-dropdown"
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute right-0 mt-3 w-64 dropdown-glass rounded-2xl p-4 shadow-2xl z-50 space-y-4"
                  >
                    {isLoggedIn ? (
                      <>
                        {/* Profile summary header */}
                        <div className="border-b border-border pb-3">
                          <p className="text-xs font-semibold text-on-surface">{userProfile.fullName}</p>
                          <p className="text-[10px] text-on-surface-variant/60 truncate">{userProfile.email}</p>
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
                      </>
                    ) : (
                      /* Logged Out: Simulated Sign In Form */
                      <div className="space-y-3">
                        <div className="border-b border-border pb-2">
                          <p className="text-xs font-bold text-on-surface uppercase tracking-wider">Sign In</p>
                          <p className="text-[9px] text-on-surface-variant/60 font-medium">Access your synchronized profile</p>
                        </div>
                        <form onSubmit={handleSimulatedLogin} className="space-y-2">
                          <input
                            type="text"
                            required
                            placeholder="Full Name"
                            value={loginName}
                            onChange={(e) => setLoginName(e.target.value)}
                            className="w-full bg-surface-container border border-border rounded-xl px-3 py-2 text-[11px] focus:outline-none focus:border-primary text-on-surface placeholder:text-on-surface-variant/30"
                          />
                          <input
                            type="email"
                            required
                            placeholder="Email Address"
                            value={loginEmail}
                            onChange={(e) => setLoginEmail(e.target.value)}
                            className="w-full bg-surface-container border border-border rounded-xl px-3 py-2 text-[11px] focus:outline-none focus:border-primary text-on-surface placeholder:text-on-surface-variant/30"
                          />
                          <button
                            type="submit"
                            className="w-full bg-primary text-on-primary font-display font-bold py-2 rounded-xl text-[10px] uppercase tracking-widest hover:opacity-90 transition-opacity"
                          >
                            Sign In
                          </button>
                        </form>
                      </div>
                    )}

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
                              className={`flex flex-col items-center justify-center gap-1.5 py-1.5 px-0.5 rounded-lg transition-all cursor-pointer ${isActive
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

                    {/* Sign Out Button if logged in */}
                    {isLoggedIn && (
                      <div className="border-t border-border pt-2.5">
                        <button
                          onClick={() => {
                            logout();
                            setIsProfileOpen(false);
                          }}
                          className="w-full text-center py-2 rounded-xl text-[10px] font-display font-bold uppercase tracking-widest border border-error/25 text-error hover:bg-error/5 hover:border-error/40 transition-all cursor-pointer"
                        >
                          Sign Out
                        </button>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Cart Link Drawer Toggle */}
            <button
              onClick={() => setIsMiniCartOpen(true)}
              aria-label="View shopping bag"
              className="bg-primary/10 text-primary hover:bg-primary/20 rounded-full flex items-center justify-center w-11 h-11 shadow-lg active:scale-95 duration-150 ease-in-out relative border border-primary/20 cursor-pointer text-primary"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalCartItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-primary text-on-primary text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center shadow-lg border border-border">
                  {totalCartItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Slide-out Mobile Menu Backdrop & Panel */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            key="mobile-menu-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 z-40 bg-background/60 backdrop-blur-sm md:hidden"
          />
        )}
        {isMobileMenuOpen && (
          <motion.div
            key="mobile-menu-drawer"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-y-0 left-0 w-4/5 max-w-sm z-50 dropdown-glass border-y-0 border-l-0 rounded-r-3xl shadow-2xl p-6 flex flex-col gap-8 md:hidden"
          >
            <div className="flex justify-between items-center">
              <span className="font-display font-extrabold tracking-tighter text-xl text-on-surface">
                AETHERIA LUXE
              </span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close navigation menu"
                className="w-11 h-11 flex items-center justify-center text-on-surface hover:text-primary transition-colors cursor-pointer"
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
        )}
      </AnimatePresence>

      {/* Floating Search Bar Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            ref={searchRef}
            key="search-dropdown"
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
        )}
      </AnimatePresence>
      {/* Mini Cart Slide-Out Drawer Overlay */}
      <AnimatePresence>
        {isMiniCartOpen && (
          <motion.div
            key="mini-cart-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMiniCartOpen(false)}
            className="fixed inset-0 z-[100] bg-background/60 backdrop-blur-sm"
          />
        )}
        {isMiniCartOpen && (
          <motion.div
            key="mini-cart-drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-y-0 right-0 w-full sm:w-[450px] z-[101] dropdown-glass border-y-0 border-r-0 rounded-l-3xl shadow-2xl p-6 flex flex-col justify-between"
          >
            {/* Drawer Header */}
            <div className="flex justify-between items-center pb-4 border-b border-border">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-primary" />
                <span className="font-display font-extrabold tracking-tighter text-lg text-on-surface uppercase">
                  Your Bag ({totalCartItems})
                </span>
              </div>
              <button
                onClick={() => setIsMiniCartOpen(false)}
                aria-label="Close cart drawer"
                className="w-10 h-10 flex items-center justify-center text-on-surface hover:text-primary transition-colors cursor-pointer rounded-full hover:bg-white/5"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Scrollable Items */}
            <div className="flex-grow overflow-y-auto py-4 space-y-4 pr-1 scrollbar-thin">
              {cart.length > 0 ? (
                cart.map((item) => (
                  <div
                    key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`}
                    className="flex gap-4 items-center bg-white/5 rounded-2xl p-3 border border-white/5"
                  >
                    <div className="w-16 h-16 overflow-hidden rounded-xl bg-surface-container shrink-0">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-grow min-w-0">
                      <h4 className="font-display font-bold text-xs text-on-surface truncate">
                        {item.product.name}
                      </h4>
                      <p className="text-[9px] text-on-surface-variant font-medium uppercase tracking-wider mt-0.5">
                        {item.selectedColor} / {item.selectedSize}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        {/* Quantity controls */}
                        <div className="flex items-center bg-white/5 border border-white/10 rounded-full p-0.5 scale-90 origin-left">
                          <button
                            onClick={() => {
                              updateCartQuantity(item.product.id, item.selectedColor, item.selectedSize, item.quantity - 1);
                            }}
                            className="w-6 h-6 flex items-center justify-center hover:bg-white/5 rounded-full transition-colors text-on-surface-variant hover:text-on-surface"
                          >
                            <Minus className="w-2.5 h-2.5" />
                          </button>
                          <span className="px-2 font-display font-bold text-xs text-center min-w-[16px]">{item.quantity}</span>
                          <button
                            onClick={() => {
                              updateCartQuantity(item.product.id, item.selectedColor, item.selectedSize, item.quantity + 1);
                            }}
                            className="w-6 h-6 flex items-center justify-center hover:bg-white/5 rounded-full transition-colors text-on-surface-variant hover:text-on-surface"
                          >
                            <Plus className="w-2.5 h-2.5" />
                          </button>
                        </div>
                        <span className="font-display font-bold text-primary text-xs">
                          ${(item.product.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.product.id, item.selectedColor, item.selectedSize)}
                      className="text-error/70 hover:text-error p-1 transition-colors hover:bg-error/5 rounded-full shrink-0"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center p-6 gap-3">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-on-surface-variant/40 border border-white/5">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <p className="text-xs text-on-surface-variant font-medium">Your bag is empty.</p>
                  <button
                    onClick={() => {
                      setIsMiniCartOpen(false);
                      navigate('/collection');
                    }}
                    className="text-[10px] font-display font-bold uppercase tracking-wider text-primary hover:underline"
                  >
                    Start Shopping
                  </button>
                </div>
              )}
            </div>

            {/* Footer subtotal & CTA */}
            {cart.length > 0 && (
              <div className="pt-4 border-t border-border space-y-4">
                <div className="flex justify-between items-center font-display font-extrabold text-sm text-on-surface uppercase tracking-wider">
                  <span>Subtotal</span>
                  <span className="text-primary">${subtotal.toLocaleString()}</span>
                </div>
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <Link
                    to="/cart"
                    onClick={() => setIsMiniCartOpen(false)}
                    className="w-full py-3 bg-white/5 border border-white/10 rounded-full font-display font-bold text-[10px] text-center hover:bg-white/10 transition-colors uppercase tracking-widest text-on-surface"
                  >
                    View Bag
                  </Link>
                  <Link
                    to="/checkout"
                    onClick={() => setIsMiniCartOpen(false)}
                    className="w-full py-3 accent-gradient rounded-full font-display font-bold text-[10px] text-center text-white hover:opacity-90 transition-all uppercase tracking-widest shadow-lg flex items-center justify-center gap-1"
                  >
                    Checkout
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
export default NavBar;
