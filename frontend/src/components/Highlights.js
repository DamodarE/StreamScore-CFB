import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactPlayer from 'react-player';

const Highlights = () => {
  const [highlights, setHighlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchHighlights();
  }, []);

  const fetchHighlights = async (query = '') => {
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:5000/api/highlights?q=${query}&maxResults=15`);
      setHighlights(res.data);
      if (res.data.length > 0) {
        setSelectedVideo(res.data[0]);
      }
      setLoading(false);
    } catch (err) {
      console.error('Error fetching highlights:', err.response ? err.response.data : err.message);
      setError(`Failed to load highlights. ${err.response ? err.response.data.message : err.message}`);
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchHighlights(searchQuery);
  };

  if (loading) return <div className="loading">Loading highlights...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="highlights">
      <div className="video-player-container">
        {selectedVideo && (
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${selectedVideo.videoId}`}
            width="100%"
            height="100%"
            controls
            className="react-player"
          />
        )}
      </div>
      <div className="highlights-menu">
        {highlights.map(highlight => (
          <div 
            key={highlight.videoId} 
            className={`highlight-item ${selectedVideo && selectedVideo.videoId === highlight.videoId ? 'selected' : ''}`}
            onClick={() => setSelectedVideo(highlight)}
          >
            <img src={highlight.thumbnailUrl} alt={highlight.title} />
            <div className="highlight-item-content">
              <h3>{highlight.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Highlights;