const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 3000;
const rescue = require('express-rescue');
const {middlewareError, validateCep, validateInfos} = require('./middlewares/index');
const {getByCep,createNewCep} = require('./controllers/CepController');

app.use(bodyParser.json());

app.get('/ping', (_req, res) => res.status(200).json({message:'pong'}));
app.get('/cep/:cep',validateCep, rescue(getByCep));
app.post('/cep',validateInfos, rescue(createNewCep));

app.use(middlewareError);

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
