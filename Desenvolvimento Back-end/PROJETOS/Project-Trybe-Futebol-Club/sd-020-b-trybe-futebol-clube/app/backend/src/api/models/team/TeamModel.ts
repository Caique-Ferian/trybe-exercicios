import IModelTeam from '../../../interfaces/teamInterface/IModelTeam';
import Teams from '../../../database/models/TeamModel';

export default class TeamModel implements IModelTeam<Teams> {
  constructor(private teamModel: typeof Teams) { }
  public async findAll(): Promise<Teams[]> {
    return this.teamModel.findAll();
  }

  public async findByPk(id: number): Promise<Teams | null> {
    const team = await this.teamModel.findByPk(id);
    if (!team) return null;
    return team as Teams;
  }
}
