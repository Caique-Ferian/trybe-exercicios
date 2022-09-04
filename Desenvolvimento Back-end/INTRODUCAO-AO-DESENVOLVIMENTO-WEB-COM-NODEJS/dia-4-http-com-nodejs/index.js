const express = require('express');
const bodyParser = require('body-parser');
const {getSimpsons, writeSimpson} = require('./simpsonsModule');

const app = express();

app.use(bodyParser.json());

// EXERCÍCIOS 1 AO 4
app.get('/ping', (req, res) => res.status(200).json({message: 'pong'}));

app.post('/hello', (req, res) =>{
    const { name } = req.body;
    res.status(200).json({message: `Hello, ${name}!`}); 
});

app.post('/greetings', (req, res) => {
    const { name, age } = req.body;
    if(age < 17) return res.status(401).json({message: 'Unauthorized'});
    res.status(200).json({message: `Hello, ${name}!`});
});

app.put('/users/:name/:age', (req, res) => {
    const {name, age} = req.params;
    res.status(200).json({message: `Seu nome é ${name} e você tem ${age} anos de idade`});
});
// EXERCÍCIOS 5 ao 8
app.get('/simpsons', async (req, res) => {
    try {
        const simpsons = await getSimpsons();
        return res.status(200).json(simpsons);
    } catch (err) {
        return res.status(500).end();
    }
})
app.get('/simpsons/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const simpsons = await getSimpsons();
        const result = simpsons.find((simpson) => simpson.id === id);
        if(!result) return res.status(404).json(({message:'simpson not found'}));
        return res.status(200).json(result);
    } catch (err) {
        return res.status(500).end();
    }
})
app.post('/simpsons', async (req, res) => {
    try {
        const {id, name} = req.body;
        const simpsons = await getSimpsons();
        const result = simpsons.find((simpson) => simpson.id === id);
        if(result) return res.status(409).json(({message:'id already exists'}));
        simpsons.push({id,name});
        await writeSimpson(simpsons);
        return res.status(204).end();
    } catch (err) {
        return res.status(500).end();
    }
})
app.listen(3000,() => {
    console.log('listening on port 3000');
});