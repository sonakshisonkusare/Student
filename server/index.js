import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import User from './models/User.js';  // <-- Import model
const connectDB = require('./config/db');

// Import Models
require('./models/User');
require('./models/Admin');
require('./models/Student');
require('./models/ProjectGroup');
require('./models/Document');

//connect to Database
connectDB();

dotenv.config();
const app = express();

//middleware
app.use(cors());

//app.use(express.json());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/students', require('./routes/students'));
app.use('/api/projects', require('./routes/projectGroups'));
app.use('/api/documents', require('./routes/documents'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    success: false, 
    message: 'Route not found' 
  });
});

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

//done by me...

// app.listen(PORT, () => {
//   console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
// });

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

module.exports = app;
