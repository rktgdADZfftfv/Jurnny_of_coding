import React from 'react';
import { Link } from 'react-router-dom';
import { Sprout, ShoppingBag, Plus, Star } from 'lucide-react';
import { products } from '../data'; // Products data import kiya
import { useCart } from '../context/CartContext'; // Cart feature import kiya

const Home = () => {
  const { addToCart } = useCart();

  // Sirf pehle 3 products dikhayenge Home page par (Best Sellers)
  const featuredProducts = products.slice(0, 3);

  return (
    <div className="min-h-screen bg-stone-40">
      
      {/* --- 1. HERO BANNER --- */}
      <div className="relative bg-gradient-to-br from-green-900 via-emerald-900 to-black text-white h-[500px] flex items-center justify-center overflow-hidden">
        {/* Background Animation */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-green-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-yellow-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <div className="flex justify-center mb-4">
            <Sprout size={56} className="text-green-400" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            Nature's Superfood
          </h1>
          <p className="text-xl text-gray-300 mb-8 font-light">
            Premium gourmet mushrooms harvested from the heart of the forest.
          </p>
          <Link to="/shop" className="bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-8 rounded-full transition shadow-lg shadow-green-900/50">
            Start Shoping
          </Link>
        </div>
      </div>

      {/* --- 2. CATEGORIES SECTION --- */}
      <div className="container mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold text-center text-green-900 mb-10">Explore Varieties</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {['Culinary', 'Medicinal', 'Grow Kits'].map((cat) => (
            <div key={cat} className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition duration-300 border border-stone-100 text-center cursor-pointer hover:-translate-y-1">
              <h3 className="text-xl font-bold text-stone-800 mb-2">{cat} Mushrooms</h3>
              <p className="text-gray-500 text-sm mb-4">Premium selection of {cat.toLowerCase()} fungi.</p>
              <Link to="/shop" className="text-green-700 font-bold text-sm uppercase tracking-wider hover:underline">
                View Collection
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* --- 3. NEW SHOP SECTION (BEST SELLERS) --- */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold text-green-900">Best Sellers</h2>
              <p className="text-gray-500 mt-2">Our customer's favorite picks this week.</p>
            </div>
            <Link to="/shop" className="hidden md:flex items-center text-green-700 font-bold hover:underline">
              View All Products <ShoppingBag size={18} className="ml-2"/>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <div key={product.id} className="group bg-stone-50 rounded-2xl overflow-hidden shadow-lg border border-stone-100 transition hover:shadow-2xl">
                
                {/* Product Image */}
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center shadow-sm">
                    <Star size={14} className="text-yellow-500 fill-yellow-500 mr-1" />
                    <span className="text-xs font-bold text-gray-800">4.9</span>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-800">{product.name}</h3>
                    <span className="text-green-700 font-bold text-lg">${product.price}</span>
                  </div>
                  <p className="text-gray-500 text-sm mb-6 line-clamp-2">{product.description}</p>
                  
                  {/* Add to Cart Button */}
                  <button 
                    onClick={() => addToCart(product)}
                    className="w-full bg-stone-800 hover:bg-green-700 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition duration-300"
                  >
                    <Plus size={18} /> Add to Basket
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile View All Button */}
          <div className="mt-10 text-center md:hidden">
            <Link to="/shop" className="inline-block bg-white border-2 border-green-700 text-green-700 font-bold py-3 px-8 rounded-full">
              View Full Shop
            </Link>
          </div>

        </div>
      </div>

    </div>
  );
};

export default Home;