const mongoose = require('mongoose');

const ResearchSchema = new mongoose.Schema({
  title: { type: String, required: true },
  authors: { type: [String], default: [] },
  year: { type: String },
  category: { type: String },
  abstract: { type: String },
  tags: { type: [String], default: [] },
  chartJson: { type: mongoose.Schema.Types.Mixed },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Research', ResearchSchema);
