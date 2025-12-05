const mongoose = require('mongoose');

const researchSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    authors: {
        type: [String],
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    abstract: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    tags: {
        type: [String],
        default: [],
    },
    chartData: {
        type: Object, // Flexible to store different chart configurations
        default: null,
    },
    chartJson: {
        type: Object, // Keeping both for compatibility if needed, or just use one
        default: null,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        // required: true, // Make optional for now to allow easier testing without auth
    },
}, {
    timestamps: true,
});

const Research = mongoose.model('Research', researchSchema);

module.exports = Research;
