import { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";

const CreatedProduct = () => {
  const { createProduct } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("image", image);

    await createProduct(formData);

    setName("");
    setPrice("");
    setImage(null);
  };

  return (
    <div className="max-w-lg mx-auto mt-12 p-8 bg-[#FDFBF7] rounded-[2rem] shadow-[0_8px_30px_rgb(5,46,22,0.06)] border border-emerald-100">
      
      {/* Header with Earthy Vibe */}
      <div className="mb-8 text-center flex flex-col items-center">
        {/* Little decorative mushroom/nature icon */}
        <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-3">
          <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
          </svg>
        </div>
        <h2 className="text-3xl font-extrabold text-emerald-900 tracking-tight mb-2">
          Add New Variety
        </h2>
        <p className="text-emerald-700/70 text-sm font-medium">
          Enter the details of your new mushroom product.
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        
        {/* Product Name Input */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-bold text-emerald-900/80 pl-1">
            Product Name
          </label>
          <input
            type="text"
            placeholder="e.g., Lion's Mane Extract"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-5 py-3.5 bg-white border border-emerald-200 rounded-xl text-emerald-900 placeholder-black focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-500/15 focus:border-emerald-500 transition-all duration-300 shadow-sm"
            required
          />
        </div>

        {/* Price Input */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-bold text-emerald-900/80 pl-1">
            Price per unit
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              <span className="text-black font-bold">₹</span>
            </div>
            <input
              type="number"
              placeholder="0.00"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full pl-9 pr-5 py-3.5 bg-white border border-emerald-200 rounded-xl text-black placeholder-black focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-500/15 focus:border-emerald-500 transition-all duration-300 shadow-sm"
              required
            />
          </div>
        </div>

        {/* Nature-Themed File Upload (Dropzone) */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-bold text-emerald-900/80 pl-1">
            Product Image
          </label>
          <div className="relative flex flex-col items-center justify-center w-full py-8 border-2 border-dashed border-emerald-300 rounded-2xl bg-emerald-50/50 hover:bg-emerald-100/50 hover:border-emerald-400 transition-all duration-300 group cursor-pointer">
            
            {/* Hidden Input */}
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              required={!image}
            />
            
            {/* Visual Content */}
            <div className="flex flex-col items-center justify-center text-center px-4">
              <svg className="w-10 h-10 mb-3 text-emerald-600 group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
              </svg>
              {image ? (
                <p className="text-sm font-bold text-emerald-700 truncate max-w-[200px] bg-emerald-100 px-3 py-1 rounded-full">
                  {image.name}
                </p>
              ) : (
                <>
                  <p className="mb-1 text-sm text-emerald-800">
                    <span className="font-bold text-emerald-600">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-emerald-600/60 font-medium">High quality images yield better harvests (PNG, JPG)</p>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-4 w-full py-4 px-6 rounded-xl text-white font-bold tracking-wide bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-500/30 active:scale-[0.98] transition-all duration-200 shadow-[0_4px_20px_rgb(5,150,105,0.3)] flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
          </svg>
          Add to Product
        </button>
      </form>
    </div>
  );
};

export default CreatedProduct;