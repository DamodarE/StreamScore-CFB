const axios = require('axios');

const API_KEY = process.env.SPORTSDATA_API_KEY;
const BASE_URL = 'https://api.sportsdata.io/v3/cfb/scores/json';

const getWeeklyMatchups = async (season = 2024) => {
  if (!API_KEY) {
    throw new Error('SPORTSDATA_API_KEY is not set in environment variables');
  }
  try {
    const response = await axios.get(`${BASE_URL}/Games/${season}?key=${API_KEY}`);
    if (!response.data || response.data.length === 0) {
      throw new Error('No data received from Sports API');
    }
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('Error data:', error.response.data);
      console.error('Error status:', error.response.status);
      console.error('Error headers:', error.response.headers);
      throw new Error(`Sports API error: ${error.response.status} - ${JSON.stringify(error.response.data)}`);
    } else if (error.request) {
      console.error('Error request:', error.request);
      throw new Error('No response received from Sports API');
    } else {
      console.error('Error message:', error.message);
      throw new Error(`Error setting up request: ${error.message}`);
    }
  }
};

module.exports = { getWeeklyMatchups };
