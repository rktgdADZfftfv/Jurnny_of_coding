require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./models/User");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
// Middleware (Ye limit badhani zaruri hai taaki photo upload fail na ho)
app.use(cors());
app.use(express.json({ limit: '10mb' })); 
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Connect to MongoDB
const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://dating:1234@cluster0.3yo7nmu.mongodb.net/?appName=Cluster0";
mongoose.connect(MONGO_URI)
  .then(() => console.log("🔥 Connected to MongoDB Database"))
  .catch(err => console.log("DB Connection Error:", err));


// ==========================================
// ROUTES
// ==========================================

// 1. REGISTER NEW USER (Ye route 404 de raha tha, ab nahi dega!)
app.post("/api/users/register", async (req, res) => {
  try {
    console.log("Frontend se ye data aaya:", req.body); // terminal me check karne ke liye

    // Age ko strictly number banana zaroori hai
    const userData = {
      ...req.body,
      age: Number(req.body.age)
    };

    const newUser = new User(userData);
    await newUser.save();
    console.log("Success! Naya User ban gaya:", newUser.name);
    
    res.json(newUser);
  } catch (error) {
    // AB ASLI ERROR TERMINAL MEIN DIKHEGA!
    console.error("💥 MONGODB REJECTED IT! Error:", error.message); 
    res.status(500).json({ error: error.message }); // React ko bhi error bhejo
  }
});

// 2. CREATE DUMMY USERS (Browser mein kholne ke liye)
app.get("/api/users/seed", async (req, res) => {
  try {
    const dummyUsers = [
      { name: "Priya", age: 24, bio: "Coffee addict & dog mom 🐶", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330", gender: "female", interestedIn: "male" },
      { name: "Rahul", age: 27, bio: "Photographer 📸 Let's go on an adventure.", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e", gender: "male", interestedIn: "female" },
      { name: "Anjali", age: 22, bio: "Sushi lover. Engineer by day.", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb", gender: "female", interestedIn: "male" },
    ];
    await User.insertMany(dummyUsers);
    res.json({ message: "Dummy users added successfully!" });
  } catch (err) {
    res.status(500).json({ error: "Failed to seed users", details: err.message });
  }
});

// 3. GET ALL USERS (Testing ke liye)
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// 4. GET RECOMMENDATIONS (Swipe Cards laane ke liye)
app.get("/api/users/recommendations/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const currentUser = await User.findById(userId);

    if (!currentUser) return res.status(404).json({ error: "User not found" });

    const excludedIds = [
      ...currentUser.likedUsers, 
      ...currentUser.passedUsers, 
      currentUser._id
    ];

    // Humare gender preference ke hisab se logo ko dhoondo
    // Note: Agar interestedIn "both" hai, toh gender filter mat lagao
    let query = { _id: { $nin: excludedIds } };
    if (currentUser.interestedIn !== "both") {
      query.gender = currentUser.interestedIn;
    }

    const recommendations = await User.find(query).limit(10);
    res.json(recommendations);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// 5. HANDLE SWIPE (Left/Right)
app.post("/api/swipe", async (req, res) => {
  try {
    const { currentUserId, swipedUserId, action } = req.body;
    
    const currentUser = await User.findById(currentUserId);
    const swipedUser = await User.findById(swipedUserId);

    if (action === "right") {
      currentUser.likedUsers.push(swipedUserId);
      
      if (swipedUser.likedUsers.includes(currentUserId)) {
        currentUser.matches.push(swipedUserId);
        swipedUser.matches.push(currentUserId);
        await swipedUser.save();
        await currentUser.save();
        return res.json({ match: true, message: "It's a Match! 🎉" });
      }
    } else {
      currentUser.passedUsers.push(swipedUserId);
    }

    await currentUser.save();
    res.json({ match: false, message: "Swipe recorded" });

  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Node.js Backend is running on http://localhost:${PORT}`);
});