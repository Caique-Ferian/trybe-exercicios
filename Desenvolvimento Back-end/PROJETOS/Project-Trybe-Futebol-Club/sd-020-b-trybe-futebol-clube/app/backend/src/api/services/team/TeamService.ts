import Teams from '../../../database/models/TeamModel';
import IModelTeam from '../../../interfaces/teamInterface/IModelTeam';
import IServiceTeam, { result } from '../../../interfaces/teamInterface/IServiceTeam';

export default class TeamService implements IServiceTeam {
  constructor(private TeamModel: IModelTeam<Teams>) { }

  public async findAll() : Promise<result> {
    const teams = await this.TeamModel.findAll();
    return { code: 200, team: teams };
  }

  public async findByPk(id : number) : Promise<result> {
    const team = await this.TeamModel.findByPk(id);
    if (!team) return { code: 404, message: 'Team not found' };
    return { code: 200, team };
  }
}
