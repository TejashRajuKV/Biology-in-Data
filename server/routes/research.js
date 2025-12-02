const express = require('express');
const router = express.Router();
const Research = require('../models/Research');

// POST /api/research
// Accepts a research payload and saves it to MongoDB
router.post('/', async (req, res) => {
  try {
    const { title, authors, year, category, abstract, tags, chartJson } = req.body;

    // Basic validation
    if (!title || !authors || !Array.isArray(authors) || authors.length === 0) {
      return res.status(400).json({ error: 'Missing required fields: title and authors array required' });
    }

    const doc = new Research({
      title,
      authors,
      year,
      category,
      abstract,
      tags: Array.isArray(tags) ? tags : [],
      chartJson: chartJson || null,
    });

    const saved = await doc.save();
    res.status(201).json({ id: saved._id });
  } catch (err) {
    console.error('Error saving research', err);
    res.status(500).json({ error: 'Server error while saving research' });
  }
});

module.exports = router;
