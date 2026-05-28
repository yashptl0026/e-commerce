import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { ThemeProvider } from './context/ThemeContext';
import { NavBar } from './components/NavBar';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';

// Pages
import { Home } from './pages/Home';
import { HomeFashion } from './pages/HomeFashion';
import { HomeElectronics } from './pages/HomeElectronics';
import { HomeWatches } from './pages/HomeWatches';
import { HomeFurniture } from './pages/HomeFurniture';
import { Collection } from './pages/Collection';
import { ProductDetail } from './pages/ProductDetail';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { OrderConfirmation } from './pages/OrderConfirmation';
import { Dashboard } from './pages/Dashboard';
import { Support } from './pages/Support';
import { About } from './pages/About';
import { Privacy } from './pages/Privacy';
import { Terms } from './pages/Terms';
import { ReturnPolicy } from './pages/ReturnPolicy';
import { FAQ } from './pages/FAQ';
import { Contact } from './pages/Contact';
import { TrackOrder } from './pages/TrackOrder';
import { NotFound } from './pages/NotFound';
import { DemoSwitcher } from './components/DemoSwitcher';
import { BackToTop } from './components/BackToTop';

// ScrollToTop utility helper to reset window scroll position on route change
function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.body.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.documentElement.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.body.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }, 50);

    return () => clearTimeout(timer);
  }, [location]);

  return null;
}

function App() {
  return (
    <ThemeProvider>
      <AppProvider>
        <Router>
        <ScrollToTop />
        
        {/* Navigation */}
        <NavBar />
        
        {/* Main Content Area */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home-fashion" element={<HomeFashion />} />
          <Route path="/home-electronics" element={<HomeElectronics />} />
          <Route path="/home-watches" element={<HomeWatches />} />
          <Route path="/home-furniture" element={<HomeFurniture />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/support" element={<Support />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/return-policy" element={<ReturnPolicy />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/track-order" element={<TrackOrder />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        
        {/* Footer */}
        <Footer />
        
        {/* Toast Notification HUD */}
        <Toast />

        {/* Global Back To Top Action */}
        <BackToTop />

        {/* Global Demo Switcher HUD */}
        <DemoSwitcher />
        </Router>
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;
