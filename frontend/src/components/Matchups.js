import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MatchupItem from './MatchupItem';
import './Matchups.css';

const Matchups = () => {
  const [matchups, setMatchups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedWeek, setSelectedWeek] = useState(1);

  useEffect(() => {
    const fetchMatchups = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/matchups');
        const sortedMatchups = response.data.sort((a, b) => new Date(a.Date) - new Date(b.Date));
        setMatchups(sortedMatchups);
        setLoading(false);
      } catch (err) {
        console.error('Error object:', err);
        setError(`Failed to fetch matchups: ${err.response?.data?.message || err.message || 'Unknown error'}`);
        setLoading(false);
      }
    };

    fetchMatchups();
  }, []);

  if (loading) return <div>Loading matchups...</div>;
  if (error) return <div className="error-message">{error}</div>;

  const weeks = [...new Set(matchups.map(m => m.Week))].sort((a, b) => a - b);
  const currentWeekMatchups = matchups.filter(m => m.Week === selectedWeek);

  return (
    <div className="matchups-container">
      <h2>College Football Matchups</h2>
      <div className="week-selector">
        {weeks.map(week => (
          <button
            key={week}
            onClick={() => setSelectedWeek(week)}
            className={selectedWeek === week ? 'active' : ''}
          >
            Week {week}
          </button>
        ))}
      </div>
      <div className="matchups-list">
        {currentWeekMatchups.map(matchup => (
          <MatchupItem key={matchup.GameID} matchup={matchup} />
        ))}
      </div>
    </div>
  );
};

export default Matchups;
