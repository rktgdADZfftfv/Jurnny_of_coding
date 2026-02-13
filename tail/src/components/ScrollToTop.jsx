import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  // Current URL path pata karne ke liye
  const { pathname } = useLocation();

  useEffect(() => {
    // Jaise hi path change ho, window ko 0,0 (Top) par scroll karo
    window.scrollTo(0, 0);
  }, [pathname]);

  return null; // Ye component dikhta nahi hai, bas kaam karta hai
};

export default ScrollToTop;