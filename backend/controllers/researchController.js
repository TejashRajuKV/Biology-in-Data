const Research = require('../models/Research');

// @desc    Create new research
// @route   POST /api/research
// @access  Public (for now)
const createResearch = async (req, res) => {
    try {
        const { title, authors, year, abstract, category, tags, chartData, chartJson } = req.body;

        const research = await Research.create({
            title,
            authors,
            year,
            abstract,
            category,
            tags,
            chartData: chartData || chartJson, // Use whichever is provided
            chartJson: chartJson || chartData,
        });

        res.status(201).json(research);
    } catch (error) {
        console.error('Error creating research:', error);
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all research
// @route   GET /api/research
// @access  Public
const listResearch = async (req, res) => {
    try {
        const research = await Research.find({}).sort({ createdAt: -1 });
        res.json(research);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete research
// @route   DELETE /api/research/:id
// @access  Public (for now)
const deleteResearch = async (req, res) => {
    try {
        const research = await Research.findById(req.params.id);

        if (research) {
            await research.deleteOne();
            res.json({ message: 'Research removed' });
        } else {
            res.status(404).json({ message: 'Research not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createResearch,
    listResearch,
    deleteResearch,
};
