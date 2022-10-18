import { Router } from 'express';
import MatchController from '../controllers/match/MatchController';
import MatchService from '../services/match/MatchService';
import MatchModel from '../models/match/MatchModel';
import Matches from '../../database/models/MatchModel';
import Middlewares from '../middlewares';

const router = Router();
const matchController = new MatchController(new MatchService(new MatchModel(Matches)));

router.get('/', matchController.findAll.bind(matchController));
router.post('/', Middlewares.validateJwt, matchController.create.bind(matchController));
router.patch('/:id', matchController.updateScore.bind(matchController));
router.patch('/:id/finish', matchController.updateInProgress.bind(matchController));

export default router;
