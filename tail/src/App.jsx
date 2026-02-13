import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext'; // Path check karein (../context/CartContext bhi ho sakta hai)
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

// PAGES IMPORT KAREIN
import Home from './pages/Home';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout'; // <--- YE IMPORT MISSING HOGA

function App() {
  return (
    <CartProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-stone-50 font-sans text-gray-800">
          <Navbar />
          
          <main className="flex-grow">
            <Routes>
              {/* SARE ROUTES YAHAN HONE CHAHIYE */}
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/cart" element={<Cart />} />
              
              {/* YE ROUTE SABSE ZAROORI HAI CHECKOUT KE LIYE */}
              <Route path="/checkout" element={<Checkout />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;