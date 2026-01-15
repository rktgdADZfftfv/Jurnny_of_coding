const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// --- YAHAN CHANGE KARNA HAI ---
// Apna copied link yaha paste karo.
// <password> ki jagah apna asli password likho (e.g., admin123)
const DB_URI = "mongodb+srv://rk123:rk123@cluster0.kcsu8yb.mongodb.net/";

mongoose.connect(DB_URI)
  .then(() => console.log("✅ Cloud Database Connected!"))
  .catch(err => console.log("❌ Error:", err));
// ------------------------------

// 2. Task ka Design (Schema)
const TaskSchema = new mongoose.Schema({
  name: String,
  lat: Number,
  lng: Number,
  completed: { type: Boolean, default: false }
});

const Task = mongoose.model('Task', TaskSchema);

// API Routes
app.post('/api/tasks', async (req, res) => {
  try {
    const newTask = new Task(req.body);
    await newTask.save();
    res.json(newTask);
    console.log("Task Saved:", req.body.name);
  } catch (error) {
    res.status(500).json({ error: "Save nahi hua" });
  }
});

app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Tasks fetch nahi huye" });
  }
});

app.delete('/api/tasks/:id', async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

app.listen(5000, () => {
  console.log("🚀 Server running on port 5000");
});
