import React, { useContext, useState } from 'react';
// IMPORT PATH DHYAN SE DEKHEIN (Agar file src/CartContext.jsx hai toh ye sahi hai)
import { AuthContext } from '../../Context/AuthContext'; 
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Checkout = () => {
  const { cart, clearCart } = useContext(AuthContext);
  const navigate = useNavigate();
  
  // Total calculate karein (safety ke liye yahi kar lete hain)
  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  const [formData, setFormData] = useState({ name: '', address: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Order Placed Successfully! Total: $${total.toFixed(2)}`);
    // clearCart(); // Agar function exist karta hai toh uncomment karein
    navigate('/');
  };

  // Agar Cart Empty hai aur user direct link se aaya
  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-stone-50">
        <h2 className="text-2xl font-bold mb-4">Cart is Empty</h2>
        <Link to="/shop" className="text-green-600 underline">Go Back to Shop</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Back Button */}
        <button onClick={() => navigate('/cart')} className="flex items-center gap-2 text-gray-600 mb-6 hover:text-green-600">
          <ArrowLeft size={20} /> Back to Cart
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* FORM SECTION */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-green-900">Shipping Details</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input required type="text" className="w-full border p-3 rounded-lg mt-1" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <input required type="text" className="w-full border p-3 rounded-lg mt-1" placeholder="123 Forest St" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Card Number (Fake)</label>
                <input required type="text" className="w-full border p-3 rounded-lg mt-1" placeholder="0000 0000 0000 0000" />
              </div>
              <button type="submit" className="w-full bg-green-600 text-white font-bold py-4 rounded-lg mt-4 hover:bg-green-700">
                Pay ${total.toFixed(2)}
              </button>
            </form>
          </div>

          {/* SUMMARY SECTION */}
          <div className="bg-stone-900 text-white p-6 rounded-xl shadow-lg h-fit">
            <h3 className="text-xl font-bold mb-4 border-b border-gray-700 pb-2">Your Order</h3>
            <div className="space-y-3 mb-4">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>{item.qty}x {item.name}</span>
                  <span>${(item.price * item.qty).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between font-bold text-lg pt-4 border-t border-gray-700">
              <span>Total</span>
              <span className="text-green-400">${total.toFixed(2)}</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Checkout;