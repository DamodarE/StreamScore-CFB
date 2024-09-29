import React from 'react';
import MatchupItem from './MatchupItem';

const WeeklyMatchups = ({ matchups, week }) => {
  const leagues = [...new Set(matchups.map(m => m.League))].sort();

  return (
    <div className="weekly-matchups">
      <h3>Week {week}</h3>
      {leagues.map(league => (
        <div key={league} className="league-matchups">
          <h4>{league}</h4>
          <div className="matchups-grid">
            {matchups
              .filter(m => m.League === league)
              .map(matchup => (
                <MatchupItem
                  key={matchup.GameID}
                  homeTeam={matchup.HomeTeam}
                  awayTeam={matchup.AwayTeam}
                  date={matchup.Date}
                  homeScore={matchup.HomeTeamScore}
                  awayScore={matchup.AwayTeamScore}
                  homeConference={matchup.HomeTeamConference}
                  awayConference={matchup.AwayTeamConference}
                  homeTeamLogo={matchup.HomeTeamLogo}
                  awayTeamLogo={matchup.AwayTeamLogo}
                />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default WeeklyMatchups;
