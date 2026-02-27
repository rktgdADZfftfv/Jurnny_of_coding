import React, { useContext, useState } from 'react';
import { products } from '../data';
import { AuthContext } from '../../Context/AuthContext';
import { Plus, Search } from 'lucide-react';

const Shop = () => {
  const [filter, setFilter] = useState('All');
  const { addToCart } = useContext(AuthContext);

  const filteredProducts = filter === 'All' 
    ? products 
    : products.filter(p => p.category === filter);

  const categories = ['All', 'Gourmet', 'Medicinal', 'Kits']; // Category names check kar lena data.js se match karein

  return (
    <div className="min-h-screen bg-stone-50">
      
      {/* --- 1. HEADER SECTION (Green Gradient Added) --- */}
      <div className="bg-gradient-to-br from-green-900 via-emerald-900 to-black py-16 px-4 shadow-xl">
        <div className="container mx-auto text-center">
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Shop Our Fungi
          </h1>
          <p className="text-green-100 text-lg mb-8 max-w-2xl mx-auto">
            Freshly harvested, organic, and wild-crafted mushrooms delivered straight to your kitchen.
          </p>

          {/* --- Category Filter Buttons --- */}
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-full font-bold transition duration-300 shadow-md ${
                  filter === cat 
                    ? 'bg-green-500 text-white transform scale-105 ring-2 ring-white/50' // Active State
                    : 'bg-white text-green-900 hover:bg-gray-100 hover:-translate-y-1' // Inactive State
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* --- 2. PRODUCT GRID SECTION --- */}
      <div className="container mx-auto py-12 px-4">
        
        {/* Results Count */}
        <div className="mb-6 text-gray-500 font-medium">
          Showing {filteredProducts.length} results for <span className="text-green-700 font-bold">"{filter}"</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map(product => (
            <div key={product.id} className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col hover:shadow-2xl transition duration-300 border border-stone-100">
              
              {/* Image Area */}
              <div className="h-64 overflow-hidden relative group">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-700" 
                  />
                  {/* Quick Add Overlay (Optional) */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition duration-300"></div>
              </div>

              {/* Content Area */}
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-gray-800">{product.name}</h3>
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-bold uppercase tracking-wide">
                    {product.category}
                  </span>
                </div>
                
                <p className="text-gray-500 text-sm mb-6 flex-grow leading-relaxed">
                  {product.description}
                </p>
                
                <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100">
                  <span className="text-2xl font-bold text-green-800">${product.price.toFixed(2)}</span>
                  
                  {/* Add Button - Visible Colors */}
                  <button 
                    onClick={() => addToCart(product)}
                    className="bg-stone-800 hover:bg-green-600 text-white p-3 rounded-full transition shadow-lg flex items-center gap-2 group"
                  >
                    <span className="hidden group-hover:inline text-sm font-bold pl-2">Add</span>
                    <Plus size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;