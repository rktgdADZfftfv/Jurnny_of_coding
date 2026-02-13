import { Link } from 'react-router-dom';
import { ShoppingBasket, Sprout } from 'lucide-react';
import { useCart } from '../context/CartContext'; // Path check karein

export default function Navbar() {
  const { cart } = useCart();
  const count = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    // 'text-white' yahan zaroori hai
    <nav className="bg-stone-900 text-white p-4 sticky top-0 z-50 shadow-lg">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold tracking-tighter text-white">
          <Sprout className="text-green-400" size={32} />
          <span>MYCO<span className="text-green-400">STORE</span></span>
        </Link>
        
        {/* Links - Yahan 'text-white' ensure karein */}
        <div className="flex gap-6 items-center font-medium">
          <Link to="/" className="text-gray-300 hover:text-white transition">Home</Link>
          <Link to="/shop" className="text-gray-300 hover:text-white transition">Shop</Link>
          
          <Link to="/cart" className="relative text-gray-300 hover:text-white transition">
            <ShoppingBasket size={28} />
            {count > 0 && (
              <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold">
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}