import React from 'react';
import './Matchups.css';
const MatchupItem = ({ matchup }) => {
  const { HomeTeam, AwayTeam, Date, HomeTeamScore, AwayTeamScore, HomeTeamLogo, AwayTeamLogo } = matchup;
  const matchHappened = HomeTeamScore !== null && AwayTeamScore !== null;

  const formatDate = (dateString) => {
    if (!dateString) return 'TBA';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'UTC'
    });
  };

  return (
    <div className="matchup-item">
      <div className="team home-team">
        <span className="team-name">{HomeTeam}</span>
        {matchHappened && <span className="score">{HomeTeamScore}</span>}
        <img src={HomeTeamLogo} alt={`${HomeTeam} logo`} className="team-logo" />
      </div>
      <div className="matchup-info">
        <span className="versus">VS</span>
        <span className="date">{formatDate(Date)}</span>
      </div>
      <div className="team away-team">
        <img src={AwayTeamLogo} alt={`${AwayTeam} logo`} className="team-logo" />
        {matchHappened && <span className="score">{AwayTeamScore}</span>}
        <span className="team-name">{AwayTeam}</span>
      </div>
    </div>
  );
};
export default MatchupItem;
