import { ITeamsHome, ITeamsAway } from './IServiceLeaderboard';

export default interface IModelLeaderboard {
  findAllHome(): Promise<ITeamsHome[]>,
  findAllAway(): Promise<ITeamsAway[]>

}
