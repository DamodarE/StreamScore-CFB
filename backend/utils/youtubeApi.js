const { google } = require('googleapis');

const youtube = google.youtube({
  version: 'v3',
  auth: process.env.YOUTUBE_API_KEY // You'll need to set this in your environment variables
});

async function searchNFLHighlights(query, maxResults = 10) {
  try {
    const response = await youtube.search.list({
      part: 'snippet',
      q: query + ' College Football highlights',
      type: 'video',
      maxResults: maxResults
    });

    return response.data.items.map(item => ({
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnailUrl: item.snippet.thumbnails.medium.url,
      videoId: item.id.videoId
    }));
  } catch (error) {
    console.error('Error searching YouTube:', error);
    throw error;
  }
}

module.exports = { searchNFLHighlights };
