// import * as sequelize from 'sequelize';
import IModelLeaderboard from '../../../interfaces/leaderboardInterface/IModelLeaderboard';
import Teams from '../../../database/models/TeamModel';
import Matches from '../../../database/models/MatchModel';
import { ITeamsHome, ITeamsAway }
  from '../../../interfaces/leaderboardInterface/IServiceLeaderboard';

export default class LeaderboardModel implements IModelLeaderboard {
  constructor(private teamModel: typeof Teams) { }

  public async findAllHome(): Promise<ITeamsHome[]> {
    const teams = await this.teamModel.findAll({
      include: [
        { model: Matches, as: 'teamHome', where: { inProgress: false } }] });
    return teams as ITeamsHome[];
  }

  public async findAllAway(): Promise<ITeamsAway[]> {
    const teams = await this.teamModel.findAll({
      include: [
        { model: Matches, as: 'teamAway', where: { inProgress: false } }] });
    return teams as ITeamsAway[];
  }
}
