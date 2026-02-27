import api from "./configer";
import { createContext, useEffect, useState , useContext} from "react";
import {useNavigate} from 'react-router-dom'

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, SetUser] = useState(null);
    const [loading, SetLoading] = useState(true);
    const navigate = useNavigate();
     const [cart, setCart] = useState([]);



 const getCurrentUser = async () => {
  try {
    const res = await api.get('/auth/me');
  //  console.log(res.data);
    
    SetUser(res.data);
  } catch (error) {
    SetUser(null);
  } finally {
    SetLoading(false);
  }
};


    // Register user
    const register = async (formData) => {
  try {
    const res = await api.post('/auth/register', formData);
    console.log(res.data);
    
    const token = res.data.token;
    console.log(token);
    

    if (token) {
      localStorage.setItem("token", token);
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }

    SetUser({
      id: res.data.id,
      name: res.data.name,
      email: res.data.email
    });

  } catch (error) {
    console.error("Register error", error.message);
  }
};


    const login = async (email, password) => {
    try {
    const res = await api.post('/auth/login', { email, password });
        // console.log(res.data, "Not found");
    const token = res.data.token;
        // console.log(token, "Not found");
    if (token) {
      localStorage.setItem("token", token);
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }

    SetUser({
      id: res.data.id,
      name: res.data.name,
      email: res.data.email
    });

  } catch (error) {
    console.error("Login error", error.message);
  }
};



  const logout = async () => {
  try {
    await api.post('/auth/logout');
  } catch (error) {
    console.error("Logout error", error);
  } finally {
    SetUser(null);
    localStorage.removeItem("token");
    delete api.defaults.headers.common["Authorization"];
    navigate("/login");
  }
};


// CARD SECTION
 const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQty = (id, amount) => {
    setCart((prev) => 
      prev.map(item => {
        if (item.id === id) {
          const newQty = item.qty + amount;
          return newQty > 0 ? { ...item, qty: newQty } : item;
        }
        return item;
      })
    );
  };

  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);

  // ✅ GET PRODUCTS
  const getProducts = async () => {
    try {
      setLoadingProducts(true);
      const res = await api.get("/products");
      setProducts(res.data);
    } catch (error) {
      console.error("Get products error", error);
    } finally {
      setLoadingProducts(false);
    }
  };

  // ✅ CREATE PRODUCT
  const createProduct = async (formData) => {
    try {
      const res = await api.post("/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      await getProducts(); // refresh list
      return res.data;
    } catch (error) {
      console.error("Create product error", error);
    }
  };

  // ✅ UPDATE PRODUCT
  const updateProduct = async (id, data) => {
    try {
      await api.put(`/products/${id}`, data);
      await getProducts();
    } catch (error) {
      console.error("Update product error", error);
    }
  };

  // ✅ DELETE PRODUCT
  const deleteProduct = async (id) => {
    try {
      await api.delete(`/products/${id}`);
      setProducts(prev => prev.filter(p => p.id !== id));
    } catch (error) {
      console.error("Delete product error", error);
    }
  };
  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

    useEffect(() => {
  const token = localStorage.getItem("token");

  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    getCurrentUser();
  } else {
    SetLoading(false);
  }
}, []);


    return (
        <AuthContext.Provider
         value={{register, login, logout, user, loading, cart, addToCart, removeFromCart, updateQty, clearCart, cartTotal , products,
        loadingProducts,
        getProducts,
        createProduct,
        updateProduct,
        deleteProduct}}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('user Auth must be used within an authprovider')
    }
    return context;
}
