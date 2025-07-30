import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import User from './models/User.js';  // <-- Import model


dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Connect to MongoDB
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.error("❌ Connection error:", err));

// Route using the model
app.post('/add-user', async (req, res) => {
  try {
    const user = new User(req.body); // Create new user with request data
    await user.save(); // Save to DB
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


require('dotenv').config();

const generateToken = require('./utils/jwt'); 

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  if (email === 'admin@example.com' && password === '1234') {
    const user = { id: 1, email }; 
    const token = generateToken(user);
    return res.json({ token });
  }

  res.status(401).json({ message: 'Invalid credentials' });
});

app.listen(3000, () => console.log('Server running on port 3000'));
