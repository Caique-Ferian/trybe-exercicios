import { Router } from 'express';
import MotorcyclesController from '../controllers/MotorcyclesController';
import MotorcyclesService from '../services/MotorcyclesService';
import MotorcyclesModel from '../models/Motorcycles';

const route = Router();

const motorcyclesModel = new MotorcyclesModel();
const motorcyclesService = new MotorcyclesService(motorcyclesModel);
const motorcyclesController = new MotorcyclesController(motorcyclesService);

route.get('/:id', (req, res) => motorcyclesController.readOne(req, res));
route.put('/:id', (req, res) => motorcyclesController.update(req, res));
route.delete('/:id', (req, res) => motorcyclesController.delete(req, res));
route.get('/', (req, res) => motorcyclesController.read(req, res));
route.post('/', (req, res) => motorcyclesController.create(req, res));

export default route;