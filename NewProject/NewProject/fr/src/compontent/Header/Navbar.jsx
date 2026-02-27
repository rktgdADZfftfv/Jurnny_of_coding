import { Link } from 'react-router-dom';
import { ShoppingBasket, Sprout } from 'lucide-react';
import { AuthContext } from '../../Context/AuthContext';
import { useContext } from 'react';



export default function Navbar() {
  const { cart, user, logout, loading } = useContext(AuthContext);
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
 // console.log(user);
  

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
          <Link to="/" className="text-gray-300 hover:text-white transition">
          Home
          </Link>
          <Link to="/shop" className="text-gray-300 hover:text-white transition">
          Shop
          </Link> 
          <Link to="/createProduct" className="text-gray-300 hover:text-white transition">
          Create
          </Link> <Link to="/getProduct" className="text-gray-300 hover:text-white transition">
          GetProduct
          </Link>
         
          {user ? (
             
                 
                 
            <button onClick={logout}
            className="text-sm font-semibold text-white bg-gradient-to-r from-red-500 to-red-600 px-4 py-2 rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-sm hover:shadow-md">
                Logout
            </button>
           
          ) : (
            <div className="flex">
            <Link to="/login" 
            className="text-gray-300 hover:text-white transition">Login</Link>
            <Link to="/register" className="text-gray-300 hover:text-white transition ml-4">
            Register</Link>
            </div>
          )
          }
          <Link to="/cart" className="relative text-gray-300 hover:text-white transition">
            <ShoppingBasket size={28} />
            {count > 0 && (
              <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold">
                {count}
              </span>
            )}
          </Link>
           <Link to="/profile" className="text-gray-300 hover:text-white transition">
          P
          </Link>
        </div>
      </div>
    </nav>
  );
}