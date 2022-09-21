import { Router } from 'express';
import TrybesmithController from '../controllers/trybesmith.controller';
import validateJWT from '../middlewares/validateJWT';

const router = Router();

const trybesmithController = new TrybesmithController();

router.get('/products', trybesmithController.getAllProducts);
router.post('/products', trybesmithController.createProduct);
router.post('/users', trybesmithController.createUser);
router.get('/orders', trybesmithController.getAllOrders);
router.post('/orders', validateJWT, trybesmithController.createOrder);
router.post('/login', trybesmithController.login);
export default router;