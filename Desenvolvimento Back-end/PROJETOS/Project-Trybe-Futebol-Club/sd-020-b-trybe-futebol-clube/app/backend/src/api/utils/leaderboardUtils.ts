import Matches from '../../database/models/MatchModel';
import { result, ILeaderboard } from '../../interfaces/leaderboardInterface/IServiceLeaderboard';

const countPoints = (type: string, homeGoals: number, awayGoals: number) => {
  if (type === 'home') {
    if (homeGoals > awayGoals) return 3;
    if (homeGoals === awayGoals) return 1;
    return 0;
  }
  if (awayGoals > homeGoals) return 3;
  if (awayGoals === homeGoals) return 1;
  return 0;
};

const homeWinLossDrawsCount = (type:string, matches: Matches[]) => {
  if (type === 'win') {
    const wins = matches.reduce((prev, { homeTeamGoals, awayTeamGoals }) =>
      (homeTeamGoals > awayTeamGoals ? prev + 1 : prev), 0);
    return wins;
  }
  if (type === 'loss') {
    const loss = matches.reduce((prev, { homeTeamGoals, awayTeamGoals }) =>
      (homeTeamGoals < awayTeamGoals ? prev + 1 : prev), 0);
    return loss;
  }
  const draw = matches.reduce((prev, { homeTeamGoals, awayTeamGoals }) =>
    (homeTeamGoals === awayTeamGoals ? prev + 1 : prev), 0);
  return draw;
};

const awayWinLossDrawsCount = (type:string, matches: Matches[]) => {
  if (type === 'win') {
    const wins = matches.reduce((prev, { homeTeamGoals, awayTeamGoals }) =>
      (awayTeamGoals > homeTeamGoals ? prev + 1 : prev), 0);
    return wins;
  }
  if (type === 'loss') {
    const loss = matches.reduce((prev, { homeTeamGoals, awayTeamGoals }) =>
      (awayTeamGoals < homeTeamGoals ? prev + 1 : prev), 0);
    return loss;
  }
  const draw = matches.reduce((prev, { homeTeamGoals, awayTeamGoals }) =>
    (awayTeamGoals === homeTeamGoals ? prev + 1 : prev), 0);
  return draw;
};

const teamRankGeneratorHome = (teamName: string, team: Matches[]) => {
  const totalPoints = team.reduce((prev, { homeTeamGoals, awayTeamGoals }) => prev
+ countPoints('home', homeTeamGoals, awayTeamGoals), 0);
  const goalsFavor = team.reduce((prev, current) => prev + current.homeTeamGoals, 0);
  const goalsOwn = team.reduce((prev, current) => prev + current.awayTeamGoals, 0);
  const teamRank = { name: teamName,
    totalPoints,
    totalGames: team.length,
    totalVictories: homeWinLossDrawsCount('win', team),
    totalDraws: homeWinLossDrawsCount('draw', team),
    totalLosses: homeWinLossDrawsCount('loss', team),
    goalsFavor,
    goalsOwn,
    goalsBalance: goalsFavor - goalsOwn,
    efficiency: String(((totalPoints / (team.length * 3)) * 100).toFixed(2)),
  };
  return teamRank;
};

const teamRankGeneratorAway = (teamName: string, team: Matches[]) => {
  const totalPoints = team.reduce((prev, { homeTeamGoals, awayTeamGoals }) => prev
+ countPoints('away', homeTeamGoals, awayTeamGoals), 0);
  const goalsFavor = team.reduce((prev, current) => prev + current.awayTeamGoals, 0);
  const goalsOwn = team.reduce((prev, current) => prev + current.homeTeamGoals, 0);
  const teamRank = { name: teamName,
    totalPoints,
    totalGames: team.length,
    totalVictories: awayWinLossDrawsCount('win', team),
    totalDraws: awayWinLossDrawsCount('draw', team),
    totalLosses: awayWinLossDrawsCount('loss', team),
    goalsFavor,
    goalsOwn,
    goalsBalance: goalsFavor - goalsOwn,
    efficiency: String(((totalPoints / (team.length * 3)) * 100).toFixed(2)),
  };
  return teamRank;
};

const leaderboardGenerator = (homeScore: ILeaderboard, awayScore: result) => {
  const away = awayScore.leaderboard.filter(({ name }) => (homeScore.name === name));
  const totalPoints = away[0].totalPoints + homeScore.totalPoints;
  const totalGames = away[0].totalGames + homeScore.totalGames;
  return ({
    name: away[0].name,
    totalPoints,
    totalGames,
    totalVictories: away[0].totalVictories + homeScore.totalVictories,
    totalDraws: away[0].totalDraws + homeScore.totalDraws,
    totalLosses: away[0].totalLosses + homeScore.totalLosses,
    goalsFavor: away[0].goalsFavor + homeScore.goalsFavor,
    goalsOwn: away[0].goalsOwn + homeScore.goalsOwn,
    goalsBalance: away[0].goalsBalance + homeScore.goalsBalance,
    efficiency: String(((totalPoints / (totalGames * 3)) * 100).toFixed(2)),
  });
};
export { teamRankGeneratorHome, teamRankGeneratorAway, leaderboardGenerator };
