const express = require('express');
const router = express.Router();
const { createResearch, listResearch, deleteResearch } = require('../controllers/researchController');

router.route('/')
    .post(createResearch)
    .get(listResearch);

router.route('/:id')
    .delete(deleteResearch);

module.exports = router;
