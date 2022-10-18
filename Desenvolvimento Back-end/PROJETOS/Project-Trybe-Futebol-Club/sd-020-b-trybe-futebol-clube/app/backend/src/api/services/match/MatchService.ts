import Matches from '../../../database/models/MatchModel';
import IModelMatch from '../../../interfaces/matchInterface/IModelMatch';
import IServiceMatch,
{ result, ICreateMatch, Score } from '../../../interfaces/matchInterface/IServiceMatch';

export default class MatchService implements IServiceMatch {
  constructor(private MatchModel: IModelMatch<Matches>) { }

  public async findAll(inProgress: boolean | undefined): Promise<result> {
    const matches = await this.MatchModel.findAll(inProgress);
    return { code: 200, matches };
  }

  public async create(match : ICreateMatch) : Promise<result> {
    const { homeTeam, awayTeam } = match;
    if (homeTeam === awayTeam) {
      return { code: 401,
        message: 'It is not possible to create a match with two equal teams' };
    }
    const newMatch = await this.MatchModel.create(match);
    if (!newMatch) return { code: 404, message: 'There is no team with such id!' };
    return { code: 201, newMatch };
  }

  public async update(id: number, score: Score | null): Promise<result> {
    const updated = await this.MatchModel.update(id, score);
    if (!updated) {
      return { code: 404,
        message: 'That match is not in progress anymore or the match does not exist' };
    }
    if (updated === true) return { code: 200, message: 'Finished' };
    return { code: 200, newMatch: updated };
  }
}
