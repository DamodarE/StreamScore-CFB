const express = require('express');
const router = express.Router();
const { getWeeklyMatchups } = require('../utils/sportsApi');
router.get('/', async (req, res) => {
  try {
    const season = 2024; // You can make this dynamic if needed
    const matchups = await getWeeklyMatchups(season);
    res.json(matchups);
  } catch (error) {
    console.error('Error in matchups route:', error);
    res.status(500).json({ 
      message: 'Error fetching matchups', 
      error: error.message || 'Unknown error',
      stack: process.env.NODE_ENV === 'production' ? '🥞' : error.stack
    });
  }
});

module.exports = router;