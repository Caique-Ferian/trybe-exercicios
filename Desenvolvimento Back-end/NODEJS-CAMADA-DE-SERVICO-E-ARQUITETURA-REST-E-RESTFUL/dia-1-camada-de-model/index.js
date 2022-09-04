const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { createUser, error, getAllUsers,
    getUserById, updateUser } = require('./middlewares/index');
const PORT = 3000;
app.use(bodyParser.json());

app.post('/user', createUser);
app.get('/user', getAllUsers);
app.get('/user/:id', getUserById);
app.put('/user/:id', updateUser);
app.use(error);
app.listen(PORT,() => console.log(`Listening on port ${PORT}`));