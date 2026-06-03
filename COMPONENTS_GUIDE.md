# Aetheria Luxe - Components Guide

Welcome to the components guide for **Aetheria Luxe**. This document is designed to help developers and buyers easily understand, use, and learn from the interactive UI components built into this template.

All custom components are stored in the [src/components/](file:///e:/my%20projects/luxe/src/components/) directory. They are designed to be reusable, fully responsive, and styled with **Tailwind CSS v4** and **Vanilla CSS** tokens.

---

## Component Index

1. [NavBar (Mega Menu Navigation)](#1-navbar-mega-menu-navigation)
2. [ProductCard (Interactive Product Widget)](#2-productcard-interactive-product-widget)
3. [QuickViewModal (Frosted Preview HUD)](#3-quickviewmodal-frosted-preview-hud)
4. [Toast (Dynamic Notification Feed)](#4-toast-dynamic-notification-feed)
5. [DemoSwitcher (Interactive Controls Drawer)](#5-demoswitcher-interactive-controls-drawer)
6. [BackToTop (Scroll-to-Top Indicator)](#6-backtotop-scroll-to-top-indicator)
7. [Footer (Multi-Column Layout)](#7-footer-multi-column-layout)
8. [SEO (Search Engine Optimizer)](#8-seo-search-engine-optimizer)

---

## 1. NavBar (Mega Menu Navigation)
* **File Location**: [NavBar.tsx](file:///e:/my%20projects/luxe/src/components/NavBar.tsx)
* **Purpose**: Provides a premium, glassmorphic navigation header. Features a dynamic transparent background on scroll, a multi-column **Mega Menu** dropdown, responsive mobile drawer navigation, a live search query filter, and interactive cart & wishlist drawers.

### Key Inner Logic
* **Scroll Listener**: Monitors window scroll position to transition the header background from fully transparent to glassmorphic frosted:
  ```typescript
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  ```
* **Drawers Management**: Integrates wishlist drawer, cart drawer, search overlay, and mobile navigation states using React hooks.

### Customize It
* To change navigation links, locate the dropdown mapping arrays in `NavBar.tsx` (e.g. categories or demo links).
* Update cart and wishlist interactions via the global `useApp` state context.

---

## 2. ProductCard (Interactive Product Widget)
* **File Location**: [ProductCard.tsx](file:///e:/my%20projects/luxe/src/components/ProductCard.tsx)
* **Props interface**:
  ```typescript
  interface ProductCardProps {
    product: Product;
  }
  ```
* **Purpose**: Renders individual product items in collections and storefront grids.
* **Features**:
  * Dual image hover swapping.
  * Interactive rating star badges.
  * Instant access via **Add to Cart** and **Wishlist Toggle** buttons.
  * Direct launch trigger for the global **Quick View HUD**.

### Key Inner Logic
* **Hover State Handling**: Swaps between primary and secondary product images dynamically when hovered.
* **Wishlist Syncing**: Connects to `AppContext` using `useApp()` to check if the product is in the wishlist and toggle it:
  ```typescript
  const { wishlist, toggleWishlist, openQuickView, addToCart } = useApp();
  const isWishlisted = wishlist.some((item) => item.id === product.id);
  ```

---

## 3. QuickViewModal (Frosted Preview HUD)
* **File Location**: [QuickViewModal.tsx](file:///e:/my%20projects/luxe/src/components/QuickViewModal.tsx)
* **Purpose**: An overlay dashboard modal that triggers from any `ProductCard` or interactive hotspot. Enables shoppers to examine specs, select colors/sizes, and add products directly to the cart without loading a new page.

### Key Features
* Glassmorphic backdrop blurring (`.premium-glass` and `.glass-level-2`).
* Interactive swatches for color and size selectors.
* Smooth entry and exit animations using **Framer Motion** (`<AnimatePresence>`).
* Interactive specs accordion detailing product features.

### Key Logic
* **State Management**:
  ```typescript
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || '');
  const [quantity, setQuantity] = useState(1);
  ```
* Resets selected state variables whenever the active product changes to prevent state leakage.

---

## 4. Toast (Dynamic Notification Feed)
* **File Location**: [Toast.tsx](file:///e:/my%20projects/luxe/src/components/Toast.tsx)
* **Props interface**:
  ```typescript
  interface ToastProps {
    message: string;
    type?: 'success' | 'info' | 'error';
    onClose: () => void;
  }
  ```
* **Purpose**: Small floating alert block confirming shopping actions (e.g. adding to cart, wishlisting) with fluid auto-fade mechanics.

### Key Inner Logic
* **Auto-Dismiss Timer**: Closes the notification automatically after 3 seconds:
  ```typescript
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);
  ```

---

## 5. DemoSwitcher (Interactive Controls Drawer)
* **File Location**: [DemoSwitcher.tsx](file:///e:/my%20projects/luxe/src/components/DemoSwitcher.tsx)
* **Purpose**: A floating controller dock positioned at the side of the screen. Excellent developer tool allowing clients and review agents to:
  * Instantly switch between the 5 pre-built storefront demos.
  * Toggle **Light & Dark Mode** settings.
  * Mirror the complete site alignment from **LTR (Left-To-Right)** to **RTL (Right-To-Left)**.

### Key Inner Logic
* **Direction (LTR/RTL) Mirroring**: Modifies the document element attributes and updates standard layout alignments globally:
  ```typescript
  const toggleDirection = () => {
    const nextDir = dir === 'ltr' ? 'rtl' : 'ltr';
    setDir(nextDir);
    document.documentElement.dir = nextDir;
  };
  ```

---

## 6. BackToTop (Scroll-to-Top Indicator)
* **File Location**: [BackToTop.tsx](file:///e:/my%20projects/luxe/src/components/BackToTop.tsx)
* **Purpose**: A subtle floating button that appears in the bottom corner of the viewport after the user scrolls down. Allows the buyer to return to the top of the page smoothly.

### Key Inner Logic
* **Visibility Threshold**: Appears only when the scroll depth exceeds 300 pixels:
  ```typescript
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);
  ```

---

## 7. Footer (Multi-Column Layout)
* **File Location**: [Footer.tsx](file:///e:/my%20projects/luxe/src/components/Footer.tsx)
* **Purpose**: Contains the site's footer content, subscription forms, localized links, and developer credits.
* **Features**: Form validation for newsletter subscriptions, social icon networks, and secure currency switcher.

---

## 8. SEO (Search Engine Optimizer)
* **File Location**: [SEO.tsx](file:///e:/my%20projects/luxe/src/components/SEO.tsx)
* **Props interface**:
  ```typescript
  interface SEOProps {
    title: string;
    description?: string;
    keywords?: string;
  }
  ```
* **Purpose**: Seamless wrapper that updates the HTML document titles and page meta descriptions dynamically to adhere to modern SEO best practices.

### Key Inner Logic
* **Direct DOM Meta Updates**: Updates values directly using React effects:
  ```typescript
  useEffect(() => {
    document.title = `${title} | Aetheria Luxe`;
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }
  }, [title, description]);
  ```

---

## Developer Learning Tips
1. **Adding a Component**: To add a new component, create it in `src/components/` using TypeScript React `.tsx`. Import styling rules or Tailwind variables directly.
2. **State Context integration**: Access product datasets, cart balances, and wishlist arrays by using the `useApp` hook:
   ```typescript
   import { useApp } from '../context/AppContext';
   const { products, cart, addToCart } = useApp();
   ```
3. **Responsive design**: Use Tailwind prefixes (`sm:`, `md:`, `lg:`, `xl:`) directly on elements to ensure beautiful cross-device fluid scaling.
