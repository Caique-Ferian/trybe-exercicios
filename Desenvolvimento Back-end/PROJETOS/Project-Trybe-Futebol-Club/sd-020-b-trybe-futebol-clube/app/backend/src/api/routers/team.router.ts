import { Router } from 'express';
import TeamController from '../controllers/team/TeamController';
import TeamService from '../services/team/TeamService';
import TeamModel from '../models/team/TeamModel';
import Teams from '../../database/models/TeamModel';

const router = Router();
const teamController = new TeamController(new TeamService(new TeamModel(Teams)));

router.get('/', teamController.findAll.bind(teamController));
router.get('/:id', teamController.findByPk.bind(teamController));

export default router;
