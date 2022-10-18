import { Request, Response } from 'express';
import IServiceLeaderboard from '../../../interfaces/leaderboardInterface/IServiceLeaderboard';

export default class LeaderboardController {
  constructor(private LeaderboardService: IServiceLeaderboard) { }

  public async home(_req: Request, res: Response) {
    const { leaderboard, code } = await this.LeaderboardService.home();
    return res.status(code).json(leaderboard);
  }

  public async away(_req: Request, res: Response) {
    const { leaderboard, code } = await this.LeaderboardService.away();
    return res.status(code).json(leaderboard);
  }

  public async leaderboard(_req: Request, res: Response) {
    const { leaderboard, code } = await this.LeaderboardService.leaderboard();

    return res.status(code).json(leaderboard);
  }
}
