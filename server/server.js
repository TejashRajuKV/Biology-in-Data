require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const authRoutes = require('./routes/auth');

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/authdb';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => res.json({ ok: true, message: 'Auth server running' }));

async function start() {
  if (!process.env.MONGO_URI) {
    console.warn('MONGO_URI not set — falling back to local MongoDB');
  }

  try {
    await mongoose.connect(MONGO_URI);
    const isAtlas = MONGO_URI.startsWith('mongodb+srv:');
    if (isAtlas) {
      console.log('Connected to MongoDB Atlas (MONGO_URI)');
    } else {
      console.log('Connected to local MongoDB');
    }
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  }
}

start();
