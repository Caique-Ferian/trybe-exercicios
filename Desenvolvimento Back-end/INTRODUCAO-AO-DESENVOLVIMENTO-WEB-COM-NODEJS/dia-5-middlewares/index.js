const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const authMiddleware = require('./middlewares/authMiddleware');
const validateProductName = require('./middlewares/validateProductName');
const validateInfo = require('./middlewares/validateInfo');
const validateInfoSaleDate = require('./middlewares/validateInfoSaleDate');
const validateInfoWarrantyPeriod = require('./middlewares/validateInfoWarrantyPeriod');

const app = express();

app.use(bodyParser.json());

app.use((req, _res, next) => {
    console.log('req.method:', req.method);
    console.log('req.path:', req.path);
    console.log('req.params:', req.params);
    console.log('req.query:', req.query);
    console.log('req.headers:', req.headers);
    console.log('req.body:', req.body);
    next();
  });

app.post('/signup',(req, res) =>  {
    try{

        const {email, password,firstName,phone} = req.body;
        if(!email || !password || !firstName || !phone ) {
            return res.status(401).json({message: 'missing fields'});
        }
        const token = crypto.randomBytes(8).toString('hex');
        return res.status(200).json({token});
    }catch(error) {
        return res.status(500).end;
    }
});

app.use(authMiddleware);

app.post('/sales',
validateProductName,
validateInfo,
validateInfoSaleDate,
validateInfoWarrantyPeriod,
(_req, res) => res.status(201).json({message: 'Venda cadastrada com sucesso'}));


app.listen(3000,() => {
    console.log('listening on port 3000');
});