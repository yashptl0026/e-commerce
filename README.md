# Aetheria Luxe - Premium React E-Commerce Template & Design System

Aetheria Luxe is an editorial-grade, ultra-premium React template designed for high-end digital commerce. Featuring 5 bespoke storefront designs, glassmorphic layout components, high-performance UI mechanics, and a fully tokenized design system, it provides everything you need to build state-of-the-art e-commerce websites.

---

## 🌟 Key Features

* **5 Storefront Demos in 1**:
  * **Luxe Default (Showcase)**: Sophisticated, multi-brand minimal layout with glassmorphic cards and category sliders.
  * **Haute Couture (Fashion)**: Editorial layout featuring bold typography, lookbook grids, and scrolling new arrivals.
  * **Cybertech Store (Electronics)**: Futuristic dark mode with neon accents, specifications tabs, and countdown promo timers.
  * **Bespoke Timepieces (Watches)**: Classic luxury serif styling, gold borders, and interactive brand history timelines.
  * **Scandinavian Living (Furniture)**: Spacious, earthy minimalist layouts featuring an **interactive room hotspot map**.
* **Global Quick View Modal HUD**: Instantly details product ratings, color swatches, sizes, specs, and checkout actions from any page.
* **Interactive Room Hotspots**: Pin pulsing tags on layout scene images that launch direct Quick View panels.
* **Premium Mega Menu**: Dynamic multi-column panel linking category listings, storefront demos, and featured lookbooks.
* **Instant Light / Dark Mode Toggle**: Transitions seamlessly between clean light styles and deep premium dark presets.
* **One-Click LTR & RTL Mirroring**: Full internationalization layout toggle dynamically mirroring alignments and directions.
* **Support Concierge Bot**: Interactive chatbot simulating shipment tracking, returns audit, and showroom bookings.
* **Vanilla CSS Custom Properties**: Global styling tokens configured centrally in `src/index.css` for absolute brand customizability.
* **SEO Optimized**: Standard SEO headings, unique IDs, meta description loaders, and fast index load times.

---

## 🛠️ Technology Stack

* **Core Framework**: React 19 (`https://react.dev/`)
* **Building Tool**: Vite 8 (`https://vite.dev/`)
* **Styling Engine**: Tailwind CSS v4 (`https://tailwindcss.com/`)
* **Animations**: Framer Motion 12 (`https://motion.dev/`)
* **Icons**: Lucide React 1.16 (`https://lucide.dev/`)

---

## 📂 File Package Structure

* `/src/components/`: Reusable interface components ([NavBar](file:///e:/my%20projects/luxe/src/components/NavBar.tsx), [ProductCard](file:///e:/my%20projects/luxe/src/components/ProductCard.tsx), [QuickViewModal](file:///e:/my%20projects/luxe/src/components/QuickViewModal.tsx), [Toast](file:///e:/my%20projects/luxe/src/components/Toast.tsx), [DemoSwitcher](file:///e:/my%20projects/luxe/src/components/DemoSwitcher.tsx), etc.).
* `/src/context/`: Global state providers ([AppContext](file:///e:/my%20projects/luxe/src/context/AppContext.tsx) for store catalogs/cart/wishlist, [ThemeContext](file:///e:/my%20projects/luxe/src/context/ThemeContext.tsx) for dark mode & LTR/RTL configuration).
* `/src/pages/`: Primary page route views ([Home.tsx](file:///e:/my%20projects/luxe/src/pages/Home.tsx), [Collection.tsx](file:///e:/my%20projects/luxe/src/pages/Collection.tsx), [ProductDetail.tsx](file:///e:/my%20projects/luxe/src/pages/ProductDetail.tsx), etc.).
* `/public/`: Image assets, vector assets, and offline interactive documentation (`documentation.html`).
* `/src/index.css`: Global custom design system tokens, keyframe animations, and Tailwind imports.

---

## 🚀 Quick Start (For Buyers)

Ensure you have [Node.js](https://nodejs.org/) (Version 18+) installed.

```bash
# 1. Extract package and navigate to root directory
cd luxe

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev

# 4. Compile optimized production build
npm run build
```

---

## 📘 Learning & Customization Guides

* **Interactive Components Showcase**: Run the server and visit `/components` (or click "Components Guide" in the footer) to interact with live components, trigger animations, test HUD buttons, and copy standard HTML/TSX code templates in real-time.
* **Components Markdown Guide**: Read [COMPONENTS_GUIDE.md](file:///e:/my%20projects/luxe/COMPONENTS_GUIDE.md) in your editor to inspect static prop specifications, inner logic, and file structures.
* **HTML Setup Guide**: Check out the pre-bundled interactive [public/documentation.html](file:///e:/my%20projects/luxe/public/documentation.html) for detailed step-by-step styling adjustments and directory layouts.
