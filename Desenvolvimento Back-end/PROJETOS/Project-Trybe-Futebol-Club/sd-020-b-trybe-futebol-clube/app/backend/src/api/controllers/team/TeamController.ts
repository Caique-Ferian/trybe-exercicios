import { Request, Response } from 'express';
import IServiceTeam from '../../../interfaces/teamInterface/IServiceTeam';

export default class TeamController {
  constructor(private TeamService: IServiceTeam) { }

  public async findAll(_req: Request, res: Response) {
    const { team, code } = await this.TeamService.findAll();
    return res.status(code).json(team);
  }

  public async findByPk(req: Request, res: Response) {
    const { id } = req.params;
    const { team, code, message } = await this.TeamService.findByPk(+id);
    if (message) return res.status(code).json({ message });
    return res.status(code).json(team);
  }
}
