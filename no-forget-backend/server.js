const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// 1. Database Connection (MongoDB)
// Agar aapke PC me MongoDB installed nahi hai, to ye error dega.
// Filhal hum Local DB use kar rahe hain.
mongoose.connect('mongodb://127.0.0.1:27017/no-forget')
  .then(() => console.log("✅ Database Connected!"))
  .catch(err => console.error("❌ Database Error:", err));

// 2. Task ka Design (Schema)
const TaskSchema = new mongoose.Schema({
  name: String,
  lat: Number,
  lng: Number,
  completed: { type: Boolean, default: false }
});

const Task = mongoose.model('Task', TaskSchema);

// 3. API Routes (Frontend yaha se baat karega)

// A. Task Save karna

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

// B. Saare Tasks lana (Load hone par)
app.get('/api/tasks', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// C. Task Delete karna
app.delete('/api/tasks/:id', async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

// Server Start
app.listen(5000, () => {
  console.log("🚀 Server running on port 5000");
});
