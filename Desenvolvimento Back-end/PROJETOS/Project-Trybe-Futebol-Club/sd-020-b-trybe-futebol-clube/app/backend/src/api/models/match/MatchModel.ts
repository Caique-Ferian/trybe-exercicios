import IModelMatch from '../../../interfaces/matchInterface/IModelMatch';
import { ICreateMatch, Score } from '../../../interfaces/matchInterface/IServiceMatch';
import Teams from '../../../database/models/TeamModel';
import Matches from '../../../database/models/MatchModel';

export default class MatchModel implements IModelMatch<Matches> {
  constructor(private matchModel: typeof Matches, private teamModel: typeof Teams = Teams) { }

  public async findAll(inProgress: boolean | undefined): Promise<Matches[]> {
    const matches = await this.matchModel.findAll({ include: [
      { model: Teams, as: 'teamHome' }, { model: Teams, as: 'teamAway' }] });
    return inProgress === undefined ? matches : matches.filter((e) => e.inProgress === inProgress);
  }

  public async create(match: ICreateMatch): Promise<Matches | null> {
    const { homeTeam, awayTeam } = match;
    const hasTeam = await Promise.all([homeTeam, awayTeam]
      .map(async (e) => !!await this.teamModel.findByPk(e)));
    if (hasTeam.includes(false)) return null;
    const newMatch = await this.matchModel.create(match);
    return newMatch as Matches;
  }

  public async update(id:number, score : Score | null): Promise<ICreateMatch | boolean | null> {
    const existMatch = await this.matchModel.findByPk(id);
    if (!existMatch) return null;
    if (!score && existMatch.inProgress) {
      await this.matchModel.update({ inProgress: false }, { where: { id } });
      return true;
    }
    await this.matchModel.update({ homeTeamGoals: score?.homeTeamGoals,
      awayTeamGoals: score?.awayTeamGoals }, { where: { id } });
    const updatedScore = await this.matchModel.findByPk(id);
    return updatedScore;
  }
}
