const express = require('express');
const { rescue, validateJWT } = require('./middlewares');
const { loginController, userController,
    categoryController, postController } = require('./controllers');

const routes = express.Router();

routes.post('/login', rescue(loginController));
routes.post('/user', rescue(userController.create));
routes.get('/user', validateJWT, rescue(userController.getAll));
routes.get('/user/:id', validateJWT, rescue(userController.getById));
routes.delete('/user/me', validateJWT, userController.destroy);
routes.post('/categories', validateJWT, rescue(categoryController.create));
routes.get('/categories', validateJWT, rescue(categoryController.getAll));
routes.post('/post', validateJWT, rescue(postController.create));
routes.get('/post', validateJWT, postController.getAll);
routes.get('/post/search', validateJWT, postController.getByQuery);
routes.get('/post/:id', validateJWT, rescue(postController.getById));
routes.put('/post/:id', validateJWT, rescue(postController.update));
routes.delete('/post/:id', validateJWT, rescue(postController.destroy));

module.exports = routes;
