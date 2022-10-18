import { Request, Response } from 'express';
import IServiceMatch from '../../../interfaces/matchInterface/IServiceMatch';

export default class MatchController {
  constructor(private MatchService: IServiceMatch) { }

  public async findAll(req: Request, res: Response) {
    const { inProgress } = req.query;
    const query = inProgress ? (inProgress === 'true') : undefined;
    const { matches, code } = await this.MatchService.findAll(query);
    return res.status(code).json(matches);
  }

  public async create(req: Request, res: Response) {
    const { newMatch, code, message } = await this.MatchService.create(req.body);
    if (message) return res.status(code).json({ message });
    return res.status(code).json(newMatch);
  }

  public async updateInProgress(req: Request, res: Response) {
    const { id } = req.params;
    const { code, message } = await this.MatchService.update(+id, null);
    return res.status(code).json({ message });
  }

  public async updateScore(req: Request, res: Response) {
    const { id } = req.params;
    const { code, message, newMatch } = await this.MatchService.update(+id, req.body);
    if (message) return res.status(code).json({ message });
    return res.status(code).json(newMatch);
  }
}
