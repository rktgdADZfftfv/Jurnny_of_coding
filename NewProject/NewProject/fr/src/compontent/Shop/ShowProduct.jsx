import { useContext, useEffect } from "react";
import { AuthContext } from "../../Context/AuthContext";

const ProductList = () => {
  const { products, getProducts, deleteProduct } = useContext(AuthContext);

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Product List</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((p) => (
          <div
            key={p.id}
            className="bg-white shadow-lg rounded-xl p-4 hover:shadow-xl transition"
          >
            <img
  src={`http://localhost:5000/image/${p.image}`}
  alt={p.name}
  className="w-full h-40 object-cover rounded-lg mb-4"
/>

            <h3 className="text-xl font-semibold">{p.name}</h3>
            <p className="text-gray-600 mb-4">₹ {p.price}</p>

            <button
              onClick={() => deleteProduct(p.id)}
              className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;