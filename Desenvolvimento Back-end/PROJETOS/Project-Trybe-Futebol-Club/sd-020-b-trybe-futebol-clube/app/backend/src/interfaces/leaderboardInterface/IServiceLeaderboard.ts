import Teams from '../../database/models/TeamModel';
import Matches from '../../database/models/MatchModel';

export interface ILeaderboard {
  name: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: string,
}

export interface ITeamsHome extends Teams {
  teamHome: Matches[],
}

export interface ITeamsAway extends Teams {
  teamAway: Matches[],
}

export type result = {
  code: number
  leaderboard: ILeaderboard[],
};

export default interface IServiceLeaderboard {
  home(): Promise<result>,
  away(): Promise<result>,
  leaderboard(): Promise<result>
}
