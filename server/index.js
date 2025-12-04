const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '2mb' }));

// Connect to MongoDB
// Prefer `MONGO_URI` (matches `.env.example`) but also accept `MONGODB_URI` for compatibility.
const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/biology-in-data';
const isAtlas = MONGO_URI.startsWith('mongodb+srv:');
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  if (isAtlas) {
    console.log('Connected to MongoDB Atlas (MONGO_URI)');
  } else {
    console.log('Connected to local MongoDB');
  }
}).catch((err) => console.error('MongoDB connection error', err));

// Routes
const researchRouter = require('./routes/research');
app.use('/api/research', researchRouter);

// Health
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
