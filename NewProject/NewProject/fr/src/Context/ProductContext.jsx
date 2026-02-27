import { createContext, useContext, useState } from "react";
import api from "./configer";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
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

  return (
    <ProductContext.Provider
      value={{
        products,
        loadingProducts,
        getProducts,
        createProduct,
        updateProduct,
        deleteProduct
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  return useContext(ProductContext);
};