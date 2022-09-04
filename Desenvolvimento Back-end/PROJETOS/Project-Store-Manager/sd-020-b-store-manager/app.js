const express = require('express');

const app = express();
const rescue = require('express-rescue');
const bodyParser = require('body-parser');
const productsController = require('./controllers/productsController');
const salesController = require('./controllers/salesController');

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});
app.use(bodyParser.json());
app.get('/products', productsController.getAll);
app.get('/products/:id', rescue(productsController.getById));
app.post('/products', rescue(productsController.create));
app.put('/products/:id', rescue(productsController.update));
app.delete('/products/:id', rescue(productsController.deleteById));
app.post('/sales', rescue(salesController.create));
app.get('/sales', rescue(salesController.getAll));
app.get('/sales/:id', rescue(salesController.getById));

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;