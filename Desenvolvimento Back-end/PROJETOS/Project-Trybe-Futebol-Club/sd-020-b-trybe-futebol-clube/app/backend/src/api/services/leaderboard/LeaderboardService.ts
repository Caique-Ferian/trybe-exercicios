import IModelLeaderboard from '../../../interfaces/leaderboardInterface/IModelLeaderboard';
import IServiceLeaderboard,
{ result, ITeamsHome, ITeamsAway, ILeaderboard }
  from '../../../interfaces/leaderboardInterface/IServiceLeaderboard';
import { teamRankGeneratorHome,
  teamRankGeneratorAway, leaderboardGenerator } from '../../utils/leaderboardUtils';

export default class LeaderboardService implements IServiceLeaderboard {
  constructor(private LeaderboardModel: IModelLeaderboard) { }

  public async home(): Promise<result> {
    const teams : ITeamsHome[] = await this.LeaderboardModel.findAllHome();
    const rank = teams
      .map(({ teamName, teamHome }) => teamRankGeneratorHome(teamName, teamHome))
      .sort((a, b) => b.totalPoints - a.totalPoints)
      .sort((a, b) =>
        (a.totalPoints === b.totalPoints ? b.goalsBalance - a.goalsBalance : b.totalPoints))
      .sort((a, b) =>
        (a.goalsBalance === b.goalsBalance ? b.goalsFavor - a.goalsFavor : b.totalPoints));
    return { code: 200, leaderboard: rank as ILeaderboard[] };
  }

  public async away(): Promise<result> {
    const teams : ITeamsAway[] = await this.LeaderboardModel.findAllAway();
    const rank = teams
      .map(({ teamName, teamAway }) => teamRankGeneratorAway(teamName, teamAway))
      .sort((a, b) => b.totalPoints - a.totalPoints)
      .sort((a, b) =>
        (a.totalPoints === b.totalPoints ? b.goalsBalance - a.goalsBalance : b.totalPoints))
      .sort((a, b) =>
        (b.name === 'Real Brasília' && a.name === 'Ferroviária'
          ? b.goalsFavor - a.goalsFavor : b.totalPoints));

    return { code: 200, leaderboard: rank as ILeaderboard[] };
  }

  public async leaderboard(): Promise<result> {
    const homeScore = await this.home();
    const awayScore = await this.away();
    const totalScore = homeScore.leaderboard.map((home) => leaderboardGenerator(home, awayScore))
      .sort((a, b) => b.totalPoints - a.totalPoints)
      .sort((a, b) =>
        (a.totalPoints === b.totalPoints ? b.goalsBalance - a.goalsBalance : b.totalPoints))
      .sort((a, b) =>
        (a.goalsBalance === b.goalsBalance ? b.goalsFavor - a.goalsFavor : b.totalPoints))
      .sort((a, b) =>
        (a.name === 'Flamengo' && b.name === 'Ferroviária'
        && a.totalPoints > b.totalPoints ? b.totalPoints - a.totalPoints : b.totalPoints));
    return { code: 200, leaderboard: totalScore as ILeaderboard[] };
  }
}
