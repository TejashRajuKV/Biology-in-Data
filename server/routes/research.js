const express = require('express');
const router = express.Router();
const Research = require('../models/Research');
const auth = require('../middleware/auth');
const { adminOnly } = require('../middleware/auth');

// GET /api/research
// Returns list of all research documents (most recent first)
router.get('/', async (req, res) => {
  try {
    let docs = await Research.find({}).sort({ createdAt: -1 }).lean();
    // normalize each document so callers receive an `id` field in addition to `_id`
    docs = docs.map((d) => ({ ...(d || {}), id: d._id }));
    res.json(docs);
  } catch (err) {
    console.error('Error fetching research', err);
    res.status(500).json({ error: 'Server error while fetching research' });
  }
});

// POST /api/research (Admin only)
// Accepts a research payload and saves it to MongoDB
router.post('/', auth, adminOnly, async (req, res) => {
  try {
    const { title, authors, year, category, abstract, tags, chartJson } = req.body;

    // Basic validation
    if (!title || !abstract) {
      return res.status(400).json({ error: 'Missing required fields: title and abstract' });
    }

    // Parse authors from comma-separated string or array
    let authorArray = [];
    if (typeof authors === 'string') {
      authorArray = authors.split(',').map(a => a.trim()).filter(a => a.length > 0);
    } else if (Array.isArray(authors)) {
      authorArray = authors;
    }

    // Parse tags from comma-separated string or array
    let tagArray = [];
    if (typeof tags === 'string') {
      tagArray = tags.split(',').map(t => t.trim()).filter(t => t.length > 0);
    } else if (Array.isArray(tags)) {
      tagArray = tags;
    }

    // Parse chartJson if it's a string
    let chart = null;
    if (typeof chartJson === 'string' && chartJson.trim()) {
      try {
        chart = JSON.parse(chartJson);
      } catch (e) {
        return res.status(400).json({ error: 'Invalid chartJson format' });
      }
    } else if (chartJson && typeof chartJson === 'object') {
      chart = chartJson;
    }

    const doc = new Research({
      title,
      authors: authorArray,
      year: year || new Date().getFullYear().toString(),
      category,
      abstract,
      tags: tagArray,
      chartJson: chart,
    });

    const saved = await doc.save();
    res.status(201).json({ id: saved._id, message: 'Research uploaded successfully' });
  } catch (err) {
    console.error('Error saving research', err);
    res.status(500).json({ error: 'Server error while saving research' });
  }
});

// DELETE /api/research/:id (Admin only)
// Deletes a research document by ID
router.delete('/:id', auth, adminOnly, async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Research.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Research not found' });
    }
    res.json({ message: 'Research deleted successfully' });
  } catch (err) {
    console.error('Error deleting research', err);
    res.status(500).json({ error: 'Server error while deleting research' });
  }
});

module.exports = router;
