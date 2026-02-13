import React from 'react';
import { useCart } from '../context/CartContext'; // Make sure this path is correct
import { Trash2, Minus, Plus, ArrowLeft, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

const Cart = () => {
  // Get data from Context
  const { cart, removeFromCart, updateQty } = useCart();

  // Calculate Total Price
  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  // --- 1. EMPTY CART STATE ---
  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center text-center px-4">
        <div className="bg-white p-8 rounded-full shadow-lg mb-6">
          <ShoppingBag size={64} className="text-gray-300" />
        </div>
        <h2 className="text-3xl font-bold text-stone-800 mb-4">Your basket is empty</h2>
        <p className="text-gray-500 mb-8 max-w-md">
          Looks like you haven't added any mushrooms to your cart yet.
        </p>
        <Link 
          to="/shop" 
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full transition shadow-lg flex items-center gap-2"
        >
          <ArrowLeft size={20} /> Go Forage
        </Link>
      </div>
    );
  }

  // --- 2. FILLED CART STATE ---
  return (
    <div className="min-h-screen bg-stone-50 py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        
        <h1 className="text-3xl md:text-4xl font-bold text-green-900 mb-8 flex items-center gap-3">
          <ShoppingBag className="text-green-600" /> Your Harvest
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* --- LEFT COLUMN: CART ITEMS --- */}
          <div className="lg:w-2/3 space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="bg-white p-4 rounded-2xl shadow-sm border border-stone-100 flex flex-col sm:flex-row items-center gap-6 hover:shadow-md transition">
                
                {/* Product Image */}
                <div className="w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden bg-gray-100">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>

                {/* Product Details */}
                <div className="flex-grow text-center sm:text-left">
                  <h3 className="font-bold text-lg text-stone-800">{item.name}</h3>
                  <p className="text-green-700 font-bold">${item.price.toFixed(2)}</p>
                  <p className="text-gray-400 text-xs mt-1">{item.category}</p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center bg-stone-100 rounded-lg p-1">
                  <button 
                    onClick={() => updateQty(item.id, -1)} 
                    className="p-2 hover:bg-white rounded-md transition text-stone-600"
                    disabled={item.qty <= 1}
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-10 text-center font-bold text-stone-800">{item.qty}</span>
                  <button 
                    onClick={() => updateQty(item.id, 1)} 
                    className="p-2 hover:bg-white rounded-md transition text-stone-600"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                {/* Remove Button */}
                <button 
                  onClick={() => removeFromCart(item.id)} 
                  className="text-red-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-full transition"
                  title="Remove Item"
                >
                  <Trash2 size={20} />
                </button>

              </div>
            ))}
          </div>

          {/* --- RIGHT COLUMN: SUMMARY & CHECKOUT --- */}
          <div className="lg:w-1/3">
            <div className="bg-stone-900 text-white p-8 rounded-2xl shadow-xl sticky top-24">
              <h2 className="text-2xl font-bold mb-6 border-b border-gray-700 pb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6 text-gray-300">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-green-400">Free</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (Est.)</span>
                  <span>${(total * 0.08).toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between text-xl font-bold mb-8 pt-4 border-t border-gray-700">
                <span>Total</span>
                <span className="text-green-400">${(total * 1.08).toFixed(2)}</span>
              </div>

              {/* --- PROCEED TO CHECKOUT BUTTON --- */}
              {/* This connects to your checkout page */}
              <Link 
                to="/checkout" 
                className="block w-full bg-green-600 hover:bg-green-500 text-white text-center py-4 rounded-xl font-bold text-lg shadow-lg transition transform hover:scale-105 active:scale-95"
              >
                Proceed to Checkout
              </Link>

              <p className="text-center text-gray-500 text-xs mt-4">
                Secure Checkout • 30-Day Money Back Guarantee
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Cart;