import React, { useState, useEffect } from "react";
import axios from "axios";
import SwipeCard from "./componets/SwipeCard";
import { MessageCircle, User as UserIcon, Sparkles } from "lucide-react";

const API_URL = "http://localhost:5000/api";

export default function App() {
  // 1. States for our App
  const [currentUserId, setCurrentUserId] = useState(null); // Ab hume hardcode ID nahi chahiye!
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [matchPopup, setMatchPopup] = useState(null);

  // Profile Form States
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "male",
    interestedIn: "female",
    image: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=1000&auto=format&fit=crop", // Default dummy photo
    bio: "",
  });
  // Photo upload handle karne wala function
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Photo ko Base64 string mein convert karke state mein daal diya
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };
  // 2. Register New User Function
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Backend ko data bhejo aur naya user banao
      const response = await axios.post(`${API_URL}/users/register`, formData);

      // MongoDB ne jo naya ID banaya hai, use save kar lo!
      setCurrentUserId(response.data._id);
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setLoading(false);
    }
  };

  // 3. Jab currentUserId mil jaye, tabhi Swipe cards laao
  useEffect(() => {
    if (currentUserId) {
      const fetchProfiles = async () => {
        setLoading(true);
        try {
          const response = await axios.get(`${API_URL}/users/recommendations/${currentUserId}`);
          setProfiles(response.data);
        } catch (error) {
          console.error("Error fetching profiles:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchProfiles();
    }
  }, [currentUserId]); // Jab bhi ID change hogi, ye function chalega

  // 4. Handle Swipe Logic
  const handleSwipe = async (swipedUserId, action) => {
    setProfiles((prev) => prev.filter((p) => p._id !== swipedUserId));

    try {
      const response = await axios.post(`${API_URL}/swipe`, {
        currentUserId: currentUserId, // Hamari aisi ID jo abhi form se mili hai
        swipedUserId: swipedUserId,
        action: action
      });

      if (response.data.match) {
        setMatchPopup("IT'S A MATCH! 🎉");
        setTimeout(() => setMatchPopup(null), 3000);
      }
    } catch (error) {
      console.error("Error saving swipe:", error);
    }
  };


  // ==========================================
  // UI RENDER: IF NOT REGISTERED -> SHOW FORM
  // ==========================================
  if (!currentUserId) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-100 p-4">
        <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md">
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-orange-400 mb-6 text-center">
            Create Profile
          </h1>
          <form onSubmit={handleRegister} className="flex flex-col gap-4">

            <input type="text" placeholder="Your Name" required className="p-3 border rounded-xl bg-slate-50 outline-none focus:border-rose-400"
              value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />

            <input type="number" placeholder="Your Age" required min="18" className="p-3 border rounded-xl bg-slate-50 outline-none focus:border-rose-400"
              value={formData.age} onChange={(e) => setFormData({ ...formData, age: e.target.value })} />

            <div className="flex gap-4">
              <div className="flex-1">
                <label className="text-xs text-slate-500 ml-1">I am a:</label>
                <select className="w-full p-3 border rounded-xl bg-slate-50 outline-none"
                  value={formData.gender} onChange={(e) => setFormData({ ...formData, gender: e.target.value })}>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="text-xs text-slate-500 ml-1">Looking for:</label>
                <select className="w-full p-3 border rounded-xl bg-slate-50 outline-none"
                  value={formData.interestedIn} onChange={(e) => setFormData({ ...formData, interestedIn: e.target.value })}>
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                  <option value="both">Both</option>
                </select>
              </div>
            </div>

            {/* <input type="text" placeholder="Profile Image URL" className="p-3 border rounded-xl bg-slate-50 outline-none focus:border-rose-400"
              value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} /> */}

            <textarea placeholder="Write a short bio..." rows="2" className="p-3 border rounded-xl bg-slate-50 outline-none focus:border-rose-400 resize-none"
              value={formData.bio} onChange={(e) => setFormData({ ...formData, bio: e.target.value })} />

            <button type="submit" disabled={loading} className="mt-4 p-4 rounded-xl bg-gradient-to-r from-rose-500 to-orange-400 text-white font-bold text-lg hover:opacity-90 transition shadow-lg flex justify-center">
              {loading ? "Creating..." : "Start Swiping 🚀"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ==========================================
  // UI RENDER: IF REGISTERED -> SHOW SWIPE DECK
  // ==========================================
  return (
    <div className="flex flex-col items-center justify-between h-screen w-full relative overflow-hidden bg-slate-100">

      {/* Navbar */}
      <nav className="w-full max-w-md flex justify-between items-center p-4 bg-white shadow-sm z-10">
        <UserIcon className="text-slate-400 hover:text-rose-500 cursor-pointer transition" size={28} />
        <h1 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-orange-400 tracking-tighter flex items-center gap-1">
          <Sparkles className="text-rose-500" size={20} /> Matchr
        </h1>
        <MessageCircle className="text-slate-400 hover:text-rose-500 cursor-pointer transition" size={28} />
      </nav>

      {/* Match Popup Overlay */}
      {matchPopup && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-orange-500 animate-bounce text-center drop-shadow-2xl">
            {matchPopup}
          </h1>
        </div>
      )}
{/* 📸 Modern Image Upload UI with Preview */}
            <div className="flex flex-col items-center gap-3 mt-2">
              {formData.image ? (
                // Agar photo select ho gayi toh Preview dikhao
                <div className="relative">
                  <img src={formData.image} alt="Profile Preview" className="w-28 h-28 rounded-full object-cover border-4 border-rose-100 shadow-md" />
                  <button type="button" onClick={() => setFormData({...formData, image: ""})} className="absolute bottom-0 right-0 bg-red-500 text-white p-1 rounded-full shadow-lg text-xs">
                    ✕
                  </button>
                </div>
              ) : (
                // Agar photo nahi hai toh Upload button dikhao
                <label className="w-full text-center p-6 border-2 border-dashed border-rose-200 rounded-2xl cursor-pointer hover:bg-rose-50 transition duration-300">
                  <span className="text-rose-500 font-medium text-lg flex flex-col items-center gap-2">
                    <Sparkles size={24} />
                    Tap to Upload Profile Photo
                  </span>
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} required />
                </label>
              )}
            </div>
      {/* Card Deck Area */}
      <div className="relative flex-1 flex items-center justify-center w-full max-w-md">
        {loading ? (
          <div className="animate-pulse flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-rose-200 mb-4" />
            <p className="text-slate-500">Finding matches near you...</p>
          </div>
        ) : profiles.length === 0 ? (
          <div className="text-slate-400 text-center">
            <p className="text-xl">No more profiles near you.</p>
            <p className="text-sm mt-2">Check back later!</p>
          </div>
        ) : (
          profiles.slice().reverse().map((profile) => (
            <SwipeCard key={profile._id} profile={profile} handleSwipe={handleSwipe} />
          ))
        )}
      </div>

      {/* Bottom Buttons */}
      <div className="flex gap-8 pb-10 z-10">
        <button
          onClick={() => profiles.length && handleSwipe(profiles[0]?._id, "left")}
          className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-xl text-red-500 text-3xl hover:bg-red-50 hover:scale-110 transition duration-300"
        >
          ✕
        </button>
        <button
          onClick={() => profiles.length && handleSwipe(profiles[0]?._id, "right")}
          className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-xl text-green-500 text-3xl hover:bg-green-50 hover:scale-110 transition duration-300"
        >
          ♥
        </button>
      </div>

    </div>
  );
}