import { Router } from 'express';
import LeaderboardController from '../controllers/leaderboard/LeaderboardController';
import LeaderboardService from '../services/leaderboard/LeaderboardService';
import LeaderboardModel from '../models/leaderboard/LeaderboardModel';
import Teams from '../../database/models/TeamModel';

const router = Router();
const leaderboardController = new LeaderboardController(
  new LeaderboardService(new LeaderboardModel(Teams)),
);
router.get('/', leaderboardController.leaderboard.bind(leaderboardController));
router.get('/home', leaderboardController.home.bind(leaderboardController));
router.get('/away', leaderboardController.away.bind(leaderboardController));

export default router;
