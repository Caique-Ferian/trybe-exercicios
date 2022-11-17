const { Router } = require('express');
const productsController = require('./productsController');
const userController = require('./userControllers');
const salesController = require('./salesController');
// const rescue = require('../utils/rescue');
// const validateToken = require('../middleware/validateToken');
const { rescue, token } = require('../middleware');

const router = Router();

// --- customer/products

router.get('/customer/orders/:id', token.validateToken, rescue(salesController.getOne));

router.post('/customer/orders', token.validateToken, rescue(salesController.createSale));

router.get('/customer/orders', token.validateToken, rescue(salesController.getAll));

router.get('/customer/products', token.validateToken, rescue(productsController.getAll));

// --- seller(AINDA NÃO TESTEI O ID)

router.get('/seller/orders', rescue(salesController.getAllSellers));

router.get('/seller/orders/:id', rescue(salesController.getOne));

// --- users

router.get('/users', userController.findAll);

router.delete('/users/:id', token.validateTokenAdmin, rescue(userController.destroy));

router.get('/users/sellers', token.validateToken, rescue(userController.getSellers));

router.post('/admin/manage', token.validateTokenAdmin, rescue(userController.register)); 

router.post('/login', rescue(userController.login));

router.post('/register', rescue(userController.register));

module.exports = router;
