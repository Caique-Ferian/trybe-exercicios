import { Router } from 'express';
import UserController from '../controllers/user/UserController';
import UserService from '../services/user/UserService';
import UserModel from '../models/user/UserModel';
import Users from '../../database/models/UserModel';
import Middlewares from '../middlewares';

const router = Router();
const userController = new UserController(new UserService(new UserModel(Users)));

router.post('/', userController.login.bind(userController));
router.get('/validate', Middlewares.validateJwt, UserController.validate.bind(userController));

export default router;
