import { Router } from 'express';
import CarsController from '../controllers/CarsController';
import CarsService from '../services/CarsService';
import CarsModel from '../models/Cars';

const route = Router();

const carsModel = new CarsModel();
const carsService = new CarsService(carsModel);
const carsController = new CarsController(carsService);

route.get('/:id', (req, res) => carsController.readOne(req, res));
route.put('/:id', (req, res) => carsController.update(req, res));
route.delete('/:id', (req, res) => carsController.delete(req, res));
route.get('/', (req, res) => carsController.read(req, res));
route.post('/', (req, res) => carsController.create(req, res));

export default route;