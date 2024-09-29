const express = require('express');
const router = express.Router();
const { searchNFLHighlights } = require('../utils/youtubeApi');
// @route   GET api/highlights
// @desc    Get NFL highlights from YouTube
// @access  Public
router.get('/', async (req, res) => {
  try {
    const query = req.query.q || 'NFL highlights';
    const maxResults = req.query.maxResults || 10;
    const highlights = await searchNFLHighlights(query, maxResults);
    res.json(highlights);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
// @route   GET api/highlights/:id
// @desc    Get highlight by ID
// @access  Public
router.get('/:id', (req, res) => {
  res.json({ msg: `Get highlight with id ${req.params.id}` });
});
// @route   POST api/highlights
// @desc    Create a new highlight
// @access  Private
router.post('/', (req, res) => {
  res.json({ msg: 'Create a new highlight' });
});

module.exports = router;